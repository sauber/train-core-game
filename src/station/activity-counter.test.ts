// Test for activity counter increment on passenger arrival
import { assertEquals } from "@std/assert";
import { Station } from "./station.ts";
import { stationAgent } from "./station-agent.ts";
import { Passenger } from "../passenger/mod.ts";
import { Simulation } from "../simulation/mod.ts";

// Create a minimal simulation instance
const createMockSimulation = () => {
  const sim = new Simulation({
    balance: 0,
    initialBalance: 0,
    terminated: false,
    tick: 0,
    journal: [],
  });
  return sim;
};

Deno.test("Station activity increments on passenger arrival", () => {
  const sim = createMockSimulation();
  const station = new Station("A", { x: 0, y: 0 }, 2);
  sim.area.stations.add(station);

  // Create passenger with origin and destination
  const passenger = new Passenger(station, station);
  sim.passengers.add(passenger);
  station.passengers.add(passenger);

  // Run station agent
  stationAgent(sim as unknown as Simulation);

  assertEquals(station.activity, 1, "Activity should increment on arrival");
});
