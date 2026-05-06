export function createTrainLayer(
  trainCellMap: Map<string, string>,
  width: number,
  mapHeight: number,
): string[] {
  const rows = [] as string[];
  for (let y = 0; y < mapHeight; y++) {
    const row = [] as string[];
    for (let x = 0; x < width; x++) {
      row.push(" ");
    }
    rows.push(row.join(""));
  }
  for (const [key, symbol] of trainCellMap.entries()) {
    const [x, y] = key.split(",").map(Number);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (x < 0 || x >= width || y < 0 || y >= mapHeight) continue;
    const row = rows[y].split("");
    row[x] = symbol;
    rows[y] = row.join("");
  }
  return rows;
}
