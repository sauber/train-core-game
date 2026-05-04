import { Area } from "../state/area.ts";
import type { TrainTypes } from "../state/train-type.ts";
import type { Stations } from "../state/station.ts";
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
  transaction?: number;
  balance?: Balance;
};
export type Journal = Array<JournalEntry>;

/** Default train types */
const DEFAULT_TRAIN_TYPES: TrainTypes = new Set([
  {
    name: "Local",
    speed: 0.2,
    wear: 0.1,
    cost: 200,
    minimum: 1,
    maximum: 4,
  },
]);

/** How many stations should minimum exist at each capital level  */
export type StationLevel = {
  capital: number;
  stations: number;
};
const DEFAULT_STATION_LEVES: Array<Balance> = [
  0,
  0,
  0,
  0,
  6000,
  10000,
  20000,
  30000,
  40000,
  60000,
  80000,
  100000,
];

/** Agents for controlling game */
export type Agent = (game: Simulation) => void;
export type Agents = Array<Agent>;

/** All the objects in a game */
export class Simulation {
  /** Capital available */
  public readonly initalBalance: Balance;
  public balance: Balance = 1000;

  /** Area of the map */
  public readonly area: Area = new Area(100, 100, 10, 5);

  /** Stations */
  // public readonly stations: Stations = new Set<Station>();

  /** Tracks */
  public readonly tracks: Tracks = new Set<Track>();

  /** Trains */
  public readonly trains: Trains = new Set<Train>();

  /** Train types */
  public readonly trainTypes: TrainTypes = DEFAULT_TRAIN_TYPES;

  /** Capital leves where new stations are spawned */
  public readonly stationLevels: Array<Balance> = DEFAULT_STATION_LEVES;

  /** Is game finished */
  public gameover: boolean = false;

  /** Current tick of game */
  public tick: Tick = 0;

  /** Journal of events */
  public journal: Journal = new Array<JournalEntry>();

  constructor(state: Partial<Simulation> = {}) {
    Object.assign(this, state);
    this.initalBalance = this.balance;
  }

  /** Add an event to the journal */
  event(message: string, transaction?: number) {
    if (transaction) {
      // const calc = `${this.balance}${
      //   transaction < 0 ? transaction : "+" + transaction
      // } = ${this.balance + transaction}`;

      // console.log("Transaction:", message, calc);
      if (this.balance + transaction < 0) {
        throw new Error(
          `Error: Negative balance ${this.balance + transaction}`,
        );
      }
      this.balance += transaction;
      this.journal.push({
        tick: this.tick,
        message,
        transaction,
        balance: this.balance,
      });
    } else {
      this.journal.push({ tick: this.tick, message });
    }
  }

  /** Run one step in simulation */
  public step(agents: Agents): void {
    this.tick++;
    agents.forEach((agent) => agent(this));
  }

  /** Run the simulation until end */
  public run(agents: Agents, maxSteps: number): void {
    while (!this.gameover && this.tick < maxSteps) {
      this.step(agents);
    }
  }

  /** Stations in game */
  public get stations(): Stations {
    return this.area.stations;
  }
}
