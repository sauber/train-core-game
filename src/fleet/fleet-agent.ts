import type { Agent, Simulation } from "../play/simulation.ts";
import { insertTrains } from "./insert-trains.ts";
import { repairTrains } from "./repair-trains.ts";

/** Insert and repair trains */
export const fleetAgent: Agent = (game: Simulation): void => {
  if (repairTrains(game)) return;
  if (insertTrains(game)) return;
};
