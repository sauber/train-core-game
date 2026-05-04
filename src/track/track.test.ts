import { assert, assertEquals } from "@std/assert";
import { Station } from "../station/station.ts";
import { Track } from "./track.ts";

Deno.test("Create track", () => {
  const a = new Station("A", { x: 0, y: 0 }, 1);
  const b = new Station("B", { x: 0, y: 0 }, 1);
  const track = new Track(a, b);
  assert(track.stations.has(a), "Station A has track");
  assert(track.stations.has(b), "Station B has track");
  assert(!a.tracks.has(track));
  assert(!b.tracks.has(track));
  assertEquals(track.distance, 0);
  assertEquals(track.otherStation(a), b);
  assertEquals(track.otherStation(b), a);
});
