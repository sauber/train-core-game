import type { Station } from "../state/station.ts";
import type { Track } from "../state/track.ts";
import type { TrainType } from "../state/train-type.ts";
import { Train } from "../state/train.ts";
import type { Simulation } from "../play/simulation.ts";

/** Insert a new train at a station or on a track */
export function createTrain(
  state: Simulation,
  type: TrainType,
  target: Station | Track,
): Train | Error {
  const train = new Train(type);
  if (!target.addTrain(train)) return new Error("Could not add train");
  state.trains.add(train);
  return train;
}
