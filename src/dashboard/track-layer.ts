import type { Layer } from "./layer.type.ts";
import type { Station } from "../station/mod.ts";
import { brailleCellValue, bresenhamLine, toPixelPoint } from "./map-utils.ts";

/**
 * Draw track layer on the canvas using Bresenham algorithm onto Braille characters.
 * Only overwrites characters that are part of track lines.
 */
export const trackLayer: Layer = (canvas, width, height, game) => {
  if (!game) return;

  // Create pixel grid for Braille rendering
  const pixelWidth = width * 2;
  const pixelHeight = height * 4;
  const pixels: Array<Array<boolean>> = Array.from({
    length: pixelHeight,
  }, () =>
    Array.from({
      length: pixelWidth,
    }, () => false));

  // Draw tracks using Bresenham algorithm
  for (const track of game.tracks) {
    const stations = Array.from(track.stations) as Station[];
    if (stations.length !== 2) continue;

    const [stationA, stationB] = stations;
    const pixelA = toPixelPoint(
      stationA.location,
      pixelWidth,
      pixelHeight,
      game.area.width,
      game.area.height,
    );
    const pixelB = toPixelPoint(
      stationB.location,
      pixelWidth,
      pixelHeight,
      game.area.width,
      game.area.height,
    );

    const line = bresenhamLine(pixelA, pixelB);
    for (const point of line) {
      const { x, y } = point;
      if (x >= 0 && x < pixelWidth && y >= 0 && y < pixelHeight) {
        pixels[y][x] = true;
      }
    }
  }

  // Convert pixel grid to Braille characters and only update cells with tracks
  for (let cellY = 0; cellY < height; cellY++) {
    for (let cellX = 0; cellX < width; cellX++) {
      const braille = brailleCellValue(pixels, cellX, cellY);
      if (braille !== " ") {
        canvas.insert(cellX, cellY, braille);
      }
    }
  }
};
