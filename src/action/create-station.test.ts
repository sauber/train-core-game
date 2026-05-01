import { assertEquals } from "@std/assert/equals";
import { createStation } from "./create-station.ts";
import { init } from "./init-state.ts";

Deno.test("Create station", () => {
  const state = init();
  const station_count = state.stations.size;

  createStation(state);

  assertEquals(state.stations.size, station_count + 1);
});
