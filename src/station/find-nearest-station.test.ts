import { assertEquals, assertNotEquals } from "@std/assert";
import { findNearestStation } from "../station/mod.ts";
import type { Station } from "../station/mod.ts";
import { Simulation } from "../simulation/mod.ts";
import { createStation } from "../station/mod.ts";

Deno.test("Find Nearest Station", () => {
  const game = new Simulation();
  createStation(game);
  const [station] = [...game.stations];
  const same: Station = findNearestStation(game, station);
  assertEquals(same, station);

  createStation(game);
  const other: Station = findNearestStation(game, station);
  assertNotEquals(other, station);
});
