import { CharPlot } from "@sauber/widgets";
import type { Simulation } from "../simulation/mod.ts";
import { renderInventory } from "./inventory.ts";
import { renderJournal } from "./journal.ts";
import { backgroundLayer } from "./background-layer.ts";
import { frameLayer } from "./frame-layer.ts";
import { trackLayer } from "./track-layer.ts";
import { stationLayer } from "./station-layer.ts";
import { trainLayer } from "./train-layer.ts";

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
  // Inventory: 1 line, Events: 15%, Map: Rest
  const inventoryLines = 1;
  const eventsLines = Math.round(totalHeight * 0.15);
  const reservedLines = inventoryLines + eventsLines;
  const mapHeight = Math.max(4, totalHeight - reservedLines);

  const canvas = new CharPlot();
  backgroundLayer(canvas, width, mapHeight);
  frameLayer(canvas, width, mapHeight);
  trackLayer(canvas, width, mapHeight, game);
  stationLayer(canvas, width, mapHeight, game);
  trainLayer(canvas, width, mapHeight, game);

  const inventory = renderInventory(game);
  const events = renderJournal(game, eventsLines);
  return [canvas.toString(), inventory, ...events].join("\n");
}
