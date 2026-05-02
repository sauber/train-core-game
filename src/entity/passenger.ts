import type { Station, Stations } from "./station.ts";
import type { Train } from "./train.ts";

/** From one stations, create a list of recursively all possible destination stations */
export function findDestinations(
  station: Station,
  stations: Stations = new Set<Station>([station]),
): Stations {
  station.tracks.forEach((track) => {
    const other: Station = track.otherStation(station);
    if (!stations.has(other)) {
      stations.add(other);
      findDestinations(other, stations);
    }
  });
  return stations;
}

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
    const destinations: Stations = findDestinations(origin);
    destinations.delete(origin);
    if (destinations.size < 1) {
      throw new Error(
        `No destinations found at station ${origin.name}, passenger not created.`,
      );
    }

    // Pick a destination (random weighted by station size and distance)
    this.destination =
      [...destinations][Math.floor(Math.random() * destinations.size)];

    // Current location is station where passenger is created
    this.location = this.origin;
  }
}
