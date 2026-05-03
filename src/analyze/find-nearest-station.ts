import type { Game } from "../play/game.ts";
import type { Station } from "../state/station.ts";
import { type Distance, distance } from "../state/area.ts";

/** From one station, which other station is geographically nearest */
export function findNearestStation(game: Game, station: Station): Station {
  let nearestDistance: Distance = Infinity;
  let nearestStation: Station = station;
  for (const other of game.stations) {
    if (other == station) continue;
    const d = distance(station.location, other.location);
    if (d < nearestDistance) {
      nearestDistance = d;
      nearestStation = other;
    }
  }
  return nearestStation;
}
