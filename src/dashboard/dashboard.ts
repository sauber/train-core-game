import type { Simulation } from "../simulation/simulation.ts";
import { renderMapCanvas, renderLegend } from "./map-canvas.ts";
import { renderInventory } from "./inventory.ts";
import { renderJournal } from "./journal.ts";

export type RenderMapOptions = {
  width?: number;
  height?: number; // Total height of output in lines
};

const DEFAULT_WIDTH = 80;
const DEFAULT_TOTAL_HEIGHT = 24;

export function renderMap(
  game: Simulation,
  options: RenderMapOptions = {},
): string {
  const width = Math.max(20, options.width ?? DEFAULT_WIDTH);
  const totalHeight = Math.max(10, options.height ?? DEFAULT_TOTAL_HEIGHT);

  // Reserve lines for legend (2) and footer (1 balance + 3 events = 4) = 6 total
  const legendLines = 2;
  const footerLines = 4; // 1 balance + 3 events
  const reservedLines = legendLines + footerLines;
  const mapHeight = Math.max(4, totalHeight - reservedLines);

  const areaWidth = game.area.width || 1;
  const areaHeight = game.area.height || 1;

  const { rows } = renderMapCanvas(game, width, mapHeight, areaWidth, areaHeight);
  const legend = renderLegend(game);
  const footer = [renderInventory(game), ...renderJournal(game)];

  const output = [...rows, ...legend, ...footer].join("\n");

  // Ensure total output has exactly totalHeight lines
  const outputLines = output.split("\n");
  const paddingNeeded = totalHeight - outputLines.length;
  if (paddingNeeded > 0) {
    const padding = Array.from({ length: paddingNeeded }, () => "");
    return [...outputLines, ...padding].join("\n");
  }

  return output;
}
