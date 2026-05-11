import type { Agent, iSimulation } from "../types.ts";

/** Control station operations */
export const stationAgent: Agent = (sim: iSimulation): void => {
  // Grow number of platforms on all qualifying stations
  for (const station of sim.area.stations) {
    const levels = sim.platformLevels;
    levels.forEach((l, index) => {
      if (station.transits >= l) {
        station.size = index + 1;
      }
    });
  }
};
