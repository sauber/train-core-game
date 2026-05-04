import { type Distance, distance } from "../state/area.ts";
import type { Station, Stations } from "../state/station.ts";
import type { Train } from "../state/train.ts";

export type Tracks = Set<Track>;

/** Link between two stations */
export class Track {
  /** Optional train on track */
  public train: Train | undefined;

  /** Set of stations */
  public readonly stations: Stations;

  /** Price of track */
  // public readonly price: number;

  constructor(a: Station, b: Station // public readonly pricePerUnit: number
  ) {
    // Confirm trakc connect to two different stations
    if (a === b) throw new Error("Track must connect two different stations");
    this.stations = new Set<Station>([a, b]);
    // a.addTrack(this);
    // b.addTrack(this);
    // this.price = Math.max(
    //   1,
    //   Math.round(pricePerUnit * distance(a.location, b.location)),
    // );
  }

  public addTrain(train: Train): boolean | Error {
    if (this.train) return new Error("Track already has train");
    this.train = train;
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
