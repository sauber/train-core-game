import type { Station } from "./station.ts";
import type { Train } from "./train.ts";

export class Passenger {
  public location: Station | Train;

  constructor(
    public readonly origin: Station,
    public readonly destination: Station,
  ) {
    this.location = this.origin;
  }
}
