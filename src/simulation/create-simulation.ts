import type { iSimulation } from "../types.ts";
import { Simulation } from "./simulation.ts";

export function createSimulation(
  params: Partial<iSimulation> = {},
): iSimulation {
  return new Simulation(params);
}
