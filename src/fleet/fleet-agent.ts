import type { Agent, Simulation } from "../simulation/mod.ts";
import { FleetLifecycle } from "../lifecycle/fleet-lifecycle.ts";
import type { Station } from "../station/mod.ts";
import type { TrainType } from "../train/train-type.ts";

/** Insert and repair trains using lifecycle methods */
export const fleetAgent: Agent = (game: Simulation): void => {
  const fleetLifecycle = new FleetLifecycle(game);

  // Repair trains using lifecycle
  for (const train of game.trains) {
    if (train.degraded >= 1) {
      fleetLifecycle.repair(train);
      return;
    }
  }

  // Insert trains using lifecycle - find station and train type
  const stations = [...game.stations];
  if (stations.length === 0) return;

  const trainTypes = [...game.trainTypes];
  if (trainTypes.length === 0) return;

  const station: Station = stations[0];
  const type: TrainType = trainTypes[0];

  fleetLifecycle.spawn(type, station);
};
