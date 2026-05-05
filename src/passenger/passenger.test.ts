import { assertInstanceOf } from "@std/assert";
import type { Station } from "../station/mod.ts";
import { Passenger } from "./passenger.ts";

Deno.test("Passenger Instance", () => {
  const origin = { name: "A" } as Station;
  const destination = { name: "B" } as Station;

  const passenger = new Passenger(origin, destination);
  assertInstanceOf(passenger, Passenger);
});
