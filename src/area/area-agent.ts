import type { Agent, iSimulation } from "../types.ts";

export const areaAgent: Agent = (_sim: iSimulation): void => {
  // Create a new station if area is not full
  if (_sim.area.size < _sim.area.maxStations) {
    _sim.createStation();
  }
};
