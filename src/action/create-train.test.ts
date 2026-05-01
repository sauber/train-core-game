import { assertInstanceOf } from "@std/assert";

import { createTrain } from "./create-train.ts";
import { createTrack } from "./create-track.ts";
import { init } from "./init-state.ts";
import type { State } from "../entity/state.ts";
import type { Station } from "../entity/station.ts";
import type { TrainType } from "../entity/train-type.ts";
import { Train } from "../entity/train.ts";
import type { Track } from "../entity/track.ts";

const type: TrainType = {
  name: "Ride",
  minimum: 0,
  maximum: 1,
  speed: 1,
  wear: 1,
  cost: 1,
};

Deno.test("Create train at station", () => {
  const game: State = init();
  const station: Station = [...game.stations][0];
  const result = createTrain(game, type, station);
  assertInstanceOf(result, Train);
});

Deno.test("Create train on track", () => {
  const game: State = init();
  const [a, b] = [...game.stations];
  const track = createTrack(game, a, b) as Track;
  const train: Train | Error = createTrain(game, type, track);
  assertInstanceOf(train, Train);
});
