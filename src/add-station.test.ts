import { assertEquals } from "@std/assert/equals";
import { addStation } from "./add-station.ts";
import { init } from "./init.ts";

Deno.test("Add station", () => {
  const state = init();
  const station_count = state.stations.size;

  addStation(state);

  assertEquals(state.stations.size, station_count + 1);
});
