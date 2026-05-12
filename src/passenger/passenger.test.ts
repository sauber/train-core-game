import { assertEquals, assertInstanceOf } from "@std/assert";
import { Passenger } from "./passenger.ts";
import type { iRoute, iStation, iTrain, TrainType } from "../types.ts";
import { TrainState } from "../types.ts";

// Mock implementations for testing
const mockTrainType: TrainType = {
  name: "MockTrain",
  size: 100,
  speed: 100,
  quality: 100,
  cost: 1000,
};

const mockTrainState: TrainState = TrainState.Waiting;

const mockTrainLocation = { name: "Mock Location" } as iStation;

const mockTrain: iTrain = {
  type: mockTrainType,
  location: mockTrainLocation,
  state: mockTrainState,
  addPassenger: () => true,
  delPassenger: () => true,
  isFull: false,
  repair: () => true,
  move: () => true,
  depart: () => true,
  arrive: () => true,
};

Deno.test("Passenger Instance", () => {
  const origin = { name: "A" } as iStation;
  const destination = { name: "B" } as iStation;
  const route = {} as iRoute;

  const passenger = new Passenger(origin, destination, route);
  assertInstanceOf(passenger, Passenger);
});

Deno.test("Passenger initial location is origin", () => {
  const origin = { name: "A" } as iStation;
  const destination = { name: "B" } as iStation;
  const route = {} as iRoute;

  const passenger = new Passenger(origin, destination, route);
  assertEquals(passenger.location, origin);
});

Deno.test("Passenger board sets location to train and returns true", () => {
  const origin = { name: "A" } as iStation;
  const destination = { name: "B" } as iStation;
  const route = {} as iRoute;

  const passenger = new Passenger(origin, destination, route);
  const result = passenger.board(mockTrain);
  assertEquals(result, true);
  assertEquals(passenger.location, mockTrain);
});

Deno.test("Passenger disembark sets location to station and returns true", () => {
  const origin = { name: "A" } as iStation;
  const destination = { name: "B" } as iStation;
  const route = {} as iRoute;
  const station = { name: "Station C" } as iStation;

  const passenger = new Passenger(origin, destination, route);
  // First board a train to be on a train
  passenger.board(mockTrain);
  // Then disembark
  const result = passenger.disembark(station);
  assertEquals(result, true);
  assertEquals(passenger.location, station);
});
