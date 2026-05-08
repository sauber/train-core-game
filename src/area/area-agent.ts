import type { Agent, Simulation } from "../simulation/mod.ts";
import { AreaLifecycle } from "../lifecycle/area-lifecycle.ts";
import { createStationName } from "../station/create-station-name.ts";
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
    // Use AreaLifecycle to create station with proper logging and balance handling
    const lifecycle = new AreaLifecycle(game);
    const name = createStationName();
    const station: Station = lifecycle.spawn(name, 1);
    // Max one station per tick
    return;
  }
};
