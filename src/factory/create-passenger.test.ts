import { assertInstanceOf } from "@std/assert";
import { Passenger } from "../state/passenger.ts";
import { Station } from "../state/station.ts";
import { createPassenger } from "../factory/create-passenger.ts";
import { Track } from "../track/track.ts";

Deno.test("Cannot create passenger at unconnected station", () => {
  const a = new Station("A", { x: 0, y: 0 }, 1);
  const p: Passenger | Error = createPassenger(a);
  assertInstanceOf(p, Error);
});

Deno.test("Create passenger", () => {
  const a = new Station("A", { x: 0, y: 0 }, 1);
  const b = new Station("B", { x: 0, y: 0 }, 1);
  const t = new Track(a, b);
  a.addTrack(t);
  b.addTrack(t);
  const p: Passenger | Error = createPassenger(a);
  assertInstanceOf(p, Passenger);
});
