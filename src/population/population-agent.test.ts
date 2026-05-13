import { assertEquals } from "@std/assert";
import { populationAgent } from "./population-agent.ts";
import { createSimulation } from "../simulation/mod.ts";

/**
 * Test cases for population agent functionality
 */

Deno.test("populationAgent creates passengers at stations with capacity", () => {
  const sim = createSimulation();
  const station1 = sim.createStation();
  const station2 = sim.createStation();
  // Create a track so stations are in the same network/island
  sim.createTrack(station1, station2);
  const initialSize = sim.population.size;

  populationAgent(sim);

  // Should have created at least one passenger (station1 has capacity and station2 is a valid destination)
  assertEquals(sim.population.size, initialSize + 1);
});

Deno.test("populationAgent does not create passengers when station is full", () => {
  const sim = createSimulation();
  const station1 = sim.createStation();
  const station2 = sim.createStation();
  // Create a track so stations are in the same network/island
  sim.createTrack(station1, station2);

  // Fill both stations with passengers to prevent any new passenger creation
  for (let i = 0; i < station1.size; i++) {
    sim.population.addPassenger(
      sim.createPassenger(station1, station2, {
        distance: 1,
        shift: () => station2,
        nextMatch: () => false,
      }),
    );
  }
  for (let i = 0; i < station2.size; i++) {
    sim.population.addPassenger(
      sim.createPassenger(station2, station1, {
        distance: 1,
        shift: () => station1,
        nextMatch: () => false,
      }),
    );
  }

  const initialSize = sim.population.size;
  populationAgent(sim);

  // Should not create more passengers when all stations are full
  assertEquals(sim.population.size, initialSize);
});

Deno.test("populationAgent runs without error on empty simulation", () => {
  const sim = createSimulation();
  // No stations, should not crash
  populationAgent(sim);
  assertEquals(sim.population.size, 0);
});
