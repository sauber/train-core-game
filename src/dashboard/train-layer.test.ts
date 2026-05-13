import { assertEquals } from "@std/assert";
import { trainLayer } from "./train-layer.ts";
import { createSimulation } from "../simulation/mod.ts";

/** Test cases for train layer rendering */
Deno.test("trainLayer function exists and can be called", () => {
  const sim = createSimulation();
  const station1 = sim.createStation();
  const station2 = sim.createStation();
  const _track = sim.createTrack(station1, station2);
  const trainType = { name: "Test", size: 1, speed: 10, quality: 1, cost: 100 };
  const train = sim.createTrain(trainType, station1);
  sim.fleet.addTrain(train);

  // Create a simple mock canvas matching CharPlot interface without private fields
  const canvas = {
    insert: () => {},
    clear: () => {},
    toString: () => "",
    width: 80,
    height: 24,
    assembleLine: () => "",
    lines: [],
  } as any;

  // Render the map
  trainLayer(canvas, 80, 24, sim);

  // Test passes if no exception is thrown
  assertEquals(true, true);
});
