import { assertEquals } from "@std/assert";
import { createGame } from "../play/create-game.ts";
import type { Game } from "../play/game.ts";
import { unConnectedStations } from "./list-unconnected-stations.ts";
import { createTrack } from "../factory/create-track.ts";

Deno.test("Unconnected Stations", () => {
  const game: Game = createGame();

  // No connected yet
  let unconnected = unConnectedStations(game);
  assertEquals(game.stations.size, unconnected.size);

  // Two stations connected
  const [a, b] = [...game.stations];
  createTrack(game, a, b);
  unconnected = unConnectedStations(game);
  assertEquals(game.stations.size - 2, unconnected.size);
});
