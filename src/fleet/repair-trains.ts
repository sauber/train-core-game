import type { Simulation } from "../simulation/mod.ts";
import { trainRepairCost } from "../utils/mod.ts";

/** Repair broken trains */
export function repairTrains(game: Simulation): boolean {
  for (const train of game.trains) {
    if (train.degraded >= 1) {
      // Cost of repair
      const cost = trainRepairCost(train.type);
      // Repair train
      train.degraded = 0;
      game.event(`${train.type.name} train repaired`, -cost);
      return true;
    }
  }
  return false;
}
