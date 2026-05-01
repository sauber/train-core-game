import { Passenger } from "../passenger.ts";
import type { State } from "../state.ts";
import type { Station } from "../station.ts";

/** Create passenger at station */
export function createPassenger(
  game: State,
  station: Station,
): Passenger | Error {
  // TODO:
  // Destinations reachable from station
  // const destinations = findDestinations(state, station);
  // Pick a destination (random weighted by station size and distance)
  // Create passenger
  // Add passenger to station

  const destination = [...game.stations][0];
  return new Passenger(station, destination);
}
