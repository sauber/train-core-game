import { assertEquals } from "@std/assert";
import { Simulation } from "../simulation/mod.ts";
import { unConnectedStations } from "./list-unconnected-stations.ts";
import { createTrack } from "../track/mod.ts";
import { createStation } from "../station/mod.ts";

Deno.test("Unconnected Stations", () => {
  const game = new Simulation();
  createStation(game);

  // No connected yet
  let unconnected = unConnectedStations(game);
  assertEquals(game.stations.size, unconnected.size);

  // Two stations connected
  createStation(game);
  const [a, b] = [...game.stations];
  createTrack(game, a, b);
  unconnected = unConnectedStations(game);
  assertEquals(game.stations.size - 2, unconnected.size);
});
