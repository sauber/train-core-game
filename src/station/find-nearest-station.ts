import type { Simulation } from "../simulation/mod.ts";
import type { Station } from "../station/mod.ts";
import { type Distance, distance } from "../area/mod.ts";

/** From one station, which other station is geographically nearest */
export function findNearestStation(
  game: Simulation,
  station: Station,
): Station {
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
