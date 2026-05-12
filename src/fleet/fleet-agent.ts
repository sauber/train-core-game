import { type Agent, type iSimulation, TrainState } from "../types.ts";

/** Insert and repair trains using lifecycle methods */
export const fleetAgent: Agent = (sim: iSimulation): void => {
  // Repair a train
  for (const train of sim.fleet.trains) {
    if (train.state == TrainState.Broken) {
      train.repair();
      return;
    }
  }

  // Insert a train on an Island which have no trains
  // TODO
};
