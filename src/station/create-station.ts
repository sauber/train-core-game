import { createStationName } from "./create-station-name.ts";
import type { Simulation } from "../simulation/mod.ts";
import type { Station } from "../station/mod.ts";

/** Create a station on the area */
export function createStation(state: Simulation): Station {
  // Pick random station name
  const name: string = createStationName();

  // Create station somewhere on the map
  const station: Station = state.area.createStation(name, 1);

  // Add to list of stations
  state.stations.add(station);

  return station;
}
