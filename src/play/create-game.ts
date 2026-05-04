import { Simulation } from "./simulation.ts";
import { createStation } from "../factory/create-station.ts";

/** Create default start state */
export function createGame(): Simulation {
  const game: Simulation = new Simulation();

  // Add initial stations
  // for (let i = 0; i < 4; i++) createStation(game);

  return game;
}
