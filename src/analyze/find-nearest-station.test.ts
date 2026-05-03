import { assertNotEquals } from "@std/assert";
import { createGame } from "../play/create-game.ts";
import { findNearestStation } from "./find-nearest-station.ts";
import type { Station } from "../state/station.ts";

Deno.test("Find Nearest Station", () => {
  const game = createGame();
  const [station] = [...game.stations];
  const other: Station = findNearestStation(game, station);
  assertNotEquals(other, station);
});
