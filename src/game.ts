import type { TrainType } from "./train-type.ts";
import type { Train } from "./train.ts";

export class Game {
  private readonly types: TrainType[] = [
    {
      name: "Local",
      speed: 1,
      wear: 1,
      cost: 1,
      minimum: 1,
      maximum: 1,
    },
  ];
  private readonly trains: Train[] = [];
}
