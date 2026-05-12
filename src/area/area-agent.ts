import type { Agent, iSimulation } from "../types.ts";

/** Spawn stations at defined capital levels */
export const areaAgent: Agent = (sim: iSimulation): void => {
  // Number of stations in game
  const current_station_count = sim.area.size;

  // Number of stations required
  let stations_required = 0;
  sim.stationLevels.forEach((balance: number, index: number) => {
    if (sim.balance >= balance) stations_required = index + 1;
  });

  // Spawn missing stations
  for (let i = current_station_count; i < stations_required; i++) {
    sim.createStation();
    // Max one action per invocation
    return;
  }
};
