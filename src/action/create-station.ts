import { createStationName } from "./create-station-name.ts";
import type { State } from "../entity/state.ts";
import type { Station } from "../entity/station.ts";

/** Create a station on the area */
export function createStation(state: State): Station {
  // Pick random station name
  const name: string = createStationName();

  // Create station somewhere on the map
  const station: Station = state.area.createStation(name, 1);

  // Add to list of stations
  state.stations.add(station);

  return station;
}
