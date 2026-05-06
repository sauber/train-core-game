import type { Simulation } from "../simulation/simulation.ts";
import type { Station } from "../station/mod.ts";
import type { Track } from "../track/mod.ts";

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

export function renderMapCanvas(
  game: Simulation,
  width: number,
  mapHeight: number,
  areaWidth: number,
  areaHeight: number,
): { rows: string[]; stationCellMap: Map<string, Station[]>; trainCellMap: Map<string, string> } {
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

  // Draw frame borders on the edges (left and right) as overlay
  // Stations and trains can overlap the frame
  const framedRows = [...rows];
  for (let i = 0; i < framedRows.length; i++) {
    let row = framedRows[i];
    if (row.length < width) {
      row = row.padEnd(width);
    } else if (row.length > width) {
      row = row.substring(0, width);
    }
    const rowChars = row.split("");
    rowChars[0] = "│";
    rowChars[width - 1] = "│";
    framedRows[i] = rowChars.join("");
  }

  // Add station labels (two-line format: name, P:__ T:__)
  // Stations are drawn on top, potentially overlapping the frame
  const labeledRows = [...framedRows];
  for (const station of game.stations) {
    const point = stationPositions.get(station);
    if (!point) continue;
    const cellX = Math.floor(point.x / 2);
    const cellY = Math.floor(point.y / 4);
    if (cellX < 0 || cellX >= width || cellY < 0 || cellY >= mapHeight) continue;

    const trainCount = station.trains.size;
    // Count passengers at this station
    let passengerCount = 0;
    for (const passenger of game.passengers) {
      if (passenger.location === station) {
        passengerCount++;
      }
    }

    const nameLine = station.name.trim();
    const countLine = `P: ${passengerCount} T: ${trainCount}`;
    const maxLen = Math.max(nameLine.length, countLine.length);

    // Center the label at the station point, nudging inwards if would go out of bounds
    let startX = cellX - Math.floor(maxLen / 2);
    if (startX < 0) startX = 0;
    if (startX + maxLen > width) startX = width - maxLen;

    // First line of label
    if (cellY < mapHeight) {
      const rowChars = labeledRows[cellY].split("");
      for (let i = 0; i < nameLine.length && startX + i < width; i++) {
        rowChars[startX + i] = nameLine[i];
      }
      labeledRows[cellY] = rowChars.join("");
    }
    // Second line of label
    if (cellY + 1 < mapHeight) {
      const rowChars = labeledRows[cellY + 1].split("");
      for (let i = 0; i < countLine.length && startX + i < width; i++) {
        rowChars[startX + i] = countLine[i];
      }
      labeledRows[cellY + 1] = rowChars.join("");
    }
  }

  // Add trains (on top of everything else)
  for (const [key, symbol] of trainCellMap.entries()) {
    if (stationCellMap.has(key)) continue;
    const [x, y] = key.split(",").map(Number);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (x < 0 || x >= width || y < 0 || y >= mapHeight) continue;
    const row = labeledRows[y].split("");
    row[x] = symbol;
    labeledRows[y] = row.join("");
  }

  // Insert top/bottom frame borders
  const topFrame = "┌" + "─".repeat(width - 2) + "┐";
  const bottomFrame = "└" + "─".repeat(width - 2) + "┘";
  labeledRows.unshift(topFrame);
  labeledRows.push(bottomFrame);

  return { rows: labeledRows, stationCellMap, trainCellMap };
}

export function renderLegend(game: Simulation): string[] {
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

  return [
    `Stations: ${stationLegend.join(" ")}`,
    `Tracks: ${trackLegend.join(" ")}`,
  ];
}
