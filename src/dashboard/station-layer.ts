import type { Simulation } from "../simulation/simulation.ts";
import type { Station } from "../station/mod.ts";
import type { GridPoint } from "./map-utils.ts";
import { pointKey, toPixelPoint } from "./map-utils.ts";

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
