/**
 * Central cost calculation module for the simulation.
 * Provides unified cost calculation for all game entities: trains, tracks, repairs.
 */

import type { Simulation } from "../simulation/mod.ts";
import type { TrainType } from "../train/train-type.ts";
import type { Track } from "../track/track.ts";
import { distance } from "../area/area.ts";
import type { Station } from "../station/mod.ts";

/**
 * Calculate the cost to purchase a new train.
 */
export function trainPurchaseCost(type: TrainType): number {
  return Math.max(1, Math.round(type.cost));
}

/**
 * Calculate the cost to repair a broken train.
 */
export function trainRepairCost(type: TrainType): number {
  return Math.max(1, Math.round(type.cost / 2));
}

/**
 * Cost per unit distance for building tracks.
 * Scales with the initial capital and map width.
 */
export function trackBuildUnitCost(game: Simulation): number {
  return game.initialBalance / game.area.width;
}

/**
 * Cost per unit distance for repairing tracks.
 * 25% of the build unit cost.
 */
export function trackRepairUnitCost(game: Simulation): number {
  return trackBuildUnitCost(game) * 0.25;
}

/**
 * Calculate the total cost to build a specific track.
 */
export function trackBuildCost(game: Simulation, track: Track): number {
  return Math.max(1, Math.round(track.distance * trackBuildUnitCost(game)));
}

/**
 * Calculate the total cost to repair a degraded track.
 */
export function trackRepairCost(game: Simulation, track: Track): number {
  if (track.degraded <= 0) return 0;
  return Math.max(
    1,
    Math.round(track.distance * trackRepairUnitCost(game) * track.degraded),
  );
}

/**
 * Calculate the fare for a passenger traveling from origin to destination.
 * Based on the Euclidean distance between stations.
 */
export function passengerFare(origin: Station, destination: Station): number {
  if (origin === destination) return 0;
  const dist = distance(origin.location, destination.location);
  // Fare is proportional to distance, with a minimum of 1
  return Math.max(1, Math.round(dist * 0.5));
}
