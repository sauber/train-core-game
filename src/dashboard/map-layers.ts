import type { Simulation } from "../simulation/simulation.ts";
import type { Station } from "../station/mod.ts";
import type { GridPoint } from "./map-utils.ts";
import {
  brailleCellValue,
  bresenhamLine,
  createPixelGrid,
  pointKey,
  toPixelPoint,
} from "./map-utils.ts";

export function createStationLayer(
  game: Simulation,
  pixelWidth: number,
  pixelHeight: number,
  areaWidth: number,
  areaHeight: number,
): {
  stationPositions: Map<Station, GridPoint>;
  stationCellMap: Map<string, Station[]>;
} {
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
  return { stationPositions, stationCellMap };
}

export function createTrackLayer(
  game: Simulation,
  stationPositions: Map<Station, GridPoint>,
  pixelWidth: number,
  pixelHeight: number,
): { pixels: Array<Array<boolean>>; trainCellMap: Map<string, string> } {
  const pixels = createPixelGrid(pixelWidth, pixelHeight);
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
  return { pixels, trainCellMap };
}

export function createBrailleLayer(
  pixels: Array<Array<boolean>>,
  width: number,
  mapHeight: number,
): string[] {
  const rows = [] as string[];
  for (let cellY = 0; cellY < mapHeight; cellY++) {
    const row = [] as string[];
    for (let cellX = 0; cellX < width; cellX++) {
      row.push(brailleCellValue(pixels, cellX, cellY));
    }
    rows.push(row.join(""));
  }
  return rows;
}

export function createFrameLayer(
  width: number,
  mapHeight: number,
): { topFrame: string; bottomFrame: string; sideFrames: string[] } {
  const topFrame = "┌" + "─".repeat(width - 2) + "┐";
  const bottomFrame = "└" + "─".repeat(width - 2) + "┘";
  const sideFrames = [];
  for (let i = 0; i < mapHeight; i++) {
    const rowChars = Array(width).fill(" ");
    rowChars[0] = "│";
    rowChars[width - 1] = "│";
    sideFrames.push(rowChars.join(""));
  }
  return { topFrame, bottomFrame, sideFrames };
}

export function createLabelLayer(
  game: Simulation,
  stationPositions: Map<Station, GridPoint>,
  width: number,
  mapHeight: number,
): string[] {
  const rows = [] as string[];
  for (let cellY = 0; cellY < mapHeight; cellY++) {
    const row = [] as string[];
    for (let cellX = 0; cellX < width; cellX++) {
      row.push(" ");
    }
    rows.push(row.join(""));
  }
  for (const station of game.stations) {
    const point = stationPositions.get(station);
    if (!point) continue;
    const cellX = Math.floor(point.x / 2);
    const cellY = Math.floor(point.y / 4);
    if (cellX < 0 || cellX >= width || cellY < 0 || cellY >= mapHeight) {
      continue;
    }
    const trainCount = station.trains.size;
    let passengerCount = 0;
    for (const passenger of game.passengers) {
      if (passenger.location === station) {
        passengerCount++;
      }
    }
    const nameLine = station.name.trim();
    const countLine = `P: ${passengerCount} T: ${trainCount}`;
    const maxLen = Math.max(nameLine.length, countLine.length);
    let startX = cellX - Math.floor(maxLen / 2);
    if (startX < 0) startX = 0;
    if (startX + maxLen > width) startX = width - maxLen;
    if (cellY < mapHeight) {
      const rowChars = rows[cellY].split("");
      for (let i = 0; i < nameLine.length && startX + i < width; i++) {
        rowChars[startX + i] = nameLine[i];
      }
      rows[cellY] = rowChars.join("");
    }
    if (cellY + 1 < mapHeight) {
      const rowChars = rows[cellY + 1].split("");
      for (let i = 0; i < countLine.length && startX + i < width; i++) {
        rowChars[startX + i] = countLine[i];
      }
      rows[cellY + 1] = rowChars.join("");
    }
  }
  return rows;
}

export function createTrainLayer(
  trainCellMap: Map<string, string>,
  width: number,
  mapHeight: number,
): string[] {
  const rows = [] as string[];
  for (let y = 0; y < mapHeight; y++) {
    const row = [] as string[];
    for (let x = 0; x < width; x++) {
      row.push(" ");
    }
    rows.push(row.join(""));
  }
  for (const [key, symbol] of trainCellMap.entries()) {
    const [x, y] = key.split(",").map(Number);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (x < 0 || x >= width || y < 0 || y >= mapHeight) continue;
    const row = rows[y].split("");
    row[x] = symbol;
    rows[y] = row.join("");
  }
  return rows;
}
