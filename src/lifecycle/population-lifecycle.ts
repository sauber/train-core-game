import { Lifecycle } from "./lifecycle";
import type { Simulation } from "../simulation/mod.ts";
import type { Passenger } from "../passenger/mod.ts";
import type { Station } from "../station/mod.ts";

class PopulationLifecycle extends Lifecycle<Passenger> {
  constructor(game: Simulation) {
    super(game);
  }

  spawn(origin: Station, destination: Station): Passenger {
    // Create passenger with lifecycle logging
    const passenger = new Passenger(origin, destination);
    this.game.event(
      `Spawned passenger from ${origin.name} to ${destination.name}`,
    );

    // No cost to spawn passengers
    return passenger;
  }

  destroy(passenger: Passenger): void {
    // Log passenger completion
    this.game.event(`Passenger ${passenger.id} reached destination`);

    // Calculate and add fare revenue
    const fare = this.calculateFare(passenger.origin, passenger.destination);
    this.game.balance += fare;

    // Remove passenger from simulation
    this.game.passengers.delete(passenger);
  }

  private calculateFare(origin: Station, destination: Station): number {
    // Fare based on Euclidean distance
    const distance = Math.sqrt(
      (origin.location.x - destination.location.x) ** 2 +
        (origin.location.y - destination.location.y) ** 2,
    );

    // Base fare of 10 per distance unit
    return Math.max(10, distance * 10);
  }
}

export const populationLifecycle = new PopulationLifecycle(this.game);
