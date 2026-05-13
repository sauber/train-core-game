import type { iSimulation } from "../types.ts";

/** Repair degraded tracks */
export function repairTracks(sim: iSimulation): boolean {
  for (const track of sim.network.tracks) {
    if (track.isBroken) {
      const cost = Math.ceil(track.distance * sim.trackCost * 0.5); // 50% of build cost
      if (cost > sim.balance) continue;

      track.repair();
      // No event logging since sim.event doesn't exist
      return true;
    }
  }

  return false;
}
