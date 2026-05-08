import { assertEquals } from "@std/assert";
import { Simulation } from "../simulation/mod.ts";
import { areaAgent } from "./area-agent.ts";
import { AreaLifecycle } from "../lifecycle/area-lifecycle.ts";

// Mock the areaAgent to use lifecycle
Deno.test("Area Agent - spawns station using lifecycle", () => {
  const game = new Simulation({
    balance: 1000,
    stationLevels: [0, 0, 0, 0, 6000],
  });

  // Run the agent
  areaAgent(game);

  // Should have created a station
  assertEquals(game.stations.size, 1);
  assertEquals(game.journal.length >= 1, true);
  // No cost to create stations, balance remains unchanged
  assertEquals(game.balance, 1000);
});

Deno.test("Area Agent - only spawns one station per tick", () => {
  const game = new Simulation({
    balance: 10000, // Enough for multiple stations
    stationLevels: [0, 0, 0, 0, 6000, 10000, 20000],
  });

  // Run the agent
  areaAgent(game);

  // Should only have created 1 station (max one per tick)
  assertEquals(game.stations.size, 1);
});
