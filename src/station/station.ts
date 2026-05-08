import { type Train, Trains } from "../train/mod.ts";
import type { Location } from "../area/mod.ts";
import { type Track, Tracks } from "../track/mod.ts";
import { Passengers } from "../passenger/mod.ts";
import { LimitSet } from "../utils/mod.ts";

export class Stations extends LimitSet<Station> {
  constructor(limit: number = Infinity, values: Array<Station> = []) {
    super(limit, values);
  }
}

export class Station {
  /** Trains currently at station */
  public readonly trains: Trains;

  /** Tracks connected to station */
  public readonly tracks: Tracks = new Tracks();

  public readonly passengers: Passengers = new Passengers();

  /** Revenue collected at this station */
  public revenue: number = 0;

  /** Total boardings and disembarkments for capacity growth */
  public activity: number = 0;

  constructor(
    /** Name of station */
    public readonly name: string,
    /** Location */
    public readonly location: Location,
    /** Count of platforms */
    public platforms: number,
  ) {
    this.trains = new Trains(platforms);
  }

  /** Number of platforms not in use */
  public get availablePlatforms(): number {
    return this.platforms - this.trains.size;
  }

  /** Add train to station */
  public addTrain(train: Train): true | Error {
    if (this.availablePlatforms <= 0) {
      return new Error("No platforms available");
    }
    this.trains.add(train);
    return true;
  }

  /** Train leaves station */
  public removeTrain(train: Train): boolean {
    if (!this.trains.has(train)) return false;
    this.trains.delete(train);
    return true;
  }

  /** Add track to station */
  public addTrack(track: Track): boolean {
    if (this.tracks.has(track)) return false;
    this.tracks.add(track);
    return true;
  }

  /** Remove track from station */
  public removeTrack(track: Track): boolean {
    if (!this.tracks.has(track)) return false;
    this.tracks.delete(track);
    return true;
  }

  /** Update activity count and manage platform growth */
  public updateActivity(): void {
    this.activity++;
    // Platform growth thresholds
    const thresholds = [
      { count: 0, platforms: 1 },
      { count: 100, platforms: 2 },
      { count: 250, platforms: 3 },
      { count: 500, platforms: 4 },
    ];

    for (const threshold of thresholds) {
      if (
        this.activity >= threshold.count && this.platforms < threshold.platforms
      ) {
        this.platforms = threshold.platforms;
        // Revenue from increased capacity
        const additionalRevenue =
          (threshold.platforms - (threshold.platforms - 1)) * 50;
        this.revenue += additionalRevenue;
      }
    }
  }
}
