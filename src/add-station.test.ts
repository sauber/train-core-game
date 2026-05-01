import { assertEquals } from "@std/assert/equals";
import { addStation } from "./add-station.ts";
import { init } from "./init.ts";
import { assert } from "node:console";

Deno.test("Add station", () => {
  const state = init();
  const names_count = state.stationNames.length;
  const station_count = state.stations.size;

  addStation(state);

  assertEquals(
    state.stationNames.length,
    names_count - 1,
    "Available station names decreased",
  );
  assertEquals(
    state.stations.size,
    station_count + 1,
    "Stations on map increased",
  );

  // Confirm no overlap in names used and names available
  for (const name of state.stationNames) {
    let free = true;
    for (const station of state.stations) {
      if (station.name === name) {
        free = false;
        break;
      }
    }
    assert(free, `Station ${name} available is also in use`);
  }
  for (const station of state.stations) {
    let free = true;
    for (const name of state.stationNames) {
      if (station.name === name) {
        free = false;
        break;
      }
    }
    assert(free, `Station ${station.name} in use is also available`);
  }
});
