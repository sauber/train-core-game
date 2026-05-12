import type { iSimulation, iStation } from "../types.ts";
import { distance } from "../area/mod.ts";

/** Find an isolated station and its nearest neighbor to connect to */
function findIsolatedStation(
  sim: iSimulation,
): { isolated: iStation; nearest: iStation } | null {
  const isolatedStations = Array.from(sim.area.stations).filter(
    (station) => station.numTrack() === 0,
  );

  if (isolatedStations.length === 0) return null;

  let bestIsolated: iStation | null = null;
  let bestNearest: iStation | null = null;
  let bestDist = Infinity;

  for (const isolated of isolatedStations) {
    let minDist = Infinity;
    let nearest: iStation | null = null;
    for (const other of sim.area.stations) {
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
export function addTracks(sim: iSimulation): boolean {
  const stations = findIsolatedStation(sim);
  if (!stations) return false;
  const { isolated, nearest } = stations;

  // Cost
  const cost = distance(isolated.location, nearest.location) * sim.trackCost;

  // Cost of most cheap train
  const minTrainCost = Math.min(
    ...Array.from(sim.trainTypes).map((t) => t.cost),
  );

  // Ensure funds are available for a train after building track
  if (cost + minTrainCost > sim.balance) return false;

  // Build track
  sim.createTrack(isolated, nearest);
  return true;
}
