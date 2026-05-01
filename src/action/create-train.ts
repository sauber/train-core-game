import type { Station } from "../entity/station.ts";
import type { Track } from "../entity/track.ts";
import type { TrainType } from "../entity/train-type.ts";
import { Train } from "../entity/train.ts";
import type { State } from "../entity/state.ts";

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
