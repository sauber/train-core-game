import type { Station } from "../station/mod.ts";
import type { Track } from "../track/mod.ts";
import type { TrainType } from "./train-type.ts";
import { Train } from "./mod.ts";
import type { Simulation } from "../simulation/mod.ts";

/** Insert a new train at a station or on a track */
export function createTrain(
  game: Simulation,
  type: TrainType,
  target: Station | Track,
): Train | Error {
  const train = new Train(type);
  if (!target.trains.add(train)) return new Error("Could not add train");
  game.trains.add(train);
  return train;
}
