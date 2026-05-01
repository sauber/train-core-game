import { assertInstanceOf } from "@std/assert";
import { createTrack } from "./create-track.ts";
import { init } from "./init-state.ts";
import type { State } from "../entity/state.ts";
import type { Station } from "../entity/station.ts";
import { Track } from "../entity/track.ts";

Deno.test("Create track", () => {
  const state: State = init();
  const stations: Station[] = Array.from(state.stations);
  const [a, b] = stations;

  // Add a track
  const track = createTrack(state, a, b);
  assertInstanceOf(track, Track);

  // Add track again
  const track2 = createTrack(state, a, b);
  assertInstanceOf(track2, Error);

  // Add track in reverse order
  const track3 = createTrack(state, b, a);
  assertInstanceOf(track3, Error);
});
