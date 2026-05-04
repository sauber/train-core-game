import { createStation } from "../factory/create-station.ts";
import type { Agent, Balance, Simulation } from "../play/simulation.ts";
import type { Station } from "../state/station.ts";

export const areaAgent: Agent = (game: Simulation): void => {
  // Create stations at capital levels

  // Number of stations in game
  const current_station_count = game.stations.size;

  // Number of stations required
  let stations_required = 0;
  game.stationLevels.forEach((balance: Balance, index) => {
    if (game.balance >= balance) stations_required = index + 1;
  });

  // Spawn missing stations
  for (let i = current_station_count; i < stations_required; i++) {
    const station: Station = createStation(game);
    game.event(`${station.name} station built`);
    // Only one station per tick
    return;
  }
};
