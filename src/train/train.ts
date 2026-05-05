import type { TrainType } from "./train-type.ts";
import { Passengers } from "../passenger/mod.ts";
import { LimitSet } from "../utils/limitset.ts";
import { Station } from "../station/station.ts";
import type { Track } from "../track/track.ts";
import type { Simulation } from "../simulation/mod.ts";

export class Trains extends LimitSet<Train> {
  constructor(limit: number = Infinity) {
    super(limit);
  }
}

export type Location = Station | Track;

export class Train {
  /** Passengers */
  public readonly passengers: Passengers;

  /** Location of train */
  public location: Location | undefined;

  /** Degraded state of train */
  public degraded: number = 0;

  constructor(
    /** Type of train */
    public readonly type: TrainType,
  ) {
    this.passengers = new Passengers(type.maximum);
  }

  /** Insert train in simulation */
  public add(game: Simulation, target: Location): true | Error {
    if (target.trains.isFull) return new Error("Full");
    target.trains.add(this);
    this.location = target;
    game.trains.add(this);
    return true;
  }

  /** Remove train from simulation */
  public remove(game: Simulation): true | Error {
    if (this.passengers.size > 0) return new Error("Passengers on train");
    this.location?.trains.delete(this);
    game.trains.delete(this);
    return true;
  }

  /** Move train from station to track, or track to station */
  public move(target: Location): true | Error {
    if (target == this.location) return true;
    if (target.trains.isFull) return new Error("Full");

    // Prevent teleport
    if (this.location instanceof Station) {
      // Leaving
      const station: Station = this.location;
      const track = target as Track;
      if (!station.tracks.has(track)) {
        return new Error("Target track not at station, cannot leave.");
      }
    } else {
      // Entering
      const track = this.location as Track;
      const station = target as Station;
      if (!track.stations.has(station)) {
        return new Error("Track not at target station, cannot enter.");
      }
    }

    const current: Location = this.location as Location;
    current.trains.delete(this);
    this.location = target;
    target.trains.add(this);
    return true;
  }
}
