import type { Simulation } from "../simulation/mod.ts";
import { Station } from "../station/mod.ts";
import type { Train } from "../train/mod.ts";
import { LimitSet } from "../utils/mod.ts";

export type Location = Station | Train;

function isStation(location: Location): boolean {
  return location instanceof Station;
}

/** A traveler from station trying to reach another destination */
export class Passenger {
  /** Current location of passenger */
  public location: Location;

  constructor(
    /** Travel origin */
    public readonly origin: Station,
    /** Travel destination  */
    public readonly destination: Station,
  ) {
    this.location = origin;
  }

  /** Add passenger to simulation */
  public add(game: Simulation): true | Error {
    const location: Location = this.location;
    if (location.passengers.isFull) return new Error("Full");
    location.passengers.add(this);
    game.passengers.add(this);
    return true;
  }

  /** Remove passenger from game */
  public remove(game: Simulation): void {
    const location: Location = this.location;
    location.passengers.delete(this);
    game.passengers.delete(this);
  }

  /** Move passenger from one place to another */
  public move(
    target: Location,
  ): true | Error {
    if (target == this.location) return true;
    if (target.passengers.isFull) return new Error("Full");

    // TODO: Prevent teleport
    if (isStation(this.location)) {
      // Boarding
      // const station: Station = this.location;
      // const train: Train = target;
      // if (!station.trains.has(target)) return new Error("Target train not at station, cannot board.");
    } else {
      // Disembark
      // const train: Train = this.location;
      // const station: Station = target;
      // if (!train.location == station) return new Error("Train not at target station, cannot disembark.");
    }

    const current: Location = this.location;
    current.passengers.delete(this);
    this.location = target;
    target.passengers.add(this);
    return true;
  }
}

// export type Passengers = LimitSet<Passenger>;
export class Passengers extends LimitSet<Passenger> {
  constructor(limit: number = Infinity) {
    super(limit);
  }
}
