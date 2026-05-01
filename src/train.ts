import type { TrainType } from "./train-type.ts";
import type { Track } from "./track.ts";
import type { Passenger } from "./passenger.ts";

export class Train {
  public readonly passengers: Passenger[] = [];

  constructor(
    public readonly type: TrainType,
    public track: Track,
  ) {}
}
