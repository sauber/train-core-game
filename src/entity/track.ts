import { type Distance, distance } from "./area.ts";
import type { Station, Stations } from "./station.ts";
import type { Train } from "./train.ts";

export type Tracks = Set<Track>;

/** Link between two stations */
export class Track {
  /** Optional train on track */
  public train: Train | undefined;

  /** Set of stations */
  public readonly stations: Stations;

  constructor(a: Station, b: Station) {
    // Confirm trakc connect to two different stations
    if (a === b) throw new Error("Track must connect two different stations");
    this.stations = new Set<Station>([a, b]);
    a.addTrack(this);
    b.addTrack(this);
  }

  public addTrain(train: Train): boolean | Error {
    if (this.train) return new Error("Track already has train");
    this.train = train;
    return true;
  }

  public get distance(): Distance {
    const [a, b] = Array.from(this.stations);
    return distance(a.location, b.location);
  }
}
