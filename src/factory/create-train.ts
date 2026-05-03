import type { Station } from "../state/station.ts";
import type { Track } from "../state/track.ts";
import type { TrainType } from "../state/train-type.ts";
import { Train } from "../state/train.ts";
import type { Game } from "../play/game.ts";

/** Insert a new train at a station or on a track */
export function createTrain(
  state: Game,
  type: TrainType,
  target: Station | Track,
): Train | Error {
  const train = new Train(type);
  if (!target.addTrain(train)) return new Error("Could not add train");
  state.trains.add(train);
  return train;
}
