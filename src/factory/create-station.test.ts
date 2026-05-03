import { assertEquals } from "@std/assert/equals";
import { createStation } from "./create-station.ts";
import { createGame } from "../play/create-game.ts";

Deno.test("Create station", () => {
  const state = createGame();
  const station_count = state.stations.size;

  createStation(state);

  assertEquals(state.stations.size, station_count + 1);
});
