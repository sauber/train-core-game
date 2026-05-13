import type { Agent, iRoute, iSimulation, iStation } from "../types.ts";
import { createPassenger } from "./create-passenger.ts";

/**
 * Passenger agent creates passengers at random stations and assigns a route.
 */
export const passengerAgent: Agent = (sim: iSimulation): void => {
  const stations = Array.from(sim.area.stations);
  if (stations.length < 2) return;

  // Choose random origin and destination (different)
  const origin = stations[Math.floor(Math.random() * stations.length)];
  let destination: iStation;
  do {
    destination = stations[Math.floor(Math.random() * stations.length)];
  } while (destination === origin);

  // Determine route using shortest path on the island containing the origin
  let route: iRoute;
  try {
    const island = sim.network.islandByStation(origin);
    route = island.shortestPath(origin, destination);
  } catch {
    // Fallback route when station is isolated
    route = {
      distance: 0,
      shift: () => origin,
      nextMatch: () => false,
    } as unknown as iRoute;
  }

  // Create passenger and add to simulation
  const passenger = createPassenger(origin, destination, route);
  sim.population.addPassenger(passenger);
};
