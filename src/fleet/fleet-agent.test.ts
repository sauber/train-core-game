import { assertEquals } from "@std/assert";
import { fleetAgent } from "./fleet-agent.ts";
import { createSimulation } from "../simulation/mod.ts";
import { TrainState } from "../types.ts";
import type { iTrain, TrainType } from "../types.ts";

/**
 * Test cases for fleet agent functionality
 */

Deno.test("fleetAgent should repair a broken train", () => {
  const sim = createSimulation();
  const station = sim.createStation();
  const trainType: TrainType = {
    name: "TestTrain",
    size: 1,
    speed: 20,
    quality: 1,
    cost: 100,
  };
  // Create a mock train with broken state and a repair flag
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
  fleetAgent(sim);
  assertEquals(repaired, true);
  // Train should still be present in fleet
  assertEquals(sim.fleet.size, 1);
});

Deno.test("fleetAgent does nothing when no broken trains", () => {
  const sim = createSimulation();
  // No trains in fleet
  fleetAgent(sim);
  // Ensure no error and fleet remains empty
  assertEquals(sim.fleet.size, 0);
});

Deno.test("fleetAgent should add a train when island has no trains", () => {
  const sim = createSimulation();
  // Ensure fleet is initially empty
  assertEquals(sim.fleet.size, 0);
  // Run fleetAgent
  fleetAgent(sim);
  // Fleet size should now be 1
  assertEquals(sim.fleet.size, 1);
});
