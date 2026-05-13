import { assertEquals } from "@std/assert";
import { trackAgent } from "./track-agent.ts";
import { createSimulation } from "../simulation/mod.ts";

/**
 * Test cases for track agent functionality
 */

Deno.test("trackAgent connects isolated stations", () => {
  const sim = createSimulation();
  const station1 = sim.createStation();
  const station2 = sim.createStation();
  const initialTrackCount = sim.network.tracks.size;

  trackAgent(sim);

  // Should have added one track
  assertEquals(sim.network.tracks.size, initialTrackCount + 1);
});

Deno.test("trackAgent does nothing when no isolated stations", () => {
  const sim = createSimulation();
  const station1 = sim.createStation();
  const station2 = sim.createStation();

  // Manually connect them
  sim.createTrack(station1, station2);
  const initialTrackCount = sim.network.tracks.size;

  trackAgent(sim);

  // Should not add any tracks
  assertEquals(sim.network.tracks.size, initialTrackCount);
});
