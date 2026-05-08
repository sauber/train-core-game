import {
  assertEquals,
  assertGreaterOrEqual,
  assertInstanceOf,
} from "@std/assert";
import { FleetLifecycle } from "./fleet-lifecycle.ts";
import { Simulation } from "../simulation/mod.ts";
import { Station } from "../station/mod.ts";
import { Train } from "../train/mod.ts";

// Helper to create a mock simulation
function createMockSimulation(): Simulation {
  return new Simulation({
    balance: 1000,
    terminated: false,
    tick: 0,
    journal: [],
  });
}

// Helper to create a mock station
function createMockStation(name: string): Station {
  return new Station(name, { x: 0, y: 0 }, 1);
}

Deno.test("FleetLifecycle spawn creates train and logs event", () => {
  const game = createMockSimulation();
  const lifecycle = new FleetLifecycle(game);
  const station = createMockStation("Test Station");

  // Get a train type from the simulation
  const trainType = [...game.trainTypes][0];

  const initialBalance = game.balance;
  const initialTrains = game.trains.size;

  const train = lifecycle.spawn(trainType, station);

  // Should create a train
  assertInstanceOf(train, Train);

  // Should add train to simulation
  assertEquals(game.trains.size, initialTrains + 1);

  // Should deduct cost from balance
  assertGreaterOrEqual(initialBalance, game.balance);

  // Should log event
  assertEquals(game.journal.length >= 1, true);
});

Deno.test("FleetLifecycle repair fixes degraded train", () => {
  const game = createMockSimulation();
  const lifecycle = new FleetLifecycle(game);
  const station = createMockStation("Test Station");

  const trainType = [...game.trainTypes][0];
  const train = lifecycle.spawn(trainType, station);

  // Degrade the train
  train.degraded = 1;
  assertEquals(train.degraded, 1);

  const initialBalance = game.balance;

  // Repair the train
  lifecycle.repair(train);

  // Should fix degradation
  assertEquals(train.degraded, 0);

  // Should deduct repair cost
  assertEquals(game.balance < initialBalance, true);

  // Should log event
  assertEquals(game.journal.length >= 2, true);
});

Deno.test("FleetLifecycle destroy removes train and adds revenue", () => {
  const game = createMockSimulation();
  const lifecycle = new FleetLifecycle(game);
  const station = createMockStation("Test Station");

  const trainType = [...game.trainTypes][0];
  const train = lifecycle.spawn(trainType, station);

  const initialBalance = game.balance;
  const initialTrains = game.trains.size;

  // Destroy the train
  lifecycle.destroy(train);

  // Should remove train from simulation
  assertEquals(game.trains.size, initialTrains - 1);

  // Should add resale revenue
  assertEquals(game.balance > initialBalance, true);

  // Should log event
  assertEquals(game.journal.length >= 2, true);
});
