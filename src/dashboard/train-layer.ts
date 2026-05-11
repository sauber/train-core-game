import type { Layer } from "./layer.type.ts";
import type { iSimulation } from "../types.ts";

/**
 * Draw train layer on the canvas.
 * Places train symbols at their current locations (on tracks or at stations).
 */
export const trainLayer: Layer = (
  _canvas,
  _width,
  _height,
  sim?: iSimulation,
) => {
  if (!sim) return;

  // const area = game.area;
  // const pixelWidth = width * 2;
  // const pixelHeight = height * 4;

  // Draw trains at their locations
  for (const train of sim.fleet.trains) {
    const location = train.location;
    if (!location) {
      console.log(train);
      console.log(sim);
      throw new Error("Train is nowhere");
    }
    // if (!location) continue;

    // let pixelPoint;

    // Check if location is a Station
    if ("name" in location && "location" in location) return;

    // Train is on a track - draw at midpoint
    // const track = location as { stations: Set<iStation> };
    // const stations = Array.from(track.stations) as iStation[];
    // if (stations.length !== 2) continue;

    // const [stationA, stationB] = stations;
    // const pixelA = toPixelPoint(
    //   stationA.location,
    //   pixelWidth,
    //   pixelHeight,
    //   area.width,
    //   area.height,
    // );
    // const pixelB = toPixelPoint(
    //   stationB.location,
    //   pixelWidth,
    //   pixelHeight,
    //   area.width,
    //   area.height,
    // );

    // pixelPoint = {
    //   x: Math.floor((pixelA.x + pixelB.x) / 2),
    //   y: Math.floor((pixelA.y + pixelB.y) / 2),
    // };

    // // Convert to Braille cell coordinates
    // const cellX = Math.floor(pixelPoint.x / 2);
    // const cellY = Math.floor(pixelPoint.y / 4);

    // // Draw train symbol (T for train)
    // canvas.insert(cellX, cellY, train.type.name[0]);
  }
};
