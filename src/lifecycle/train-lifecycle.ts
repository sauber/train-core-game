import { Lifecycle } from "./lifecycle.ts";
import type { Simulation } from "../simulation/mod.ts";
import { Train } from "../train/mod.ts";
import { Station } from "../station/mod.ts";
import { Track } from "../track/mod.ts";
import type { Location } from "../train/mod.ts";
import type { TrainState } from "../train/mod.ts";

class TrainLifecycle extends Lifecycle<Train> {
  constructor(game: Simulation) {
    super(game);
  }

  /** Add train to a location (station or track) with lifecycle logging */
  spawn(train: Train, target: Location): Train {
    // Add train to target location
    const result = train.add(this.game, target);
    if (result instanceof Error) {
      throw result;
    }

    // Log the event
    let locationName = "unknown";
    if (target instanceof Station) {
      locationName = target.name;
    } else if (target instanceof Track) {
      // For tracks, we could show the connected stations
      const stations = Array.from(target.stations);
      if (stations.length >= 2) {
        locationName = `${stations[0].name}-${stations[1].name}`;
      } else {
        locationName = "track";
      }
    }

    this.game.event(`Train added to ${locationName}`);
    return train;
  }

  /** Remove train from simulation with lifecycle logging */
  destroy(train: Train): void {
    // Remove train from simulation
    const result = train.remove(this.game);
    if (result instanceof Error) {
      // Log error but continue
      this.game.event(`Failed to remove train: ${result.message}`);
      return;
    }

    // Log the event
    let locationName = "unknown";
    if (train.location instanceof Station) {
      locationName = train.location.name;
    } else if (train.location instanceof Track) {
      const stations = Array.from(train.location.stations);
      if (stations.length >= 2) {
        locationName = `${stations[0].name}-${stations[1].name}`;
      } else {
        locationName = "track";
      }
    }

    this.game.event(`Train removed from ${locationName}`);
  }

  /** Move train to a target location with lifecycle logging */
  move(train: Train, target: Location): void {
    // Move train to target location
    const result = train.move(target);
    if (result instanceof Error) {
      throw result;
    }

    // Log the event
    let fromLocation = "unknown";
    let toLocation = "unknown";
    
    if (train.location instanceof Station) {
      fromLocation = train.location.name;
    } else if (train.location instanceof Track) {
      const stations = Array.from(train.location.stations);
      if (stations.length >= 2) {
        fromLocation = `${stations[0].name}-${stations[1].name}`;
      } else {
        fromLocation = "track";
      }
    }

    if (target instanceof Station) {
      toLocation = target.name;
    } else if (target instanceof Track) {
      const stations = Array.from(target.stations);
      if (stations.length >= 2) {
        toLocation = `${stations[0].name}-${stations[1].name}`;
      } else {
        toLocation = "track";
      }
    }

    this.game.event(`Train moved from ${fromLocation} to ${toLocation}`);
  }

  /** Break the train */
  breakTrain(train: Train): void {
    train.break();
    this.game.event(`Train broke down`);
  }

  /** Repair the train */
  repairTrain(train: Train): void {
    train.repair();
    this.game.event(`Train repaired`);
  }

  /** Get current state */
  getState(train: Train): TrainState {
    return train.state;
  }
}

export { TrainLifecycle };
