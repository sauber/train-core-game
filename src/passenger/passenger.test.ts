import { assertInstanceOf } from "@std/assert";
import { Passenger } from "./passenger.ts";
import type { iRoute, iStation } from "../types.ts";

Deno.test("Passenger Instance", () => {
  const origin = { name: "A" } as iStation;
  const destination = { name: "B" } as iStation;
  const route = {} as iRoute;

  const passenger = new Passenger(origin, destination, route);
  assertInstanceOf(passenger, Passenger);
});
