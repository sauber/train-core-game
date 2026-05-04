import type { TrainType } from "./train-type.ts";
import type { Passenger } from "../passenger/passenger.ts";

export type Trains = Set<Train>;

export class Train {
  public readonly passengers: Passenger[] = [];

  constructor(
    public readonly type: TrainType,
  ) {}
}
