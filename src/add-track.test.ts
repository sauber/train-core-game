import { assertInstanceOf } from "@std/assert";
import { addTrack } from "./add-track.ts";
import { init } from "./init.ts";
import type { State } from "./state.ts";
import type { Station } from "./station.ts";
import { Track } from "./track.ts";

Deno.test("Add track", () => {
  const state: State = init();
  const stations: Station[] = Array.from(state.stations);
  const [a, b] = stations;

  // Add a track
  const track = addTrack(state, a, b);
  assertInstanceOf(track, Track);

  // Add track again
  const track2 = addTrack(state, a, b);
  assertInstanceOf(track2, Error);

  // Add track in reverse order
  const track3 = addTrack(state, b, a);
  assertInstanceOf(track3, Error);
});
