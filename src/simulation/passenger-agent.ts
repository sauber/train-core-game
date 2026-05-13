import type { Agent, iRoute, iSimulation, iStation } from "../types.ts";
import { createPassenger } from "../passenger/mod.ts";

/**
 * Passenger agent creates passengers at random stations and assigns a route.
 * It also attempts to board passengers onto waiting trains when possible.
 */
export const passengerAgent: Agent = (sim: iSimulation): void => {
  // Create a passenger if there are at least two stations
  const stations = Array.from(sim.area.stations);
  if (stations.length < 2) return;

  // Choose random origin and destination (different)
  const origin = stations[Math.floor(Math.random() * stations.length)];
  let destination: iStation;
  do {
    destination = stations[Math.floor(Math.random() * stations.length)];
  } while (destination === origin);

  // Determine route using shortest path on the island containing the origin
  const island = sim.network.islandByStation(origin);
  const route: iRoute = island.shortestPath(origin, destination);

  // Create passenger and add to simulation
  const passenger = createPassenger(origin, destination, route);
  sim.population.addPassenger(passenger);
  // No further actions (boarding handled by other agents)
};
