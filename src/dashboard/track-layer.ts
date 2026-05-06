import type { Simulation } from "../simulation/simulation.ts";
import type { Station } from "../station/mod.ts";
import type { GridPoint } from "./map-utils.ts";
import { bresenhamLine, createPixelGrid, pointKey } from "./map-utils.ts";

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
