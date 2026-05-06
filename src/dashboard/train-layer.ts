import type { Layer } from "./layer.type.ts";
import type { Simulation } from "../simulation/simulation.ts";
import type { Station } from "../station/mod.ts";
import { toPixelPoint } from "./map-utils.ts";

/**
 * Draw train layer on the canvas.
 * Places train symbols at their current locations (on tracks or at stations).
 */
export const trainLayer: Layer = (canvas, width, height, game?: Simulation) => {
  if (!game) return;

  const area = game.area;
  const pixelWidth = width * 2;
  const pixelHeight = height * 4;

  // Draw trains at their locations
  for (const train of game.trains) {
    const location = train.location;
    if (!location) continue;

    let pixelPoint;

    // Check if location is a Station
    if ("name" in location && "location" in location) {
      // Train is at a station
      const station = location as Station;
      pixelPoint = toPixelPoint(
        station.location,
        pixelWidth,
        pixelHeight,
        area.width,
        area.height,
      );
    } else {
      // Train is on a track - draw at midpoint
      const track = location as { stations: Set<Station> };
      const stations = Array.from(track.stations) as Station[];
      if (stations.length !== 2) continue;

      const [stationA, stationB] = stations;
      const pixelA = toPixelPoint(
        stationA.location,
        pixelWidth,
        pixelHeight,
        area.width,
        area.height,
      );
      const pixelB = toPixelPoint(
        stationB.location,
        pixelWidth,
        pixelHeight,
        area.width,
        area.height,
      );

      pixelPoint = {
        x: Math.floor((pixelA.x + pixelB.x) / 2),
        y: Math.floor((pixelA.y + pixelB.y) / 2),
      };
    }

    // Convert to Braille cell coordinates
    const cellX = Math.floor(pixelPoint.x / 2);
    const cellY = Math.floor(pixelPoint.y / 4);

    // Draw train symbol (T for train)
    if (cellX >= 0 && cellX < width && cellY >= 0 && cellY < height) {
      canvas.insert(cellX, cellY, "T");
    }
  }
};
