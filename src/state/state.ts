import type { Account } from "./account.ts";
import type { Area } from "./area.ts";
import type { TrainTypes } from "./train-type.ts";
import type { Stations } from "./station.ts";
import type { Trains } from "./train.ts";
import type { Tracks } from "./track.ts";

/** Number of steps since start */
export type Tick = number;

/** All the objects in a game */
export type State = {
  /** The player */
  account: Account;

  /** Area of the map */
  area: Area;

  /** Stations */
  stations: Stations;

  /** Tracks */
  tracks: Tracks;

  /** Trains */
  trains: Trains;

  /** Train types */
  trainTypes: TrainTypes;

  /** Is game finished */
  gameover: boolean;

  /** Current tick of game */
  tick: Tick;
};
