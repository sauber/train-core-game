import { Lifecycle } from "./lifecycle.ts";
import type { Simulation } from "../simulation/mod.ts";
import type { Station } from "../station/mod.ts";

class AreaLifecycle extends Lifecycle<Station> {
  constructor(game: Simulation) {
    super(game);
  }

  spawn(name: string, platforms: number): Station {
    // Get empty location
    const location = this.game.area.getEmptyLocation();

    // Create station
    const station = this.game.area.createStationAt(name, location, platforms);

    // Log event with cost (event() handles balance adjustment)
    const cost = this.calculateCreationCost(station);
    this.game.event(
      `Created station ${name} at ${location.x},${location.y}`,
      -cost,
    );

    return station;
  }

  destroy(station: Station): void {
    // Remove station and handle track connections
    for (const track of station.tracks) {
      track.remove(this.game);
    }

    // Log destruction and update balance (event() handles balance adjustment)
    const revenue = this.calculateDestructionRevenue(station);
    this.game.event(`Removed station ${station.name}`, revenue);

    // Do not remove from area
    // this.game.area.stations.delete(station);
  }

  private calculateCreationCost(station: Station): number {
    // Cost based on station size/platforms
    return station.platforms * 100;
  }

  private calculateDestructionRevenue(station: Station): number {
    // Revenue based on station value
    return station.platforms * 50;
  }
}
export { AreaLifecycle };
