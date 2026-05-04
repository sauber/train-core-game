import { assertEquals, assertThrows } from "@std/assert";
import { Passenger } from "./passenger.ts";
import { Station } from "../station/station.ts";
import { Track } from "../track/track.ts";

Deno.test("Init Passenger", () => {
  const A = new Station("A", { x: 0, y: 0 }, 1);
  const B = new Station("B", { x: 0, y: 0 }, 1);
  const t = new Track(A, B);
  A.addTrack(t);
  B.addTrack(t);
  const passenger = new Passenger(A);
  assertEquals(passenger.origin, A);
  assertEquals(passenger.destination, B);
  assertEquals(passenger.location, A);
});

Deno.test("Invalid passenger", () => {
  const A = new Station("A", { x: 0, y: 0 }, 1);
  assertThrows(() => new Passenger(A));
});
