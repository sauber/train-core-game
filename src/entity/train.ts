import type { TrainType } from "./train-type.ts";
import type { Passenger } from "./passenger.ts";

export class Train {
  public readonly passengers: Passenger[] = [];

  constructor(
    public readonly type: TrainType,
  ) {}
}
