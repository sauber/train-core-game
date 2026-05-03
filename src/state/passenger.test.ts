import { assertEquals, assertThrows } from "@std/assert";
import { Passenger } from "./passenger.ts";
import { Station } from "./station.ts";
import { Track } from "./track.ts";

Deno.test("Init Passenger", () => {
  const A = new Station("A", { x: 0, y: 0 }, 1);
  const B = new Station("B", { x: 0, y: 0 }, 1);
  const _t = new Track(A, B);
  const passenger = new Passenger(A);
  assertEquals(passenger.origin, A);
  assertEquals(passenger.destination, B);
  assertEquals(passenger.location, A);
});

Deno.test("Invalid passenger", () => {
  const A = new Station("A", { x: 0, y: 0 }, 1);
  assertThrows(() => new Passenger(A));
});
