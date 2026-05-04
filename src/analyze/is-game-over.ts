import type { Simulation } from "../play/simulation.ts";
import type { TrainType } from "../state/train-type.ts";

/** Confirm if any of the conditions for Game Over is met
 * 1. No trains can run, and no money in account for repair
 * 2. Countdown in Profit phases completed
 * 3. No trains in network yet, and no money to buy train
 */
export function isGameover(game: Simulation): boolean {
  if (game.trains.size == 0) {
    if (
      game.balance <
        Math.min(...[...game.trainTypes].map((t: TrainType) => t.cost))
    ) {
      // Have no trains and cannot even buy the cheapest
      return true;
    }
  }
  return false;
}
