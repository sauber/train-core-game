import {
  type Agents,
  type Balance,
  Doors,
  type iArea,
  type iFleet,
  type iIsland,
  type iNetwork,
  type iPassenger,
  type iPopulation,
  type iRoute,
  type iSimulation,
  type iStation,
  type iTrack,
  type iTrain,
  type Journal,
  type JournalEntry,
  type Location,
  type Tick,
  type TrainLocation,
  type TrainType,
} from "../types.ts";
import { createArea, distance } from "../area/mod.ts";
import { createNetwork } from "../network/mod.ts";
import { createFleet } from "../fleet/mod.ts";
import { createPopulation } from "../population/mod.ts";
import { createStation } from "../station/mod.ts";
import { createTrack } from "../track/mod.ts";
import { createPassenger } from "../passenger/mod.ts";

/** Default train types */
const DEFAULT_TRAIN_TYPES = new Set<TrainType>([
  {
    name: "Local",
    speed: 20,
    cost: 200,
    size: 1,
    quality: 1,
  },
]);

/** How many stations should minimum exist at each capital level  */
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

/** How many transits until next platform is unlock */
const DEFAULT_PLATFORM_LEVELS: Array<number> = [0, 10, 250, 500];

// Execute callback at regular interval while condition is tru
function every(
  ms: number,
  condition: () => boolean,
  callback: () => void,
): Promise<void> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (condition()) {
        callback();
      } else {
        clearInterval(interval);
        resolve();
      }
    }, ms);
  });
}

/** All the objects in a game */
export class Simulation implements iSimulation {
  /** Capital available */
  public readonly initialBalance: Balance;
  public balance: Balance = 1000;

  /** Area of the map */
  public readonly area: iArea = createArea();

  /** Stations */
  // public readonly stations: Stations = new Set<Station>();

  /** Tracks */
  public readonly network: iNetwork = createNetwork();

  /** Trains */
  public readonly fleet: iFleet = createFleet();

  /** Train types */
  public readonly trainTypes = DEFAULT_TRAIN_TYPES;

  /** Capital leves where new stations are spawned */
  public readonly stationLevels: Array<Balance> = DEFAULT_STATION_LEVES;

  /** Transit leves for platform expansion */
  public readonly platformLevels: number[] = DEFAULT_PLATFORM_LEVELS;

  /** Passengers */
  public readonly population: iPopulation = createPopulation();

  /** Has the simulation terminated early because it is stuck */
  public terminated: boolean = false;

  /** Current tick of game */
  public tick: Tick = 0;

  /** Journal of events */
  public journal: Journal = new Array<JournalEntry>();

  /** Cost of track per distance unit */
  public readonly trackCost: number = 1;

  /** Cost of travel per distance unit */
  public readonly travelCost: number = 0.01;

  constructor(state: Partial<Simulation> = {}) {
    Object.assign(this, state);
    this.initialBalance = this.balance;
  }

  /** Add an event to the journal */
  event(message: string, transaction?: number) {
    if (transaction !== undefined) {
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

  /** Run the simulation until end
   * Run each step every ms
   */
  public async run(
    agents: Agents,
    maxSteps: number,
    ms: number,
  ): Promise<void> {
    await every(
      ms,
      () => !this.terminated && this.tick < maxSteps,
      () => this.step(agents),
    );
  }

  /** Add station to area at location */
  public createStation(): iStation {
    const loc: Location = this.area.findLocation();
    const st: iStation = createStation(loc);
    const res = this.area.addStation(st);
    if (res) this.event(`${st.name} station created`);
    return st;
  }

  /** Add track between two stations */
  public createTrack(a: iStation, b: iStation): iTrack {
    // Confirm stations are different
    if (a == b) throw new Error("Origin and destination stations are the same");

    // Confirm no existing track already
    for (const track of this.network.tracks) {
      if (track.stations.has(a) && track.stations.has(b)) {
        throw new Error("Track already exists");
      }
    }

    // Confirm balance available for cost
    const cost = distance(a.location, b.location) * this.trackCost;
    if (this.balance < cost) throw new Error("Not enough balance");

    // Create track
    const track = createTrack(a, b);

    // Add track to both stations
    a.addTrack(track);
    b.addTrack(track);

    // Add track to network
    this.network.addTrack(track);

    // Create event
    this.event(`Track ${a.name} to ${b.name} created`, -cost);

    return track;
  }

  /** Remove track not in use between two stations */
  public deleteTrack(track: iTrack): boolean {
    if (track.isFull) throw new Error("Track is in use");
    for (const station of track.stations) station.delTrack(track);
    this.network.delTrack(track);
    return true;
  }

  /** Create passenger */
  public createPassenger(
    origin: iStation,
    destination: iStation,
    route: iRoute,
  ): iPassenger {
    const passenger = createPassenger(origin, destination, route);
    origin.addPassenger(passenger);
    this.population.addPassenger(passenger);
    return passenger;
  }

  /** Delete passenger */
  public exitPassenger(passenger: iPassenger): boolean {
    // Confirm passenger is on a station
    if (!("name" in passenger.location)) {
      throw new Error("Passenger not on a station");
    }

    // Add travel fare to revenue
    const location: iStation = passenger.location;
    const island: iIsland = this.network.islandByStation(location);
    const route: iRoute = island.shortestPath(passenger.origin, location);
    const fare: number = route.distance * this.travelCost;

    // Delete passenger
    location.delPassenger(passenger);
    this.population.delPassenger(passenger);

    // Log event
    this.event(`${location.name} exit`, fare);
    return true;
  }

  /** Move passenger to train */
  public boardPassenger(
    passenger: iPassenger,
    target: iTrain,
  ): boolean {
    // Confirm train is at same station
    if (passenger.location != target.location) {
      throw new Error("Passenger not at same station");
    }

    // Confirm train has open doors
    if (target.doors != Doors.Open) {
      throw new Error("Train doors not open for boarding");
    }

    // Confirm train has capacity
    if (target.isFull) throw new Error("Train is full");

    // Move passenger from station to train
    const station: iStation = passenger.location;
    station.delPassenger(passenger);
    target.addPassenger(passenger);

    // Set location of passenger
    passenger.board(target);

    return true;
  }

  /** Move passenger from train */
  public disembarkPassenger(
    passenger: iPassenger,
  ): boolean {
    // Confirm passenger is on a train
    if ("name" in passenger.location) {
      throw new Error("Passenger not on a train");
    }

    // Confirm train has Open or Exit door status
    const train: iTrain = passenger.location;
    if (train.doors == Doors.Closed) throw new Error("Train doors closed");

    // Move passenger from train to station
    train.delPassenger(passenger);
    const station = train.location as iStation;
    station.addPassenger(passenger);

    // Set location of passenger
    passenger.disembark(station);

    return true;
  }

  public createTrain(_type: TrainType, _location: iStation): iTrain {
    // Confirm station has capacity
    // Confirm funds
    // Create train
    // Place station at train
    throw new Error("Method not implemented.");
  }

  public moveTrain(_train: iTrain, _target: TrainLocation): boolean {
    // Increase distance from previuos station
    throw new Error("Method not implemented.");
  }
}
