import type { Simulation } from "./simulation.ts";
import type { TrainType } from "../train/train-type.ts";

/** Confirm if any of the conditions for termination are met
 * 1. No trains can run, and no money in account for repair
 * 2. All trains are broken and cannot be repaired due to lack of funds
 * 3. No tracks are available for any train because tracks are broken and
 *    there are no funds available for repair
 * 4. No trains in network yet, and no money to buy train
 */
export function isTerminated(game: Simulation): boolean {
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
