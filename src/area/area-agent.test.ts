import { assertEquals } from "@std/assert";
import { createSimulation } from "../simulation/mod.ts";
import type { iSimulation } from "../types.ts";
import { areaAgent } from "./area-agent.ts";

/** Test cases for `./area-agent.ts` */

Deno.test("Insert a station", () => {
  const sim: iSimulation = createSimulation();
  assertEquals(sim.area.size, 0);
  areaAgent(sim);
  assertEquals(sim.area.size, 1);
});

Deno.test("Insert multiple stations", () => {
  const sim: iSimulation = createSimulation();

  const count = 3;
  for (let i = 0; i < count; i++) areaAgent(sim);
  assertEquals(sim.area.size, count);
});
