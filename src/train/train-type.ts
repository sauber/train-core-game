import type { Speed } from "../state/speed.ts";
import type { Cost } from "../state/cost.ts";
import type { WearRatio } from "../state/wear.ts";

export type TrainTypes = Set<TrainType>;

/** Properties of a train */
export type TrainType = {
  // Name of train type
  name: string;
  // Minimum number of passengers
  minimum: number;
  // Maximum number of passengers
  maximum: number;
  // Speed of the train
  speed: Speed;
  // Wear factor
  wear: WearRatio;
  // Cost of the train
  cost: Cost;
};
