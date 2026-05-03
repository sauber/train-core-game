import { assertInstanceOf } from "@std/assert";
import { createTrack } from "./create-track.ts";
import { createGame } from "../play/create-game.ts";
import type { Game } from "../play/game.ts";
import type { Station } from "../state/station.ts";
import { Track } from "../state/track.ts";

Deno.test("Create track", () => {
  // Pick any two stations
  const state: Game = createGame();
  const stations: Station[] = Array.from(state.stations);
  const [a, b] = stations;

  // Create a track
  const track = createTrack(state, a, b);
  assertInstanceOf(track, Track);

  // Create track again
  const track2 = createTrack(state, a, b);
  assertInstanceOf(track2, Error);

  // Create track in reverse order
  const track3 = createTrack(state, b, a);
  assertInstanceOf(track3, Error);
});
