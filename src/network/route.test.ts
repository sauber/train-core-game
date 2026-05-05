import { assertEquals } from "@std/assert";
import { Route } from "../network/route.ts";
import { Station } from "../station/station.ts";
import { Track } from "./track.ts";

Deno.test("Route distance", () => {
  const a = new Station("A", { x: 0, y: 0 }, 1);
  const b = new Station("B", { x: 1, y: 0 }, 1);
  const c = new Station("C", { x: 2, y: 0 }, 1);
  const t = new Track(a, b);
  const u = new Track(b, c);
  const route = new Route([t, u]);
  assertEquals(route.distance(), 2);
});
