import { TrainType } from "./train-type.ts";
import { Track } from "./track.ts";
import { Passenger } from "./passenger.ts";

export class Train {
  public readonly passengers: Passenger[] = [];

  constructor(
    public readonly type: TrainType,
    public track: Track,
  ) {}
}
