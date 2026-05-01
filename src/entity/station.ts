import type { Train } from "./train.ts";

export class Station {
  /** Trains currently at station */
  public readonly trains = new Set<Train>();

  constructor(
    /** Name of station */
    public readonly name: string,
    /** Count of platforms */
    private platforms: number,
  ) {}

  /** Number of free platforms availabls */
  public get capacity(): number {
    return this.platforms - this.trains.size;
  }

  /** Add train to station */
  public addTrain(train: Train): boolean {
    if (this.capacity <= 0) return false;
    this.trains.add(train);
    return true;
  }

  /** Train leaves station */
  public removeTrain(train: Train): boolean {
    if (!this.trains.has(train)) return false;
    this.trains.delete(train);
    return true;
  }
}
