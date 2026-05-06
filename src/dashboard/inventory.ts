import type { Simulation } from "../simulation/mod.ts";

export function renderInventory(game: Simulation): string {
  return [
    "Tick:",
    game.tick,
    "Balance:",
    game.balance,
    "Passengers:",
    game.passengers.size,
    "Trains:",
    game.trains.size,
    "Stations:",
    game.stations.size,
    "Tracks:",
    game.tracks.size,
  ].join(" ");
}
