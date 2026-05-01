import type { Station } from "./station.ts";
import type { Train } from "./train.ts";

export class Track {
  public train: Train | undefined;
  constructor(public readonly stations: [Station, Station]) {}

  public addTrain(train: Train): boolean | Error {
    if (this.train) return new Error("Track already has train");
    this.train = train;
    return true;
  }
}
