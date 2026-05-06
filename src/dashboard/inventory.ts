import { Table } from "@cliffy/table";
import type { Simulation } from "../simulation/mod.ts";

export function renderInventory(game: Simulation): string {
  const table = new Table<[string, number, string, number, string, number]>()
    .align("right")
    .body([[
      "Tick:",
      game.tick,
      "Balance:",
      game.balance,
      "Passengers:",
      game.passengers.size,
    ], [
      "Trains:",
      game.trains.size,
      "Stations:",
      game.area.stations.size,
      "Tracks:",
      game.tracks.size,
    ]]);
  return table.toString();
}
