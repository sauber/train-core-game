import type { Agent, Simulation } from "../simulation/mod.ts";
import { createPassenger, Passenger } from "../passenger/mod.ts";
import { passengerFare } from "../utils/mod.ts";

/** Control station operations: passenger spawning, revenue collection, capacity growth */
export const stationAgent: Agent = (game: Simulation): void => {
  // Process each station
  for (const station of game.stations) {
    // Boarding events: passengers boarding trains at this station
    for (const train of station.trains) {
      for (const passenger of train.passengers) {
        if (passenger.origin === station) {
          // Passenger has boarded a train at their origin station
          station.activity++; // Count boarding
          game.event(`Passenger boarded train at ${station.name}`);
        }
      }
    }

    // Revenue collection: check for passengers who have reached their destination
    const toRemove: Set<Passenger> = new Set();
    for (const passenger of station.passengers) {
      if (passenger.destination === station) {
        // Passenger has arrived
        const fare = passengerFare(passenger.origin, passenger.destination);
        station.revenue += fare;
        game.event(`Passenger arrived at ${station.name}, collected $${fare}`);
        toRemove.add(passenger);
        station.activity++; // Count disembarkment
      }
    }
    // Remove arrived passengers
    for (const passenger of toRemove) {
      station.passengers.delete(passenger);
      game.passengers.delete(passenger);
    }

    // Capacity growth based on activity
    const newCapacity = calculateCapacity(station.activity);
    if (newCapacity > station.platforms) {
      station.platforms = newCapacity;
      station.trains.limit = newCapacity;
      game.event(
        `Station ${station.name} capacity increased to ${newCapacity} platforms`,
      );
    }
  }

  // Passenger spawning: spawn one passenger per tick (simple implementation)
  if (game.stations.size >= 2) { // Need at least 2 stations for passengers
    const result = createPassenger(game);
    if (result instanceof Passenger) {
      game.event(
        `Passenger spawned from ${result.origin.name} to ${result.destination.name}`,
      );
    }
  }
};

/** Calculate platform capacity based on activity */
function calculateCapacity(activity: number): number {
  if (activity >= 500) return 4;
  if (activity >= 250) return 3;
  if (activity >= 100) return 2;
  return 1;
}
