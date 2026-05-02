import { assertInstanceOf } from "@std/assert";
import { Passenger } from "../entity/passenger.ts";
import { Station } from "../entity/station.ts";
import { createPassenger } from "./create-passenger.ts";
import { Track } from "../entity/track.ts";

Deno.test("Cannot create passenger at unconnected station", () => {
  const a = new Station("A", { x: 0, y: 0 }, 1);
  const p: Passenger | Error = createPassenger(a);
  assertInstanceOf(p, Error);
});

Deno.test("Create passenger", () => {
  const a = new Station("A", { x: 0, y: 0 }, 1);
  const b = new Station("B", { x: 0, y: 0 }, 1);
  const _t = new Track(a, b);
  const p: Passenger | Error = createPassenger(a);
  assertInstanceOf(p, Passenger);
});
