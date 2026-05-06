export type GridPoint = {
  x: number;
  y: number;
};

export function toPixelPoint(
  location: { x: number; y: number },
  pixelWidth: number,
  pixelHeight: number,
  areaWidth: number,
  areaHeight: number,
): GridPoint {
  // Invert y-axis to match canvas coordinate system (y=0 at bottom)
  return {
    x: Math.min(
      pixelWidth - 1,
      Math.max(0, Math.round((location.x / areaWidth) * (pixelWidth - 1))),
    ),
    y: Math.min(
      pixelHeight - 1,
      Math.max(
        0,
        Math.round(
          ((areaHeight - location.y) / areaHeight) * (pixelHeight - 1),
        ),
      ),
    ),
  };
}

export function pointKey(point: GridPoint): string {
  return `${point.x},${point.y}`;
}

// Additional utility functions used by layers
export function brailleCellValue(
  pixels: Array<Array<boolean>>,
  cellX: number,
  cellY: number,
): string {
  const base = 0x2800;
  // Offsets map pixel positions within a Braille cell to the correct bit.
  // The canvas y-axis has y=0 at the bottom, so we invert the y-offset
  // to map pixels to Braille dots correctly (dot 1 at top, dot 3 at bottom).
  const offsets = [
    { x: 0, y: 3, bit: 1 }, // pixel y+3 (top of cell) -> dot 1 (top-left)
    { x: 0, y: 2, bit: 2 }, // pixel y+2 -> dot 2
    { x: 0, y: 1, bit: 4 }, // pixel y+1 -> dot 3 (bottom-left)
    { x: 0, y: 0, bit: 64 }, // pixel y+0 (bottom of cell) -> dot 7
    { x: 1, y: 3, bit: 8 }, // pixel y+3 -> dot 4 (top-right)
    { x: 1, y: 2, bit: 16 }, // pixel y+2 -> dot 5
    { x: 1, y: 1, bit: 32 }, // pixel y+1 -> dot 6 (bottom-right)
    { x: 1, y: 0, bit: 128 }, // pixel y+0 -> dot 8
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

export function bresenhamLine(
  start: GridPoint,
  end: GridPoint,
): Array<GridPoint> {
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

export function createPixelGrid(
  width: number,
  height: number,
): Array<Array<boolean>> {
  return Array.from(
    { length: height },
    () => Array.from({ length: width }, () => false),
  );
}
