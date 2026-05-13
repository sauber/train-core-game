import { TrainState } from "../types.ts";
import type { Agent, iSimulation } from "../types.ts";

/**
 * Train agent manages train creation, movement, and repairs
 */
export const trainAgent: Agent = (sim: iSimulation): void => {
  // Repair broken trains
  for (const train of sim.fleet.trains) {
    if (train.state === TrainState.Broken) {
      train.repair();
    }
  }

  // Create new trains on islands with no trains
  for (const island of sim.network.islands) {
    if (island.trains.size === 0) {
      const station = Array.from(island.stations)[0];
      if (!station) continue;

      const affordableType = Array.from(sim.trainTypes).find((type) =>
        sim.balance >= type.cost
      );
      if (!affordableType) continue;

      const newTrain = sim.createTrain(affordableType, station);
      sim.fleet.addTrain(newTrain);
      break; // One train per island
    }
  }
};
