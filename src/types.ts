/** Definitions of how all objects interface each other */

/** Simulation */
export interface iSimulation {
  /** Current balance */
  readonly balance: Balance;

  /** Area of stations */
  readonly area: iArea;

  /** Passengers */
  readonly population: iPopulation;

  /** Tracks connected to stations */
  readonly network: iNetwork;

  /** Inserted trained */
  readonly fleet: iFleet;

  /** Current tick in simulation */
  readonly tick: number;

  /** Balance levels where new stations are created */
  readonly stationLevels: Array<Balance>;

  /** Transit levels where new platforms are added */
  readonly platformLevels: Array<number>;

  /** Cost of track per distance unit */
  readonly trackCost: number;

  /** Cost of travel per distance Unit */
  readonly travelCost: number;

  /** Train types */
  readonly trainTypes: Set<TrainType>;

  /** List of events */
  readonly journal: Journal;

  /** Create Station */
  createStation(location: Location): iStation;

  /** Connect two stations with a track */
  createTrack(a: iStation, b: iStation): iTrack;

  /** Remove track between two stations */
  deleteTrack(track: iTrack): boolean;

  /** Create Passenger */
  createPassenger(
    origin: iStation,
    destination: iStation,
    route: iRoute,
  ): iPassenger;

  /** Let passenger exit from current station */
  exitPassenger(passenger: iPassenger): boolean;

  /** Move passenger from station to train */
  boardPassenger(passenger: iPassenger, target: iTrain): boolean;

  /** Move passenger from train to station */
  disembarkPassenger(passenger: iPassenger): boolean;

  /** Create Train */
  createTrain(type: TrainType, location: iStation): iTrain;

  /** Move train to linked location
   * TODO: Change to arriveTrain and departTrain
   */
  moveTrain(train: iTrain, target: TrainLocation): boolean;

  /** Increment simulation tick and run all agents */
  step(agents: Agents): void;

  /** Iterate steps until simulation terminates */
  run(agents: Agents, maxSteps: number, ms: number): Promise<void>;
}

/** Revenue minus expenses */
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

/** Callback from simulation step */
export type Agent = (sim: iSimulation) => void;

/** Sequence of agents */
export type Agents = Array<Agent>;

/** Placement in Area */
export type Location = {
  x: number;
  y: number;
};

/** A limited rectangular area with stations */
export interface iArea {
  /** Width of map */
  readonly width: Distance;

  /** Height of map */
  readonly height: Distance;

  /** Minimum distance between stations */
  readonly distance: Distance;

  /** Margin to edges within the map */
  readonly margin: Distance;

  /** Current number of stations */
  readonly size: number;

  /** The Stations in the Area */
  readonly stations: Set<iStation>;

  /** Max number of stations */
  readonly maxStations: number;

  /** A suitable location for adding a station */
  findLocation(): Location;

  /** Add a station */
  addStation(station: iStation): boolean;
}

/** A station with platforms, trains, tracks and platforms */
export interface iStation {
  /** Name of station */
  readonly name: string;

  /** Location in Area */
  readonly location: Location;

  /** Number of platforms */
  size: number;

  /** Number of passenger boardings and disembarkments */
  readonly transits: number;

  /** Add track to station */
  addTrack(track: iTrack): boolean;

  /** Remove track from station */
  delTrack(track: iTrack): boolean;

  /** Get number of tracks connected to station */
  numTrack(): number;

  /** Add train to a platform */
  addTrain(train: iTrain): boolean;

  /** Remove train from a platform */
  delTrain(train: iTrain): boolean;

  /** Get number of trains currently at station */
  numTrain(): number;

  /** Check if all platforms are occupied */
  readonly isFull: boolean;

  /** Add passenger to station waiting area */
  addPassenger(passenger: iPassenger): boolean;

  /** Remove passenger from station */
  delPassenger(passenger: iPassenger): boolean;

  /** Get number of passengers waiting at station */
  numPassenger(): number;
}

/** All passengers in simulation */
export interface iPopulation {
  /** Number of passengers */
  readonly size: number;

  /** Add passenger to population */
  addPassenger(passenger: iPassenger): boolean;

  /** Remove passenger from population */
  delPassenger(passenger: iPassenger): boolean;
}

/** Possible locations for passenger */
export type PassengerLocation = iStation | iTrain;

/** A traveler between origin and destination stations */
export interface iPassenger {
  /** Starting station */
  readonly origin: iStation;

  /** Station to reach */
  readonly destination: iStation;

  /** Currently location of journey */
  readonly location: PassengerLocation;

  /** Path from origin to destination */
  readonly route: iRoute;

  /** Set location to train */
  board(train: iTrain): boolean;

  /** Set location to station */
  disembark(station: iStation): boolean;
}

/** Collection of tracks */
export interface iNetwork {
  /** Existing tracks */
  readonly tracks: Set<iTrack>;

  /** Add a track */
  addTrack(track: iTrack): boolean;

  /** Remove a track */
  delTrack(track: iTrack): boolean;

  /** Identify which Island has Station */
  islandByStation(station: iStation): iIsland;

  /** Number of tracks */
  readonly size: number;

  /** Set of connected tracks */
  readonly islands: Islands;
}

/** Tracks which are connected by stations */
export interface iIsland {
  /** Shorts route by distance */
  shortestPath(a: iStation, b: iStation): iRoute;

  /** Fastest (distance/wear) route */
  fastestPath(a: iStation, b: iStation): iRoute;

  /** Set of trains running in Island */
  readonly trains: Set<iTrain>;

  /** Set of stations connected in Island */
  readonly stations: Set<iStation>;
}

/** All Islands in a Network */
export type Islands = Set<iIsland>;

/** Sequence of tracks from one station to another */
export interface iRoute {
  /** Total distance of route */
  readonly distance: Distance;

  /** Remove next track from route */
  shift(): iStation | iTrack;

  /** Confirm if next track matches next track in other Route */
  nextMatch(other: iRoute): boolean;
}

/** Geometric distance between two stations */
export type Distance = number;

/** Link between stations */
export interface iTrack {
  /** The stations at each end of Track */
  readonly stations: Set<iStation>;

  /** Set a train on the track */
  addTrain(train: iTrain): boolean;

  /** Take train off track */
  delTrain(train: iTrain): boolean;

  /** Is a train on track */
  readonly isFull: boolean;

  /** Reset wear of track */
  repair(): boolean;

  /** Distance between stations */
  readonly distance: Distance;

  /** Can trains drive on track */
  readonly isBroken: boolean;
}

/** All trains in simulation */
export interface iFleet {
  /** Add a train */
  addTrain(train: iTrain): boolean;

  /** Remove a train */
  delTrain(train: iTrain): boolean;

  /** All trains */
  readonly trains: Set<iTrain>;

  /** Number of trains */
  readonly size: number;
}

/** Train type definition */
export type TrainType = {
  /** Name of train type */
  readonly name: string;

  /** Maximum number of passengers */
  readonly size: number;

  /** Maximum speed of the train */
  readonly speed: number;

  /** Wear factor */
  readonly quality: number;

  /** Cost of the train */
  readonly cost: number;
};

/** State of train */
export enum TrainState {
  Waiting = "waiting",
  Running = "running",
  Broken = "broken",
}

/** Location of train */
export type TrainLocation = iStation | iTrack;

/** Train instance */
export interface iTrain {
  /** Type of train */
  readonly type: TrainType;

  /** Location of train */
  readonly location: TrainLocation;

  /** State of train */
  readonly state: TrainState;

  /** Add a passenger */
  addPassenger(passenger: iPassenger): boolean;

  /** Delete a passenger */
  delPassenger(passenger: iPassenger): boolean;

  /** Can passenger board */
  readonly isFull: boolean;

  /** Reset wear of train */
  repair(): boolean;

  /** Move train down the current track at maximum allowed speed */
  move(): boolean;

  /** Move train from station to track */
  depart(track: iTrack): boolean;

  /** Move train from track to station */
  arrive(station: iStation): boolean;
}
