import type { Simulation } from "../simulation/mod.ts";
import { Stations } from "../station/mod.ts";

/** A list of all stations which do no have any connections */
export function unConnectedStations(game: Simulation): Stations {
  const matching = new Stations();
  for (const station of game.stations) {
    if (station.tracks.size == 0) matching.add(station);
  }
  return matching;
}
