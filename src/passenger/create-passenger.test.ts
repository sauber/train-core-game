import { assert, assertInstanceOf } from "@std/assert";
import type { Passenger } from "./passenger.ts";
import { createPassenger } from "./create-passenger.ts";
import { Track } from "../track/track.ts";
import { Simulation } from "../play/simulation.ts";
import { createStation } from "../station/create-station.ts";
import type { Station } from "../station/station.ts";

Deno.test("No network", () => {
  const game = new Simulation();
  const p: Passenger | Error = createPassenger(game);
  assertInstanceOf(p, Error);
});

Deno.test("No connections", () => {
  const game = new Simulation();
  createStation(game);
  createStation(game);
  const p: Passenger | Error = createPassenger(game);
  assertInstanceOf(p, Error);
});

Deno.test("Connection", () => {
  const game = new Simulation();
  const a: Station = createStation(game);
  const b: Station = createStation(game);

  const t = new Track(a, b);
  a.addTrack(t);
  b.addTrack(t);

  const p: Passenger | Error = createPassenger(game);
  assert("origin" in p);
});
