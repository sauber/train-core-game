import type { Simulation } from "./simulation.ts";
import type { Station } from "../station/mod.ts";

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

function toGridPoint(
  location: { x: number; y: number },
  width: number,
  height: number,
  areaWidth: number,
  areaHeight: number,
): GridPoint {
  return {
    x: Math.min(
      width - 1,
      Math.max(0, Math.round((location.x / areaWidth) * (width - 1))),
    ),
    y: Math.min(
      height - 1,
      Math.max(0, Math.round((location.y / areaHeight) * (height - 1))),
    ),
  };
}

function straightLine(start: GridPoint, end: GridPoint): Array<GridPoint> {
  const points: Array<GridPoint> = [];
  if (start.x === end.x) {
    const step = start.y < end.y ? 1 : -1;
    for (let y = start.y; y !== end.y + step; y += step) {
      points.push({ x: start.x, y });
    }
    return points;
  }
  if (start.y === end.y) {
    const step = start.x < end.x ? 1 : -1;
    for (let x = start.x; x !== end.x + step; x += step) {
      points.push({ x, y: start.y });
    }
    return points;
  }
  throw new Error("straightLine must be horizontal or vertical");
}

function linePoints(start: GridPoint, end: GridPoint): Array<GridPoint> {
  if (start.x === end.x || start.y === end.y) {
    return straightLine(start, end);
  }

  const corner: GridPoint = { x: end.x, y: start.y };
  const firstSegment = straightLine(start, corner);
  const secondSegment = straightLine(corner, end).slice(1);
  return [...firstSegment, ...secondSegment];
}

function trackCharacter(
  previous: GridPoint,
  current: GridPoint,
  next: GridPoint,
): string {
  const dxPrev = current.x - previous.x;
  const dyPrev = current.y - previous.y;
  const dxNext = next.x - current.x;
  const dyNext = next.y - current.y;

  if (dxPrev !== 0 && dxNext !== 0) return "═";
  if (dyPrev !== 0 && dyNext !== 0) return "║";

  if (dxPrev > 0 && dyNext > 0) return "╗";
  if (dxPrev > 0 && dyNext < 0) return "╝";
  if (dxPrev < 0 && dyNext > 0) return "╔";
  if (dxPrev < 0 && dyNext < 0) return "╚";
  if (dyPrev > 0 && dxNext > 0) return "╚";
  if (dyPrev > 0 && dxNext < 0) return "╔";
  if (dyPrev < 0 && dxNext > 0) return "╝";
  if (dyPrev < 0 && dxNext < 0) return "╗";

  return "═";
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

  const grid = Array.from(
    { length: mapHeight },
    () => Array.from({ length: width }, () => " "),
  );

  const stationPositions = new Map<Station, GridPoint>();
  const stationIndexByKey = new Map<string, Station[]>();

  for (const station of game.stations) {
    const point = toGridPoint(
      station.location,
      width,
      mapHeight,
      areaWidth,
      areaHeight,
    );
    stationPositions.set(station, point);
    const key = pointKey(point);
    const existing = stationIndexByKey.get(key) ?? [];
    existing.push(station);
    stationIndexByKey.set(key, existing);
  }

  const trackTrainPositions = new Set<string>();

  for (const track of game.tracks) {
    const trackStations = Array.from(track.stations);
    if (trackStations.length !== 2) continue;
    const from = stationPositions.get(trackStations[0]);
    const to = stationPositions.get(trackStations[1]);
    if (!from || !to) continue;

    const points = linePoints(from, to);
    for (let index = 1; index < points.length - 1; index++) {
      const point = points[index];
      const key = pointKey(point);
      if (stationIndexByKey.has(key)) continue;
      grid[point.y][point.x] = trackCharacter(
        points[index - 1],
        point,
        points[index + 1],
      );
    }

    if (track.trains.size > 0) {
      const midpoint = points[Math.floor(points.length / 2)];
      const key = pointKey(midpoint);
      if (!stationIndexByKey.has(key)) {
        grid[midpoint.y][midpoint.x] = "T";
        trackTrainPositions.add(key);
      }
    }
  }

  for (const [key, stations] of stationIndexByKey.entries()) {
    const [x, y] = key.split(",").map(Number);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (stations.length === 1) {
      grid[y][x] = stationSymbol(stations[0]);
    } else {
      grid[y][x] = "*";
    }
  }

  for (const station of game.stations) {
    const point = stationPositions.get(station);
    if (!point) continue;
    if (station.trains.size > 0) {
      const overlay = stationSymbol(station);
      grid[point.y][point.x] = overlay;
    }
  }

  const rows = grid.map((row) => row.join(""));

  const stationLegend = Array.from(game.stations).map((station) => {
    const trains = station.trains.size;
    return `${station.name}(${trains})`;
  });

  const trackLegend = Array.from(game.tracks).map((track) => {
    const ends = Array.from(track.stations).map((station) => station.name);
    return `${ends.join("-")}(${track.trains.size})`;
  });

  const legend = [
    `Stations: ${stationLegend.join(" ")}`,
    `Tracks: ${trackLegend.join(" ")}`,
  ];

  const events = game.journal.slice(-3).map((entry) => {
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
