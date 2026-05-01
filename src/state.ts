import type { Account } from "./account.ts";
import type { Area } from "./area.ts";
import type { TrainType } from "./train-type.ts";
import type { Station } from "./station.ts";
import type { Train } from "./train.ts";
import type { Track } from "./track.ts";

/** All the objects in a game */
export type State = {
  /** The player */
  account: Account;

  /** Area of the map */
  area: Area;

  /** Stations */
  stations: Set<Station>;

  /** Tracks */
  tracks: Set<Track>;

  /** Trains */
  trains: Set<Train>;

  /** Train types */
  trainTypes: Set<TrainType>;

  /** Is game finished */
  gameover: boolean;
};
