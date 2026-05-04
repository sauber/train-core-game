import { assertInstanceOf } from "@std/assert";
import { createTrack } from "./create-track.ts";
import { Simulation } from "../play/simulation.ts";
import type { Station } from "../state/station.ts";
import { Track } from "../state/track.ts";
import { createStation } from "./create-station.ts";

Deno.test("Create track", () => {
  // Pick any two stations
  const game = new Simulation();
  createStation(game);
  createStation(game);
  const stations: Station[] = Array.from(game.stations);
  const [a, b] = stations;

  // Create a track
  const track = createTrack(game, a, b);
  assertInstanceOf(track, Track);

  // Create track again
  const track2 = createTrack(game, a, b);
  assertInstanceOf(track2, Error);

  // Create track in reverse order
  const track3 = createTrack(game, b, a);
  assertInstanceOf(track3, Error);
});
