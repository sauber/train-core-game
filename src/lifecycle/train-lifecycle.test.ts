import {
  assertEquals,
  assertGreaterOrEqual,
  assertInstanceOf,
} from "@std/assert";
import { TrainLifecycle } from "./train-lifecycle.ts";
import { Simulation } from "../simulation/mod.ts";
import { Station } from "../station/mod.ts";
import { Train } from "../train/mod.ts";
import type { TrainType } from "../train/train-type.ts";
import { Track } from "../track/mod.ts";

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

Deno.test("TrainLifecycle spawn adds train to station and logs event", () => {
  const game = createMockSimulation();
  const lifecycle = new TrainLifecycle(game);
  const station = createMockStation("Test Station");

  const trainType = [...game.trainTypes][0];
  const train = new Train(trainType);

  const initialTrains = game.trains.size;

  lifecycle.spawn(train, station);

  // Should add train to simulation
  assertEquals(game.trains.size, initialTrains + 1);

  // Should log event
  assertEquals(game.journal.length >= 1, true);
  assertGreaterOrEqual(
    game.journal[game.journal.length - 1].message.includes("Train added"),
    true,
  );
});

Deno.test("TrainLifecycle move moves train via track and logs event", () => {
  const game = createMockSimulation();
  const lifecycle = new TrainLifecycle(game);
  const station1 = createMockStation("Station1");
  const station2 = createMockStation("Station2");

  // Create a track between stations and add it to stations
  const track = new Track(station1, station2);
  station1.addTrack(track);
  station2.addTrack(track);

  const trainType = [...game.trainTypes][0];
  const train = new Train(trainType);

  // Add train to station1 first
  lifecycle.spawn(train, station1);

  const initialJournalLength = game.journal.length;

  // Move train from station1 to track (leaving station)
  lifecycle.move(train, track);

  // Should log movement event and state "runs"
  assertEquals(game.journal.length > initialJournalLength, true);
  assertGreaterOrEqual(
    game.journal[game.journal.length - 1].message.includes("Train moved"),
    true,
  );
  assertEquals(lifecycle.getState(train), "runs");

  // Now move from track to station2 (arriving)
  lifecycle.move(train, station2);

  // Should log another movement event and state "waiting_for_passengers"
  assertEquals(game.journal.length > initialJournalLength + 1, true);
  assertEquals(lifecycle.getState(train), "waiting_for_passengers");
});

Deno.test("TrainLifecycle destroy removes train and logs event", () => {
  const game = createMockSimulation();
  const lifecycle = new TrainLifecycle(game);
  const station = createMockStation("Test Station");

  const trainType = [...game.trainTypes][0];
  const train = new Train(trainType);

  // Add train first
  lifecycle.spawn(train, station);

  const initialTrains = game.trains.size;
  const initialJournalLength = game.journal.length;

  // Destroy train
  lifecycle.destroy(train);

  // Should remove train from simulation
  assertEquals(game.trains.size, initialTrains - 1);

  // Should log destruction event
  assertEquals(game.journal.length > initialJournalLength, true);
  assertGreaterOrEqual(
    game.journal[game.journal.length - 1].message.includes("Train removed"),
    true,
  );
});

Deno.test("TrainLifecycle can break and repair train", () => {
  const game = createMockSimulation();
  const lifecycle = new TrainLifecycle(game);
  const station = createMockStation("Test Station");

  const trainType = [...game.trainTypes][0];
  const train = new Train(trainType);

  // Add train first
  lifecycle.spawn(train, station);

  // Break the train
  lifecycle.breakTrain(train);

  // Should be broken
  assertEquals(lifecycle.getState(train), "broken");

  // Repair the train
  lifecycle.repairTrain(train);

  // Should be idle after repair
  assertEquals(lifecycle.getState(train), "idle");

  // Should have logged events
  assertEquals(game.journal.length >= 3, true);
});
