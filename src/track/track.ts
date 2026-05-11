import { distance } from "../area/mod.ts";
import type { Distance, iStation, iTrack, iTrain } from "../types.ts";

/** Link between two stations */
export class Track implements iTrack {
  /** Optional train on track */
  private train: iTrain | undefined;

  /** Set of stations */
  public readonly stations = new Set<iStation>();

  /** Degraded state of track */
  private wear: number = 0;

  /** Price of track */
  // public readonly price: number;

  constructor(a: iStation, b: iStation // public readonly pricePerUnit: number
  ) {
    // Confirm track connect to two different stations
    if (a === b) throw new Error("Track must connect two different stations");
    this.stations.add(a);
    this.stations.add(b);
  }

  /** Distance between stations */
  public get distance(): Distance {
    const [a, b] = Array.from(this.stations);
    return distance(a.location, b.location);
  }

  /** Given one station, which one is at the other end */
  public otherStation(station: iStation): iStation {
    for (const s of this.stations) {
      if (s !== station) return s;
    }
    throw new Error("Station not on track");
  }

  public addTrain(train: iTrain): boolean {
    if (this.train) return false;
    if (this.isBroken) return false;
    this.train = train;
    return true;
  }

  public delTrain(train: iTrain): boolean {
    if (this.train !== train) return false;
    this.train = undefined;
    // Increase wear as train has passed the track
    this.wear += 0.05;
    return true;
  }

  public numTrain(): number {
    return this.train ? 1 : 0;
  }

  public get isFull(): boolean {
    return this.numTrain() >= 1;
  }

  public repair(): boolean {
    this.wear = 0;
    return true;
  }

  public get isBroken(): boolean {
    return this.wear >= 1;
  }
}
