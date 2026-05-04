import type { Simulation } from "../play/simulation.ts";
import type { Station, Stations } from "../station/station.ts";

/** A list of all stations which do no have any connections */
export function unConnectedStations(game: Simulation): Stations {
  const matching = new Set<Station>();
  for (const station of game.stations) {
    if (station.tracks.size == 0) matching.add(station);
  }
  return matching;
}
