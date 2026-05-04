import { assertInstanceOf } from "@std/assert";

import { createTrain } from "./create-train.ts";
import { createTrack } from "../track/create-track.ts";
import { Simulation } from "../play/simulation.ts";
import type { Station } from "../state/station.ts";
import type { TrainType } from "../state/train-type.ts";
import { Train } from "../state/train.ts";
import type { Track } from "../track/track.ts";
import { createStation } from "./create-station.ts";

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
