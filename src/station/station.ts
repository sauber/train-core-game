import type {
  iPassenger,
  iStation,
  iTrack,
  iTrain,
  Location,
} from "../types.ts";
import { LimitSet } from "../utils/limitset.ts";

export class Stations extends LimitSet<Station> {
  constructor(limit: number = Infinity, values: Array<Station> = []) {
    super(limit, values);
  }
}

export class Station implements iStation {
  private readonly trains: LimitSet<iTrain>;
  private readonly tracks = new Set<iTrack>();
  private readonly passengers = new Set<iPassenger>();

  /** Total boardings and disembarkments for capacity growth */
  private _transits: number = 0;

  constructor(
    /** Name of station */
    public readonly name: string,
    /** Location */
    public readonly location: Location,
    /** Count of platforms */
    platforms: number,
  ) {
    this.trains = new LimitSet<iTrain>(platforms);
  }

  public get size(): number {
    return this.trains.limit;
  }

  public set size(limit: number) {
    // Cannot remove more platforms than trains at station
    if (limit < this.trains.size) return;
    this.trains.limit = limit;
  }

  public get transits(): number {
    return this._transits;
  }

  /** Add track to station */
  public addTrack(track: iTrack): boolean {
    if (this.tracks.has(track)) return false;
    this.tracks.add(track);
    return true;
  }

  /** Remove track from station */
  public delTrack(track: iTrack): boolean {
    if (!this.tracks.has(track)) return false;
    this.tracks.delete(track);
    return true;
  }

  public numTrack(): number {
    return this.tracks.size;
  }

  /** Add train to station */
  public addTrain(train: iTrain): true {
    if (this.trains.size >= this.trains.limit) {
      throw new Error("No platforms available");
    }
    this.trains.add(train);
    return true;
  }

  /** Train leaves station */
  public delTrain(train: iTrain): boolean {
    if (!this.trains.has(train)) return false;
    this.trains.delete(train);
    return true;
  }

  public numTrain(): number {
    return this.trains.size;
  }

  public get isFull(): boolean {
    return this.trains.isFull;
  }

  public addPassenger(passenger: iPassenger): boolean {
    if (this.passengers.has(passenger)) return false;
    this.passengers.add(passenger);
    this._transits++;
    return true;
  }

  public delPassenger(passenger: iPassenger): boolean {
    if (!this.passengers.has(passenger)) return false;
    this.passengers.delete(passenger);
    this._transits++;
    return true;
  }

  public numPassenger(): number {
    return this.passengers.size;
  }
}
