import { assertEquals } from "@std/assert";
import { stationAgent } from "./station-agent.ts";
import { createSimulation } from "../simulation/mod.ts";
import type { iStation } from "../types.ts";

/** Test cases for "./station-agent.ts" */

Deno.test("Increase platforms", () => {
  const sim = createSimulation();
  const st: iStation = sim.createStation();
  assertEquals(st.size, 1);

  // Cannot increase when no transits happened
  stationAgent(sim);
  assertEquals(st.size, 1);

  // Transits happened
  Object.assign(st, { _transits: 1000 });
  stationAgent(sim);
  assertEquals(st.size, 4);
});
