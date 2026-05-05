import { type Distance, distance } from "../area/area.ts";
import type { Simulation } from "../simulation/mod.ts";
import { type Station, Stations } from "../station/station.ts";
import { Trains } from "../train/train.ts";
import { LimitSet } from "../utils/limitset.ts";

export class Tracks extends LimitSet<Track> {
  constructor(limit: number = Infinity, values: Array<Track> = []) {
    super(limit, values);
  }
}

/** Link between two stations */
export class Track {
  /** Optional train on track */
  public readonly trains: Trains;

  /** Set of stations */
  public readonly stations: Stations;

  /** Degraded state of track */
  public degraded: number = 0;

  /** Price of track */
  // public readonly price: number;

  constructor(a: Station, b: Station // public readonly pricePerUnit: number
  ) {
    // Confirm track connect to two different stations
    if (a === b) throw new Error("Track must connect two different stations");
    this.stations = new Stations(2, [a, b]);
    this.trains = new Trains(1);
  }

  /** Add track to simulation */
  public add(game: Simulation): true | Error {
    for (const s of this.stations) {
      if (s.tracks.has(this)) return new Error("Track already exists");
      s.addTrack(this);
    }
    game.tracks.add(this);
    return true;
  }

  /** Remove only if no train on track */
  public remove(game: Simulation): true | Error {
    if (this.trains.size > 0) return new Error("Train on track");
    for (const s of this.stations) {
      s.removeTrack(this);
    }
    game.tracks.delete(this);
    return true;
  }

  /** Distance between stations */
  public get distance(): Distance {
    const [a, b] = Array.from(this.stations);
    return distance(a.location, b.location);
  }

  /** Given one station, which one is at the other end */
  public otherStation(station: Station): Station {
    for (const s of this.stations) {
      if (s !== station) return s;
    }
    throw new Error("Station not in track");
  }
}
