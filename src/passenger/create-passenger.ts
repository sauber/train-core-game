import type { Station } from "../station/station.ts";
import { Passenger } from "./passenger.ts";

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
