import type { Simulation } from "../play/simulation.ts";

/** Repair broken trains */
export function repairTrains(game: Simulation): boolean {
  for (const train of game.trains) {
    if (train.degraded >= 1) {
      // Cost of repair
      const cost = Math.max(1, Math.round(train.type.cost / 2));
      // Repair train
      train.degraded = 0;
      game.event(`${train.type.name} train repaired`, -cost);
      return true;
    }
  }
  return false;
}
