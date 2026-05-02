import type { Station } from "../entity/station.ts";
import { Passenger } from "../entity/passenger.ts";

/** Create passenger at station */
export function createPassenger(
  station: Station,
): Passenger | Error {
  if (station.tracks.size < 1) {
    return new Error(
      `No destinations found at station ${station.name}, passenger not created.`,
    );
  }
  return new Passenger(station);
}
