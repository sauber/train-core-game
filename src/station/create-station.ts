import type { iStation, Location } from "../types.ts";
import { createStationName } from "./create-station-name.ts";
import { Station } from "./station.ts";

/** Create a station */
export function createStation(
  location: Location,
  platforms: number = 1,
): iStation {
  const name = createStationName();
  return new Station(name, location, platforms);
}
