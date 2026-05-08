import { Lifecycle } from "./lifecycle.ts";
import type { Simulation } from "../simulation/mod.ts";
import { Train } from "../train/mod.ts";
import type { TrainType } from "../train/train-type.ts";
import { trainPurchaseCost, trainRepairCost } from "../utils/mod.ts";
import { Station } from "../station/mod.ts";
import type { Trains } from "../train/mod.ts";

class FleetLifecycle extends Lifecycle<Train> {
  constructor(game: Simulation) {
    super(game);
  }

  spawn(type: TrainType, station: Station): Train {
    // Create train with lifecycle logging
    const train = new Train(type);
    train.add(this.game, station);

    const cost = trainPurchaseCost(type);
    this.game.event(`${type.name} train inserted in ${station.name}`, -cost);
    this.game.balance -= cost;

    return train;
  }

  repair(train: Train): void {
    // Repair train
    const cost = trainRepairCost(train.type);
    train.degraded = 0;
    this.game.event(`${train.type.name} train repaired`, -cost);
    this.game.balance -= cost;
  }

  destroy(train: Train): void {
    // Remove train from simulation
    train.remove(this.game);
    this.game.event(
      `Removed ${train.type.name} train from ${
        train.location instanceof Station ? train.location.name : "network"
      }`,
    );

    // Add resale revenue (50% of purchase price)
    const revenue = trainPurchaseCost(train.type) * 0.5;
    this.game.balance += revenue;
  }
}

export { FleetLifecycle };
