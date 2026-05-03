import type { Area } from "../state/area.ts";
import type { TrainTypes } from "../state/train-type.ts";
import type { Stations } from "../state/station.ts";
import type { Trains } from "../state/train.ts";
import type { Tracks } from "../state/track.ts";

/** Number of steps since start */
export type Tick = number;

/** Entry in journal  */
export type JournalEntry = {
  tick: Tick;
  message: string;
};

/** Journal of entries */
export type Journal = Array<JournalEntry>;

/** Amount of capital available */
export type Balance = number;

/** All the objects in a game */
export type Game = {
  /** Capital available */
  balance: Balance;

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

  /** Journal of events */
  journal: Journal;
};
