import type { Simulation } from "../simulation/mod.ts";
import type { Track } from "../track/mod.ts";

/** Cost unit for building tracks */
export function buildUnitCost(game: Simulation): number {
  return game.initalBalance / game.area.width;
}

/** Total cost for building a specific track */
export function trackBuildCost(game: Simulation, track: Track): number {
  return Math.max(1, Math.round(track.distance * buildUnitCost(game)));
}

/** Cost unit for repairing tracks */
export function repairUnitCost(game: Simulation): number {
  return buildUnitCost(game) * 0.25;
}

/** Total cost for repairing a degraded track */
export function trackRepairCost(game: Simulation, track: Track): number {
  return track.degraded > 0
    ? Math.max(
      1,
      Math.round(track.distance * repairUnitCost(game) * track.degraded),
    )
    : 0;
}
