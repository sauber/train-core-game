import type { Simulation } from "../simulation/simulation.ts";
import type { Station } from "../station/mod.ts";
import type { GridPoint } from "./map-utils.ts";

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
    const countLine = `P${passengerCount} T${trainCount}`;
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
