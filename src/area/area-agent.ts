import type { Agent, Simulation } from "../simulation/mod.ts";
import { createStationName } from "./create-station-name.ts";
import type { Station } from "../station/mod.ts";

/** Spawn stations at defined capital levels */
export const areaAgent: Agent = (game: Simulation): void => {
  // Number of stations in game
  const current_station_count = game.stations.size;

  // Number of stations required
  let stations_required = 0;
  game.stationLevels.forEach((balance: number, index: number) => {
    if (game.balance >= balance) stations_required = index + 1;
  });

  // Spawn missing stations
  for (let i = current_station_count; i < stations_required; i++) {
    // Create station directly without lifecycle abstraction
    const name: string = createStationName();
    const station: Station = game.area.createStation(name, 1);

    // Log event with cost (cost is 0 for station creation)
    const cost = 0;
    game.event(
      `Created station ${name} at ${station.location.x},${station.location.y}`,
      cost,
    );

    // Max one station per tick
    return;
  }
};
