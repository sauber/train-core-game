import type { Layer } from "./layer.type.ts";
import type { Simulation } from "../simulation/simulation.ts";
import type { Station } from "../station/mod.ts";
import type { Train } from "../train/mod.ts";
import type { Passenger } from "../passenger/mod.ts";
import type { GridPoint } from "./map-utils.ts";
import { pointKey, toPixelPoint } from "./map-utils.ts";

/**
 * Draw station layer on the canvas with name, train count, and passenger count.
 * Labels are centered at station locations and adjusted to fit within canvas.
 */
export const stationLayer: Layer = (canvas, width, height, game) => {
  if (!game) return;

  const area = game.area;
  const pixelWidth = width * 2;
  const pixelHeight = height * 4;

  // Draw each station with label
  for (const station of game.stations) {
    // Calculate train and passenger counts using Array.from to convert LimitSet to array
    const trainsAtStation = station.trains.size;
    const passengersAtStation = station.passengers.size;
    const labelLines: [string, string] = [
      station.name,
      `T${trainsAtStation} P${passengersAtStation}`,
    ];

    // Convert location to pixel coordinates
    const pixelPoint = toPixelPoint(
      station.location,
      pixelWidth,
      pixelHeight,
      area.width,
      area.height,
    );

    // Convert to Braille cell coordinates
    const cellX = Math.floor(pixelPoint.x / 2);
    const cellY = Math.floor(pixelPoint.y / 4);

    // Calculate label start position (centered at station)
    const maxLabelWidth = Math.max(...labelLines.map((line) => line.length));
    const startCellX = Math.max(
      0,
      Math.min(cellX - Math.floor(maxLabelWidth / 2), width - maxLabelWidth),
    );

    // Draw each line of the label
    for (let lineIdx = 0; lineIdx < labelLines.length; lineIdx++) {
      const line = labelLines[lineIdx];
      for (let charIdx = 0; charIdx < line.length; charIdx++) {
        const charX = startCellX + charIdx;
        if (charX >= 0 && charX < width) {
          canvas.insert(charX, cellY - lineIdx, line[charIdx]);
        }
      }
    }
  }
};
