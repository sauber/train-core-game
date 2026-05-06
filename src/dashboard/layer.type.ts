import type { CharPlot } from "@sauber/widgets";
import type { Simulation } from "../simulation/mod.ts";

/** Draw chars on a canvas */
export interface Layer {
  (canvas: CharPlot, width: number, height: number, game?: Simulation): void;
}
