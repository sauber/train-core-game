import type { CharPlot } from "@sauber/widgets";
import type { iSimulation } from "../types.ts";

/** Draw chars on a canvas */
export interface Layer {
  (canvas: CharPlot, width: number, height: number, sim?: iSimulation): void;
}
