import type { iSimulation } from "../types.ts";
import { Simulation } from "./simulation.ts";

export function createSimulation(): iSimulation {
  return new Simulation();
}
