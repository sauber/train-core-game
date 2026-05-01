import { Station } from "./station.ts";
import { Track } from "./track.ts";
import { assertEquals } from "@std/assert";

Deno.test("Init track", () => {
  const A = new Station("A");
  const B = new Station("B");
  const track = new Track([A, B]);
  assertEquals(track.stations, [A, B]);
});
