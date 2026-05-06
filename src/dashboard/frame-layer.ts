export function createFrameLayer(
  width: number,
  mapHeight: number,
): { topFrame: string; bottomFrame: string; sideFrames: string[] } {
  const topFrame = "┌" + "─".repeat(width - 2) + "┐";
  const bottomFrame = "└" + "─".repeat(width - 2) + "┘";
  const sideFrames = [];
  for (let i = 0; i < mapHeight; i++) {
    const rowChars = Array(width).fill(" ");
    rowChars[0] = "│";
    rowChars[width - 1] = "│";
    sideFrames.push(rowChars.join(""));
  }
  return { topFrame, bottomFrame, sideFrames };
}
