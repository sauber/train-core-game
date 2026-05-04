import { Area } from "../state/area.ts";
import type { TrainTypes } from "../state/train-type.ts";
import type { Station, Stations } from "../state/station.ts";
import type { Train, Trains } from "../state/train.ts";
import type { Track, Tracks } from "../track/track.ts";

/** Amount of capital available */
export type Balance = number;

/** Number of steps since start */
export type Tick = number;

/** Entry in journal  */
export type JournalEntry = {
  tick: Tick;
  message: string;
};
export type Journal = Array<JournalEntry>;

/** Default train types */
const DEFAULT_TRAIN_TYPES: TrainTypes = new Set([
  {
    name: "Local",
    speed: 0.2,
    wear: 0.1,
    cost: 20,
    minimum: 1,
    maximum: 4,
  },
]);

/** All the objects in a game */
export class Simulation {
  /** Capital available */
  public balance: Balance = 1000;

  /** Area of the map */
  public readonly area: Area = new Area(100, 100, 10, 5);

  /** Stations */
  public readonly stations: Stations = new Set<Station>();

  /** Tracks */
  public readonly tracks: Tracks = new Set<Track>();

  /** Trains */
  public readonly trains: Trains = new Set<Train>();

  /** Train types */
  public readonly trainTypes: TrainTypes = DEFAULT_TRAIN_TYPES;

  /** Is game finished */
  public gameover: boolean = false;

  /** Current tick of game */
  public tick: Tick = 0;

  /** Journal of events */
  public journal: Journal = new Array<JournalEntry>();

  constructor(state: Partial<Simulation> = {}) {
    Object.assign(this, state);
  }

  /** Add an event to the journal */
  event(message: string) {
    this.journal.push({ tick: this.tick, message });
  }
}
