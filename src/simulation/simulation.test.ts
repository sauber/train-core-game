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

Deno.test("Run simulation", () => {
  const simulation = new Simulation();
  const agents: Agents = [];
  const ticks = 5;
  simulation.run(agents, ticks);
  assertEquals(simulation.tick, ticks);
});
