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
  return {
    x: Math.min(
      pixelWidth - 1,
      Math.max(0, Math.round((location.x / areaWidth) * (pixelWidth - 1))),
    ),
    y: Math.min(
      pixelHeight - 1,
      Math.max(0, Math.round((location.y / areaHeight) * (pixelHeight - 1))),
    ),
  };
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

export function brailleCellValue(
  pixels: Array<Array<boolean>>,
  cellX: number,
  cellY: number,
): string {
  const base = 0x2800;
  const offsets = [
    { x: 0, y: 0, bit: 1 },
    { x: 0, y: 1, bit: 2 },
    { x: 0, y: 2, bit: 4 },
    { x: 0, y: 3, bit: 64 },
    { x: 1, y: 0, bit: 8 },
    { x: 1, y: 1, bit: 16 },
    { x: 1, y: 2, bit: 32 },
    { x: 1, y: 3, bit: 128 },
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

export function pointKey(point: GridPoint): string {
  return `${point.x},${point.y}`;
}
