import type { Layer } from "./layer.type.ts";

export const frameLayer: Layer = (canvas, width, height) => {
  // Insert corners
  canvas.insert(0, height - 1, "╭");
  canvas.insert(width - 1, height - 1, "╮");
  canvas.insert(0, 0, "╰");
  canvas.insert(width - 1, 0, "╯");

  // Lines
  for (let x = 1; x < width - 1; x++) {
    canvas.insert(x, height - 1, "─");
    canvas.insert(x, 0, "─");
  }
  // Sides
  for (let y = 1; y < height - 1; y++) {
    canvas.insert(width - 1, y, "│");
    canvas.insert(0, y, "│");
  }
};
