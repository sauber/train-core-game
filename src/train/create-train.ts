import type { iTrain, TrainLocation, TrainType } from "../types.ts";
import { Train } from "./train.ts";

/** Insert a new train at a station or on a track */
export function createTrain(
  type: TrainType,
  target: TrainLocation,
): iTrain {
  const train: iTrain = new Train(type, target);
  if (target.isFull) throw new Error("Could not add train");
  if (!target.addTrain(train)) throw new Error("Could not add train");
  return train;
}
