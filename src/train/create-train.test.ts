import { assertInstanceOf } from "@std/assert";

import { createTrain } from "./mod.ts";
import { createTrack } from "../track/mod.ts";
import { Simulation } from "../simulation/mod.ts";
import type { Station } from "../station/mod.ts";
import type { TrainType } from "./train-type.ts";
import { Train } from "./mod.ts";
import type { Track } from "../track/mod.ts";
import { createStation } from "../station/mod.ts";

const type: TrainType = {
  name: "Ride",
  minimum: 0,
  maximum: 1,
  speed: 1,
  wear: 1,
  cost: 1,
};

Deno.test("Create train at station", () => {
  const game = new Simulation();
  createStation(game);
  createStation(game);
  const station: Station = [...game.stations][0];
  const result = createTrain(game, type, station);
  assertInstanceOf(result, Train);
});

Deno.test("Create train on track", () => {
  const game = new Simulation();
  createStation(game);
  createStation(game);
  const [a, b] = [...game.stations];
  const track = createTrack(game, a, b) as Track;
  const train: Train | Error = createTrain(game, type, track);
  assertInstanceOf(train, Train);
});
