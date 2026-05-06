import { assertEquals, assertInstanceOf } from "@std/assert";
import type { Agents } from "./agent.ts";
import { Simulation } from "./simulation.ts";

Deno.test("Simulation instance", () => {
  const simulation = new Simulation();
  assertInstanceOf(simulation, Simulation);
});

Deno.test("Step simulation", () => {
  const simulation = new Simulation();
  const agents: Agents = [];
  simulation.step(agents);
  assertEquals(simulation.tick, 1);
  simulation.step(agents);
  assertEquals(simulation.tick, 2);
});

Deno.test("Run simulation", async () => {
  const simulation = new Simulation();
  const agents: Agents = [];
  const ticks = 5;
  simulation.run(agents, ticks, 0);
  // Wait for simulation to complete (each tick is 0ms apart, so we need to wait)
  await new Promise((resolve) => setTimeout(resolve, 100));
  assertEquals(simulation.tick, ticks);
});
