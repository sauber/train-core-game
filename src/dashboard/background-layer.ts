export function createBackgroundLayer(width: number, height: number): string[] {
  const rows = [];
  for (let y = 0; y < height; y++) {
    rows.push(Array(width).fill(" ").join(""));
  }
  return rows;
}
