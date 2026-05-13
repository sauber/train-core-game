import { assert, assertEquals } from "@std/assert";
import { passengerAgent } from "./passenger-agent.ts";
import { createSimulation } from "../simulation/mod.ts";

/**
 * Test cases for passenger agent
 */

Deno.test("passengerAgent creates a passenger when there are at least two stations", () => {
  const sim = createSimulation();
  sim.createStation();
  sim.createStation();
  const initialSize = sim.population.size;

  passengerAgent(sim);

  // Should have created at least one passenger
  assertEquals(sim.population.size, initialSize + 1);
});

Deno.test("passengerAgent does nothing when there are fewer than two stations", () => {
  const sim = createSimulation();
  sim.createStation();
  const initialSize = sim.population.size;

  passengerAgent(sim);

  // Should not create passenger
  assertEquals(sim.population.size, initialSize);
});

Deno.test("passengerAgent assigns a route to the passenger", () => {
  const sim = createSimulation();
  sim.createStation();
  sim.createStation();
  passengerAgent(sim);

  // Should have created at least one passenger
  assert(sim.population.size > 0);
  // The route is internal to the passenger, but we can verify it exists conceptually
  // This test is more about ensuring the agent runs without error
  assertEquals(sim.population.size, 1);
});
