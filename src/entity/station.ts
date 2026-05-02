import type { Train, Trains } from "./train.ts";
import type { Location } from "./area.ts";
import type { Track, Tracks } from "./track.ts";

export type Stations = Set<Station>;

export class Station {
  /** Trains currently at station */
  public readonly trains: Trains = new Set<Train>();

  /** Tracks connected to station */
  public readonly tracks: Tracks = new Set<Track>();

  constructor(
    /** Name of station */
    public readonly name: string,
    /** Location */
    public readonly location: Location,
    /** Count of platforms */
    private platforms: number,
  ) {}

  /** Number of platforms not in use */
  public get availablePlatforms(): number {
    return this.platforms - this.trains.size;
  }

  /** Add train to station */
  public addTrain(train: Train): boolean {
    if (this.availablePlatforms <= 0) return false;
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
}
