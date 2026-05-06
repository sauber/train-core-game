import type { Simulation } from "../simulation/simulation.ts";

export function renderInventory(game: Simulation): string {
  return `Tick ${game.tick} - Balance: ${game.balance}`;
}
