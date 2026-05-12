import { type Agent, type iSimulation, TrainState } from "../types.ts";

/**
 * Insert and repair trains using lifecycle methods
 */
export const fleetAgent: Agent = (sim: iSimulation): void => {
  // Repair broken trains
  for (const train of sim.fleet.trains) {
    if (train.state === TrainState.Broken) {
      train.repair();
    }
  }

  // Insert train on island with no trains
  for (const island of sim.network.islands) {
    if (island.trains.size === 0) {
      // Find a station in this island
      const station = Array.from(island.stations)[0];
      if (!station) continue;

      // Find affordable train type
      const affordableType = Array.from(sim.trainTypes).find((type) =>
        sim.balance >= type.cost
      );
      if (!affordableType) continue;

      // Create and add train
      const newTrain = sim.createTrain(affordableType, station);
      sim.fleet.addTrain(newTrain);
      break; // Insert one train per island
    }
  }
};
