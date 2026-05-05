import { assertEquals } from "@std/assert";
import { insertTrains } from "./insert-trains.ts";
import { Simulation } from "../play/simulation.ts";
import { createStation } from "../station/create-station.ts";
import { createTrack } from "../track/create-track.ts";

Deno.test("No stations", () => {
  const game = new Simulation();
  const result = insertTrains(game);
  assertEquals(result, false);
  assertEquals(game.trains.size, 0);
});

Deno.test("No network", () => {
  const game = new Simulation();
  createStation(game);
  createStation(game);
  const result = insertTrains(game);
  assertEquals(result, false);
  assertEquals(game.trains.size, 0);
});

Deno.test("Insert in network", () => {
  const game = new Simulation();
  const a = createStation(game);
  const b = createStation(game);
  createTrack(game, a, b);
  const result = insertTrains(game);
  assertEquals(result, true);
  assertEquals(game.trains.size, 1);
});
