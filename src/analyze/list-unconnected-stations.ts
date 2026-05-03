import type { Game } from "../play/game.ts";
import type { Station, Stations } from "../state/station.ts";

/** A list of all stations which do no have any connections */
export function unConnectedStations(game: Game): Stations {
  const matching = new Set<Station>();
  for (const station of game.stations) {
    if (station.tracks.size == 0) matching.add(station);
  }
  return matching;
}
