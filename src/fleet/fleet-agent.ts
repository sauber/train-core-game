import type { Agent, iSimulation } from "../types.ts";

/** Insert and repair trains using lifecycle methods */
export const fleetAgent: Agent = (sim: iSimulation): void => {
  // Repair a train
  for (const train of sim.fleet.trains) {
    if (train.isBroken) {
      train.repair();
      return;
    }
  }

  // Insert a train on an Island which have no trains
  // TODO
};
