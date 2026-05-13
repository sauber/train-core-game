import type { Agent, iRoute, iSimulation, iStation } from "../types.ts";

/**
 * Population agent manages passenger flow and density
 */
export const populationAgent: Agent = (sim: iSimulation): void => {
  // Spawn new passengers at stations with available capacity
  for (const station of sim.area.stations) {
    if (station.numPassenger() < station.size) {
      const origin = station;
      const destinations = Array.from(sim.area.stations).filter(
        (s) => s !== origin,
      );
      // If no other stations, skip passenger creation
      if (destinations.length === 0) continue;
      const destination =
        destinations[Math.floor(Math.random() * destinations.length)];
      // Determine route safely – fallback if station not in network
      let route: iRoute;
      try {
        const island = sim.network.islandByStation(origin);
        route = island.shortestPath(origin, destination);
      } catch {
        route = {
          distance: 0,
          shift: () => origin,
          nextMatch: () => false,
        } as unknown as iRoute;
      }
      sim.population.addPassenger(
        sim.createPassenger(origin, destination, route),
      );
      // Only create one passenger per tick
      break;
    }
  }
};
