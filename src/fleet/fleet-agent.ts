import type { Agent, Simulation } from "../simulation/mod.ts";
import { insertTrains } from "./mod.ts";
import { repairTrains } from "./mod.ts";

/** Insert and repair trains */
export const fleetAgent: Agent = (game: Simulation): void => {
  if (repairTrains(game)) return;
  if (insertTrains(game)) return;
};
