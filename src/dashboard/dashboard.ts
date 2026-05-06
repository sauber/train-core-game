import type { Simulation } from "../simulation/simulation.ts";
import { renderLegend, renderMapCanvas } from "./map-canvas.ts";
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

  // Calculate line allocation based on AGENTS.md percentages:
  // Map: 70%, Inventory: 15%, Events: 15%
  const mapLines = Math.floor(totalHeight * 0.7);
  const inventoryLines = Math.floor(totalHeight * 0.15);
  const eventsLines = Math.floor(totalHeight * 0.15);
  const reservedLines = inventoryLines + eventsLines;
  const mapHeight = Math.max(4, totalHeight - reservedLines);

  const areaWidth = game.area.width || 1;
  const areaHeight = game.area.height || 1;

  const { rows } = renderMapCanvas(
    game,
    width,
    mapHeight,
    areaWidth,
    areaHeight,
  );
  const legend = renderLegend(game);
  const inventory = renderInventory(game);
  const events = renderJournal(game);

  const output = [...rows, ...legend, inventory, ...events].join("\n");

  // Ensure total output has exactly totalHeight lines
  const outputLines = output.split("\n");
  const paddingNeeded = totalHeight - outputLines.length;
  if (paddingNeeded > 0) {
    const padding = Array.from({ length: paddingNeeded }, () => "");
    return [...outputLines, ...padding].join("\n");
  }

  return output;
}
