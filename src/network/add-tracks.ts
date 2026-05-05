import type { Simulation } from "../simulation/mod.ts";
import { Track, trackBuildCost } from "../track/mod.ts";
import { distance } from "../area/mod.ts";
import type { Station } from "../station/mod.ts";

/** Find an isolated station and its nearest neighbor to connect */
function findIsolatedStation(
  game: Simulation,
): { isolated: Station; nearest: Station } | null {
  const isolatedStations = Array.from(game.area.stations).filter(
    (station) => station.tracks.size === 0,
  );

  if (isolatedStations.length === 0) return null;

  let bestIsolated: Station | null = null;
  let bestNearest: Station | null = null;
  let bestDist = Infinity;

  for (const isolated of isolatedStations) {
    let minDist = Infinity;
    let nearest: Station | null = null;
    for (const other of game.area.stations) {
      if (other === isolated) continue;
      const dist = distance(isolated.location, other.location);
      if (dist < minDist) {
        minDist = dist;
        nearest = other;
      }
    }
    if (minDist < bestDist && nearest) {
      bestDist = minDist;
      bestIsolated = isolated;
      bestNearest = nearest;
    }
  }

  return bestIsolated && bestNearest
    ? { isolated: bestIsolated, nearest: bestNearest }
    : null;
}

/** Add a track to a station which has no tracks already.
 * Connect to nearest other station.
 * Only build one track.
 * Only build track if affordable.
 * Affordable means: after subtracting track cost, balance must be >= cheapest train price.
 */
export function addTracks(game: Simulation): boolean {
  const stations = findIsolatedStation(game);
  if (!stations) return false;

  const { isolated, nearest } = stations;
  const track = new Track(isolated, nearest);
  const cost = trackBuildCost(game, track);

  const minTrainCost = Math.min(
    ...Array.from(game.trainTypes).map((t) => t.cost),
  );
  if (game.balance - cost < minTrainCost) return false;

  const result = track.add(game);
  if (result === true) {
    game.event(
      `Track built between ${isolated.name} and ${nearest.name}`,
      -cost,
    );
    return true;
  }

  return false;
}
