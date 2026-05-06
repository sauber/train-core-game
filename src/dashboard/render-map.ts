import type { Simulation } from "../simulation/simulation.ts";
import type { Station } from "../station/mod.ts";
import type { Track } from "../track/mod.ts";

export type RenderMapOptions = {
  width?: number;
  height?: number; // Total height of output in lines
};

const DEFAULT_WIDTH = 80;
const DEFAULT_TOTAL_HEIGHT = 24;

type GridPoint = {
  x: number;
  y: number;
};

function toPixelPoint(
  location: { x: number; y: number },
  pixelWidth: number,
  pixelHeight: number,
  areaWidth: number,
  areaHeight: number,
): GridPoint {
  return {
    x: Math.min(
      pixelWidth - 1,
      Math.max(0, Math.round((location.x / areaWidth) * (pixelWidth - 1))),
    ),
    y: Math.min(
      pixelHeight - 1,
      Math.max(0, Math.round((location.y / areaHeight) * (pixelHeight - 1))),
    ),
  };
}

function createPixelGrid(width: number, height: number): Array<Array<boolean>> {
  return Array.from(
    { length: height },
    () => Array.from({ length: width }, () => false),
  );
}

function bresenhamLine(start: GridPoint, end: GridPoint): Array<GridPoint> {
  const points: Array<GridPoint> = [];
  let x0 = start.x;
  let y0 = start.y;
  const x1 = end.x;
  const y1 = end.y;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    points.push({ x: x0, y: y0 });
    if (x0 === x1 && y0 === y1) break;
    const e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }

  return points;
}

function brailleCellValue(
  pixels: Array<Array<boolean>>,
  cellX: number,
  cellY: number,
): string {
  const base = 0x2800;
  const offsets = [
    { x: 0, y: 0, bit: 1 },
    { x: 0, y: 1, bit: 2 },
    { x: 0, y: 2, bit: 4 },
    { x: 0, y: 3, bit: 64 },
    { x: 1, y: 0, bit: 8 },
    { x: 1, y: 1, bit: 16 },
    { x: 1, y: 2, bit: 32 },
    { x: 1, y: 3, bit: 128 },
  ];

  let value = 0;
  for (const offset of offsets) {
    const x = cellX * 2 + offset.x;
    const y = cellY * 4 + offset.y;
    if (pixels[y]?.[x]) {
      value |= offset.bit;
    }
  }

  return value === 0 ? " " : String.fromCodePoint(base + value);
}

function pointKey(point: GridPoint): string {
  return `${point.x},${point.y}`;
}

function stationSymbol(station: Station): string {
  return station.name.trim().charAt(0).toUpperCase() || "S";
}

export function renderMap(
  game: Simulation,
  options: RenderMapOptions = {},
): string {
  const width = Math.max(20, options.width ?? DEFAULT_WIDTH);
  const totalHeight = Math.max(10, options.height ?? DEFAULT_TOTAL_HEIGHT);

  // Reserve lines for legend (2) and footer (1 balance + 3 events = 4) = 6 total
  const legendLines = 2;
  const footerLines = 4; // 1 balance + 3 events
  const reservedLines = legendLines + footerLines;
  const mapHeight = Math.max(4, totalHeight - reservedLines);

  const areaWidth = game.area.width || 1;
  const areaHeight = game.area.height || 1;

  const pixelWidth = width * 2;
  const pixelHeight = mapHeight * 4;
  const pixels = createPixelGrid(pixelWidth, pixelHeight);

  const stationPositions = new Map<Station, GridPoint>();
  const stationCellMap = new Map<string, Station[]>();

  for (const station of game.stations) {
    const point = toPixelPoint(
      station.location,
      pixelWidth,
      pixelHeight,
      areaWidth,
      areaHeight,
    );
    stationPositions.set(station, point);
    const key = pointKey({
      x: Math.floor(point.x / 2),
      y: Math.floor(point.y / 4),
    });
    const existing = stationCellMap.get(key) ?? [];
    existing.push(station);
    stationCellMap.set(key, existing);
  }

  const trainCellMap = new Map<string, string>();

  for (const track of game.tracks) {
    const trackStations = Array.from(track.stations) as Station[];
    if (trackStations.length !== 2) continue;
    const from = stationPositions.get(trackStations[0]);
    const to = stationPositions.get(trackStations[1]);
    if (!from || !to) continue;

    const points = bresenhamLine(from, to);
    for (const point of points) {
      if (
        point.x >= 0 && point.x < pixelWidth && point.y >= 0 &&
        point.y < pixelHeight
      ) {
        pixels[point.y][point.x] = true;
      }
    }

    if (track.trains.size > 0) {
      const midpoint = points[Math.floor(points.length / 2)];
      const key = pointKey({
        x: Math.floor(midpoint.x / 2),
        y: Math.floor(midpoint.y / 4),
      });
      trainCellMap.set(key, "T");
    }
  }

  const rows = [] as string[];
  for (let cellY = 0; cellY < mapHeight; cellY++) {
    const row = [] as string[];
    for (let cellX = 0; cellX < width; cellX++) {
      row.push(brailleCellValue(pixels, cellX, cellY));
    }
    rows.push(row.join(""));
  }

  for (const [key, stations] of stationCellMap.entries()) {
    const [x, y] = key.split(",").map(Number);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (x < 0 || x >= width || y < 0 || y >= mapHeight) continue;
    const symbol = stations.length === 1 ? stationSymbol(stations[0]) : "*";
    const row = rows[y].split("");
    row[x] = symbol;
    rows[y] = row.join("");
  }

  for (const [key, symbol] of trainCellMap.entries()) {
    if (stationCellMap.has(key)) continue;
    const [x, y] = key.split(",").map(Number);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (x < 0 || x >= width || y < 0 || y >= mapHeight) continue;
    const row = rows[y].split("");
    row[x] = symbol;
    rows[y] = row.join("");
  }

  const stationLegend = (Array.from(game.stations) as Station[])
    .map((station) => {
      const trains = station.trains.size;
      return `${station.name}(${trains})`;
    });

  const trackLegend = (Array.from(game.tracks) as Track[])
    .map((track) => {
      const ends = Array.from(track.stations) as Station[];
      return `${ends.map((s) => s.name).join("-")}(${track.trains.size})`;
    });

  const legend = [
    `Stations: ${stationLegend.join(" ")}`,
    `Tracks: ${trackLegend.join(" ")}`,
  ];

  const events = game.journal.slice(-3).map((entry: { tick: number; message: string; balance?: number }) => {
    const balanceText = entry.balance !== undefined
      ? ` balance=${entry.balance}`
      : "";
    return `Tick ${entry.tick}: ${entry.message}${balanceText}`;
  });

  // Ensure exactly 3 event lines, padding with empty strings
  const eventLines = Array.from({ length: 3 }, (_, i) => events[i] || "");

  const footer = [
    `Tick ${game.tick} - Balance: ${game.balance}`,
    ...eventLines,
  ];

  const output = [...rows, ...legend, ...footer].join("\n");

  // Ensure total output has exactly totalHeight lines
  const outputLines = output.split("\n");
  const paddingNeeded = totalHeight - outputLines.length;
  if (paddingNeeded > 0) {
    const padding = Array.from({ length: paddingNeeded }, () => "");
    return [...outputLines, ...padding].join("\n");
  }

  return output;
}
