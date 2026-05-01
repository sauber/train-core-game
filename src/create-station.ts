import { createStationName } from "./create-station-name.ts";
import type { State } from "./state.ts";
import { Station } from "./station.ts";

/** Create a station on the area */
export function createStation(state: State): boolean | Error {
  // Pick next station name
  const name: string = createStationName();

  // Add to list of stations
  const station = new Station(name, 1);
  state.stations.add(station);

  // Put it somewhere on the map
  state.area.add(station);

  return true;
}
