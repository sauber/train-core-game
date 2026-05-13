import { assertEquals, assertGreater } from "@std/assert";
import { Train } from "./train.ts";
import {
  type iPassenger,
  type iRoute,
  type iStation,
  type iTrack,
  type TrainLocation,
  TrainState,
  type TrainType,
} from "../types.ts";

// Mock implementations
function mockStation(name: string): iStation & { isFull: boolean } {
  return {
    name,
    location: { x: 0, y: 0 },
    size: 1,
    transits: 0,
    isFull: false,
    addTrack: () => false,
    delTrack: () => false,
    numTrack: () => 0,
    addTrain: () => true,
    delTrain: () => true,
    numTrain: () => 0,
    addPassenger: () => true,
    delPassenger: () => true,
    numPassenger: () => 0,
  };
}

function mockTrack(
  distance: number,
  broken = false,
): iTrack & { isFull: boolean } {
  return {
    stations: new Set<iStation>(),
    distance,
    isBroken: broken,
    isFull: false,
    addTrain: () => true,
    delTrain: () => true,
    repair: () => true,
    wear: 0,
  };
}

function mockPassenger(origin: iStation, destination: iStation): iPassenger {
  return {
    origin,
    destination,
    location: origin,
    route: {
      distance: 0,
      shift: () => origin,
      nextMatch: () => true,
    } as unknown as iRoute,
    board: () => true,
    disembark: () => true,
  };
}

const type: TrainType = {
  name: "Express",
  speed: 100,
  quality: 10,
  cost: 1000,
  size: 200,
};

Deno.test("Init train", () => {
  const loc: TrainLocation = mockStation("Central");
  const train = new Train(type, loc);
  assertEquals(train.type, type);
  assertEquals(train.state, TrainState.Waiting);
});

Deno.test("Waiting to Running transition", () => {
  const station = mockStation("Central");
  const track = mockTrack(100, false);
  const train = new Train(type, station as unknown as TrainLocation);

  // Add a passenger and set route/track
  const passenger = mockPassenger(station, station);
  train.passengers.add(passenger);
  train.route = ["Central"];
  train.nextTrack = track;

  // Perform transition
  train.depart();

  // Verify state changes
  assertEquals(train.state, TrainState.Running);
  assertEquals(train.progress, 0);
});

Deno.test("Running to Waiting transition", () => {
  const track = mockTrack(100, false);
  const train = new Train(type, track as unknown as TrainLocation);

  // Set state to running and progress to 100
  train.progress = 100;

  // Perform transition
  train.arrive();

  // Verify state changes
  assertEquals(train.state, TrainState.Waiting);
});

Deno.test("Waiting to Broken transition", () => {
  const station = mockStation("Central");
  const train = new Train(type, station as unknown as TrainLocation);

  // Wear will increment upon arrival
  train.wear = 0.999;
  train.progress = 100;
  train.arrive();

  assertEquals(train.state, "broken");
});

Deno.test("Broken to Waiting transition", () => {
  const station = mockStation("Central");
  const train = new Train(type, station as unknown as TrainLocation);

  // Start broken
  train.wear = 1.0;
  assertEquals(train.state, TrainState.Broken);

  // Repair
  train.repair();

  assertEquals(train.state, TrainState.Waiting);
});

Deno.test("Cannot depart if track is occupied", () => {
  const station = mockStation("Central");
  const track = mockTrack(100);
  track.isFull = true; // Mock track as occupied
  const train = new Train(type, station);
  train.nextTrack = track;
  assertEquals(train.depart(), false);
});

Deno.test("Cannot depart if route is missing", () => {
  const train = new Train(type, mockStation("Central"));
  train.route = [];
  train.nextTrack = mockTrack(100);
  assertEquals(train.depart(), false);
});

Deno.test("Cannot depart if passenger is missing", () => {
  const train = new Train(type, mockStation("Central"));
  train.route = ["Station B"];
  train.nextTrack = mockTrack(100);
  // passengers.size is 0 by default
  assertEquals(train.depart(), false);
});

Deno.test("Cannot arrive if station is full", () => {
  const station = mockStation("Central");
  station.isFull = true; // Mock station as full
  const track = mockTrack(100, false);
  track.stations.add(station);
  const train = new Train(type, track);
  train.progress = 100;
  assertEquals(train.arrive(), false);
});

Deno.test("Progress increases when running", () => {
  const station = mockStation("Central");
  const track = mockTrack(100, false);
  const train = new Train(type, station as unknown as TrainLocation);
  train.route = ["Central"];
  train.nextTrack = track;

  // Add a passenger to allow departure
  const passenger = mockPassenger(station, station);
  train.passengers.add(passenger);

  train.depart();
  assertEquals(train.progress, 0);
  train.move();
  assertGreater(train.progress, 0);
});

Deno.test("Train runs slower when train is degraded (wear)", () => {
  const track = mockTrack(100, false);

  const train1 = new Train(type, track);
  train1.wear = 0;
  train1.move();
  const progressNew = train1.progress;

  const train2 = new Train(type, track);
  train2.wear = 0.5;
  train2.move();
  const progressWorn = train2.progress;

  assertGreater(progressNew, progressWorn);
});

Deno.test("Train runs slower when track distance is greater", () => {
  const shortTrack = mockTrack(50, false);
  const longTrack = mockTrack(200, false);

  const train1 = new Train(type, shortTrack);
  train1.move();
  const progressShort = train1.progress;

  const train2 = new Train(type, longTrack);
  train2.move();
  const progressLong = train2.progress;

  assertGreater(progressShort, progressLong);
});
