import { brailleCellValue } from "./map-utils.ts";

export function createBrailleLayer(
  pixels: Array<Array<boolean>>,
  width: number,
  mapHeight: number,
): string[] {
  const rows = [] as string[];
  for (let cellY = 0; cellY < mapHeight; cellY++) {
    const row = [] as string[];
    for (let cellX = 0; cellX < width; cellX++) {
      row.push(brailleCellValue(pixels, cellX, cellY));
    }
    rows.push(row.join(""));
  }
  return rows;
}
