import { assertEquals } from "@std/assert/equals";
import { createStation } from "../station/create-station.ts";
import { Simulation } from "../play/simulation.ts";

Deno.test("Create station", () => {
  const game = new Simulation();
  const station_count = game.stations.size;

  createStation(game);

  assertEquals(game.stations.size, station_count + 1);
});
