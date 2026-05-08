import { Lifecycle } from "./lifecycle.ts";
import type { Simulation } from "../simulation/mod.ts";
import { Track } from "../track/mod.ts";
import type { Station } from "../station/mod.ts";

class NetworkLifecycle extends Lifecycle<Track> {
  constructor(game: Simulation) {
    super(game);
  }

  spawn(station1: Station, station2: Station): Track {
    // Validate stations are different
    if (station1 === station2) {
      throw new Error("Track must connect two different stations");
    }

    // Create track
    const track = new Track(station1, station2);
    
    // Add track to simulation with lifecycle logging
    const cost = this.calculateCreationCost(track);
    this.game.event(
      `Created track between ${station1.name} and ${station2.name}`,
      -cost,
    );

    return track;
  }

  destroy(track: Track): void {
    // Validate no trains on track
    if (track.trains.size > 0) {
      throw new Error("Cannot remove track with active trains");
    }

    // Remove track from both stations
    const stationsArray = Array.from(track.stations);
    for (const station of stationsArray) {
      station.removeTrack(track);
    }

    // Log destruction and update balance
    const revenue = this.calculateDestructionRevenue(track);
    this.game.event(
      `Removed track between ${stationsArray[0].name} and ${stationsArray[1].name}`,
      revenue,
    );
  }

  repair(track: Track): void {
    // Calculate repair cost
    const cost = this.calculateRepairCost(track);
    
    // Log repair and update balance
    this.game.event(
      `Repaired track between ${Array.from(track.stations)[0].name} and ${Array.from(track.stations)[1].name}`,
      -cost,
    );

    // Reset degradation
    track.degraded = 0;
  }

  private calculateCreationCost(track: Track): number {
    // Cost based on track distance
    return track.distance * 50;
  }

  private calculateDestructionRevenue(track: Track): number {
    // Revenue based on track value
    return track.distance * 25;
  }

  private calculateRepairCost(track: Track): number {
    // Repair cost based on degradation and distance
    return track.distance * 25 * track.degraded;
  }
}

// Export class for instantiation by agents
export { NetworkLifecycle };
