import type { Station } from "./station.ts";
import type { Track } from "./track.ts";
import type { TrainType } from "./train-type.ts";
import { Train } from "./train.ts";
import type { State } from "./state.ts";

/** Insert a new train at a station or on a track */
export function createTrain(
  state: State,
  type: TrainType,
  target: Station | Track,
): Train | Error {
  const train = new Train(type);
  if (!target.addTrain(train)) return new Error("Could not add train");
  state.trains.add(train);
  return train;
}
