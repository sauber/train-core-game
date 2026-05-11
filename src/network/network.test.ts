/** Test cases for "./network.ts"
Confirm requirements are met:
- Can add, delete and repair Tracks
- Can generate Set of Islands
*/

import { assertEquals } from "@std/assert";
import { Network } from "./network.ts";
import { Track } from "../track/track.ts";
import { Station } from "../station/station.ts";

// Create mock stations for testing
function createMockStation(name: string, x: number, y: number): Station {
  return new Station(name, { x, y }, 1);
}

// Test: Adding a track to the network
Deno.test("Network.addTrack() adds a track to the network", () => {
  const network = new Network();
  const stationA = createMockStation("A", 0, 0);
  const stationB = createMockStation("B", 1, 0);
  const track = new Track(stationA, stationB);

  const result = network.addTrack(track);
  assertEquals(result, true);
  assertEquals(network.size, 1);
  assertEquals(network.tracks.size, 1);
});

// Test: Adding the same track twice
Deno.test("Network.addTrack() does not add duplicate tracks", () => {
  const network = new Network();
  const stationA = createMockStation("A", 0, 0);
  const stationB = createMockStation("B", 1, 0);
  const track = new Track(stationA, stationB);

  network.addTrack(track);
  const result = network.addTrack(track);

  assertEquals(result, true); // Should still return true (Set behavior)
  assertEquals(network.size, 1); // Still only one track
});

// Test: Deleting a track from the network
Deno.test("Network.delTrack() removes a track from the network", () => {
  const network = new Network();
  const stationA = createMockStation("A", 0, 0);
  const stationB = createMockStation("B", 1, 0);
  const track = new Track(stationA, stationB);

  network.addTrack(track);
  const result = network.delTrack(track);

  assertEquals(result, true);
  assertEquals(network.size, 0);
  assertEquals(network.tracks.size, 0);
});

// Test: Deleting a track that doesn't exist
Deno.test("Network.delTrack() returns true for non-existent track", () => {
  const network = new Network();
  const stationA = createMockStation("A", 0, 0);
  const stationB = createMockStation("B", 1, 0);
  const track = new Track(stationA, stationB);

  const result = network.delTrack(track);

  assertEquals(result, true); // Set.delete returns false if not present, but method returns true
  assertEquals(network.size, 0);
});

// Test: Network size property
Deno.test("Network.size returns correct number of tracks", () => {
  const network = new Network();
  const stationA = createMockStation("A", 0, 0);
  const stationB = createMockStation("B", 1, 0);
  const stationC = createMockStation("C", 2, 0);
  const trackAB = new Track(stationA, stationB);
  const trackBC = new Track(stationB, stationC);

  network.addTrack(trackAB);
  assertEquals(network.size, 1);
  network.addTrack(trackBC);
  assertEquals(network.size, 2);
  network.delTrack(trackAB);
  assertEquals(network.size, 1);
});

// Test: islandByStation() throws error when station not in network
Deno.test("Network.islandByStation() throws error for station not in any island", () => {
  const network = new Network();
  const stationA = createMockStation("A", 0, 0);

  try {
    network.islandByStation(stationA);
    assertEquals(true, false); // Should not reach here
  } catch (error) {
    assertEquals(error instanceof Error, true);
    assertEquals((error as Error).message, "Station not in network");
  }
});

// Test: Network can be created with createNetwork()
Deno.test("createNetwork() creates a new Network instance", () => {
  const network = new Network();
  assertEquals(network instanceof Network, true);
  assertEquals(network.size, 0);
});

// Test: Network starts with empty tracks set
Deno.test("Network constructor initializes empty tracks set", () => {
  const network = new Network();
  assertEquals(network.tracks instanceof Set, true);
  assertEquals(network.tracks.size, 0);
});

// Test: Network islands set is initialized
Deno.test("Network constructor initializes islands set", () => {
  const network = new Network();
  assertEquals(network.islands instanceof Set, true);
  assertEquals(network.islands.size, 0);
});

// TODO: Add tests for island generation when createIslands() is implemented
// TODO: Test that adding tracks triggers island creation
// TODO: Test that deleting tracks triggers island recalculation
