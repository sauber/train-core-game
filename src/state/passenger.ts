import { Network } from "../analyze/network.ts";
import type { Station, Stations } from "./station.ts";
import type { Train } from "./train.ts";

/** A traveler from station trying to reach another destination */
export class Passenger {
  // Travel destination
  public readonly destination: Station;

  // Current location of passenger
  public location: Station | Train;

  constructor(
    public readonly origin: Station,
  ) {
    // Confirm destinations exist at station
    const network = new Network(origin);
    if (network.stations.size < 2) {
      throw new Error(
        `No destinations found at station ${origin.name}, passenger not created.`,
      );
    }

    // Pick a destination (random weighted by station size and distance)
    const destinations: Stations = network.stations;
    destinations.delete(origin);
    this.destination =
      [...destinations][Math.floor(Math.random() * destinations.size)];

    // Current location is station where passenger is created
    this.location = this.origin;
  }
}
