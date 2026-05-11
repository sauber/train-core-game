import type { iSimulation } from "../types.ts";

export function renderInventory(game: iSimulation): string {
  return [
    "Tick:",
    game.tick,
    "Balance:",
    game.balance,
    "Passengers:",
    game.population.size,
    "Trains:",
    game.fleet.size,
    "Stations:",
    game.area.size,
    "Tracks:",
    game.network.size,
  ].join(" ");
}
