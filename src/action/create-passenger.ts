import type { Station, Stations } from "../entity/station.ts";
import { Passenger } from "../entity/passenger.ts";
import { findDestinations } from "./find-destinations.ts";

/** Create passenger at station */
export function createPassenger(
  station: Station,
): Passenger | Error {
  // TODO: A passenger controller should decide destination
  // For now pick any random reachable destination

  
  const destinations: Stations = findDestinations(station);
  destinations.delete(station);
  if (destinations.size < 1) {
    return Error(`No destinations found at station ${station.name}`);
  }
  const destination: Station =
    [...destinations][Math.floor(Math.random() * destinations.size)];
  return new Passenger(station, destination);
}
