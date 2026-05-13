import type { Agent, iSimulation, iStation } from "../types.ts";

/**
 * Track agent connects unconnected stations to nearest neighbor
 */
export const trackAgent: Agent = (sim: iSimulation): void => {
  // Find isolated stations (no tracks)
  const isolatedStations = Array.from(sim.area.stations).filter(
    (station) => station.numTrack() === 0,
  );

  if (isolatedStations.length === 0) return;

  // Find nearest neighbor for each isolated station
  let bestIsolated: iStation | null = null;
  let bestNearest: iStation | null = null;
  let bestDist = Infinity;

  for (const isolated of isolatedStations) {
    let minDist = Infinity;
    let nearest: iStation | null = null;

    for (const other of sim.area.stations) {
      if (other === isolated) continue;
      const dist = Math.sqrt(
        Math.pow(isolated.location.x - other.location.x, 2) +
          Math.pow(isolated.location.y - other.location.y, 2),
      );
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

  if (!bestIsolated || !bestNearest) return;

  // Cost of track
  const cost = bestDist * sim.trackCost;

  // Cost of cheapest train
  const minTrainCost = Math.min(
    ...Array.from(sim.trainTypes).map((t) => t.cost),
  );

  // Ensure funds are available for a train after building track
  if (cost + minTrainCost > sim.balance) return;

  // Build track
  sim.createTrack(bestIsolated, bestNearest);
};
