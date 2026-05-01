import { assertEquals } from "@std/assert";
import { Passenger } from "./passenger.ts";
import { Station } from "./station.ts";

Deno.test("Init Passenger", () => {
  const A = new Station("A", 1);
  const B = new Station("B", 1);
  const passenger = new Passenger(A, B);
  assertEquals(passenger.origin, A);
  assertEquals(passenger.destination, B);
  assertEquals(passenger.location, A);
});
