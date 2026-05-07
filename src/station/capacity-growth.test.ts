// Test for capacity threshold checks and platform limit updates
import { assertEquals } from "@std/assert";
import { Station } from "./station.ts";
import { stationAgent } from "./station-agent.ts";
import { Passenger } from "../passenger/mod.ts";
import { Simulation } from "../simulation/mod.ts";

// Create a minimal simulation instance
const createMockSimulation = () => {
  return new Simulation({
    balance: 1000,
    terminated: false,
    tick: 0,
    journal: [],
  });
};

Deno.test("Station capacity grows based on activity threshold", () => {
  const sim = createMockSimulation();
  const station = new Station("A", { x: 0, y: 0 }, 1); // Start with 1 platform
  sim.area.stations.add(station);

  // Verify initial state
  assertEquals(station.platforms, 1, "Initial platforms should be 1");
  assertEquals(station.trains.limit, 1, "Initial train limit should be 1");

  // Simulate activity reaching 100 (threshold for 2 platforms)
  station.activity = 100;

  // Run station agent to check capacity
  stationAgent(sim as unknown as Simulation);

  // After reaching 100 activity, capacity should grow to 2
  assertEquals(
    station.platforms,
    2,
    "Platforms should grow to 2 after 100 activity",
  );
  assertEquals(
    station.trains.limit,
    2,
    "Train limit should grow to 2 after 100 activity",
  );
});

Deno.test("Station capacity grows to 3 at 250 activity", () => {
  const sim = createMockSimulation();
  const station = new Station("B", { x: 10, y: 10 }, 2); // Start with 2 platforms
  sim.area.stations.add(station);

  // Simulate activity reaching 250 (threshold for 3 platforms)
  station.activity = 250;

  // Run station agent
  stationAgent(sim as unknown as Simulation);

  // After reaching 250 activity, capacity should grow to 3
  assertEquals(
    station.platforms,
    3,
    "Platforms should grow to 3 after 250 activity",
  );
  assertEquals(
    station.trains.limit,
    3,
    "Train limit should grow to 3 after 250 activity",
  );
});

Deno.test("Station capacity grows to 4 at 500 activity", () => {
  const sim = createMockSimulation();
  const station = new Station("C", { x: 20, y: 20 }, 3); // Start with 3 platforms
  sim.area.stations.add(station);

  // Simulate activity reaching 500 (threshold for 4 platforms)
  station.activity = 500;

  // Run station agent
  stationAgent(sim as unknown as Simulation);

  // After reaching 500 activity, capacity should grow to 4
  assertEquals(
    station.platforms,
    4,
    "Platforms should grow to 4 after 500 activity",
  );
  assertEquals(
    station.trains.limit,
    4,
    "Train limit should grow to 4 after 500 activity",
  );
});

Deno.test("Station capacity does not decrease when activity drops", () => {
  const sim = createMockSimulation();
  const station = new Station("D", { x: 30, y: 30 }, 3); // Start with 3 platforms
  sim.area.stations.add(station);

  // Simulate activity dropping below threshold
  station.activity = 50;

  // Run station agent
  stationAgent(sim as unknown as Simulation);

  // Capacity should remain at 3 (no decrease)
  assertEquals(
    station.platforms,
    3,
    "Platforms should not decrease when activity drops",
  );
  assertEquals(
    station.trains.limit,
    3,
    "Train limit should not decrease when activity drops",
  );
});
