import { Lifecycle } from "./lifecycle";
import type { Simulation } from "../simulation/mod.ts";
import type { Train, Trains } from "../train/mod.ts";
import type { TrainType } from "../train/train-type.ts";
import { trainPurchaseCost } from "../utils/mod.ts";

class FleetLifecycle extends Lifecycle<Train> {
  constructor(game: Simulation) {
    super(game);
  }

  spawn(type: TrainType, station: import("../station/mod.ts").Station): Train {
    // Create train with lifecycle logging
    const train = new Train(type);
    train.add(this.game, station);

    const cost = trainPurchaseCost(type);
    this.game.event(`${type.name} train inserted in ${station.name}`, -cost);
    this.game.balance -= cost;

    return train;
  }

  destroy(train: Train): void {
    // Remove train from simulation
    train.remove(this.game);
    this.game.event(
      `Removed ${train.type.name} train from ${
        train.location?.name || "network"
      }`,
    );

    // Add resale revenue (50% of purchase price)
    const revenue = trainPurchaseCost(train.type) * 0.5;
    this.game.balance += revenue;
  }
}

export const fleetLifecycle = new FleetLifecycle(this.game);
