import { assert } from "node:console";
import { Station } from "./station.ts";
import { Track } from "./track.ts";
import { assertEquals } from "@std/assert";

Deno.test("Create track", () => {
  const a = new Station("A", { x: 0, y: 0 }, 1);
  const b = new Station("B", { x: 0, y: 0 }, 1);
  const track = new Track(a, b);
  assert(track.stations.has(a));
  assert(track.stations.has(b));
  assert(a.tracks.has(track));
  assert(b.tracks.has(track));
  assertEquals(track.train, undefined);
  assertEquals(track.distance, 0);
  assertEquals(track.otherStation(a), b);
  assertEquals(track.otherStation(b), a);
});
