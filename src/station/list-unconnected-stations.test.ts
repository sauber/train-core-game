import { assertEquals } from "@std/assert";
import { Simulation } from "../play/simulation.ts";
import { unConnectedStations } from "./list-unconnected-stations.ts";
import { createTrack } from "../track/create-track.ts";
import { createStation } from "./create-station.ts";

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
