import { assertEquals } from "@std/assert";
import { trainAgent } from "./train-agent.ts";
import { createSimulation } from "../simulation/mod.ts";
import { TrainState } from "../types.ts";
import type { iTrain, TrainType } from "../types.ts";

/**
 * Test cases for train agent functionality
 */

Deno.test("trainAgent repairs broken trains", () => {
  const sim = createSimulation();
  const station = sim.createStation();
  const trainType: TrainType = {
    name: "TestTrain",
    size: 1,
    speed: 20,
    quality: 1,
    cost: 100,
  };

  // Create a mock train with broken state
  let repaired = false;
  const mockTrain: iTrain = {
    type: trainType,
    location: station,
    state: TrainState.Broken,
    addPassenger: () => true,
    delPassenger: () => true,
    isFull: false,
    repair: () => {
      repaired = true;
      return true;
    },
    move: () => true,
    depart: () => true,
    arrive: () => true,
  };
  sim.fleet.addTrain(mockTrain);
  trainAgent(sim);
  assertEquals(repaired, true);
  assertEquals(sim.fleet.size, 1);
});

Deno.test("trainAgent does nothing when no broken trains", () => {
  const sim = createSimulation();
  // No trains in fleet
  trainAgent(sim);
  assertEquals(sim.fleet.size, 0);
});

Deno.test("trainAgent creates train on island with no trains", () => {
  const sim = createSimulation();
  // Create two stations and a track to form an island with no trains
  const station1 = sim.createStation();
  const station2 = sim.createStation();
  sim.createTrack(station1, station2);
  // Ensure fleet is initially empty
  assertEquals(sim.fleet.size, 0);
  // Run trainAgent
  trainAgent(sim);
  // Fleet size should now be 1
  assertEquals(sim.fleet.size, 1);
});
