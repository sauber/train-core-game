import { assertEquals, assertNotEquals } from "@std/assert";
import { findNearestStation } from "./find-nearest-station.ts";
import type { Station } from "../state/station.ts";
import { Simulation } from "../play/simulation.ts";
import { createStation } from "../factory/create-station.ts";

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
