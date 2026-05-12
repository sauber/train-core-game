import { assert, assertEquals } from "@std/assert";
import { createSimulation } from "../simulation/mod.ts";
import { addTracks } from "./add-tracks.ts";
import type { TrainType } from "../types.ts";

Deno.test("addTracks adds one track to isolated stations if affordable", () => {
  const sim = createSimulation();
  // Create some stations using the simulation's createStation method
  const station1 = sim.createStation();
  const station2 = sim.createStation();
  const station3 = sim.createStation();

  const initialBalance = sim.balance;
  const minTrainCost = Math.min(
    ...Array.from(sim.trainTypes).map((t: TrainType) => t.cost),
  );

  // Initially, all should have no tracks
  assertEquals(station1.numTrack(), 0);
  assertEquals(station2.numTrack(), 0);
  assertEquals(station3.numTrack(), 0);
  assertEquals(sim.network.tracks.size, 0);

  // Add tracks
  const result = addTracks(sim);

  // Should have added one track
  assertEquals(result, true);
  assertEquals(sim.network.tracks.size, 1);

  // Get the created track to verify the cost
  const track = Array.from(sim.network.tracks)[0];
  const expectedCost = Math.max(
    1,
    Math.round(track.distance * (sim.initialBalance / sim.area.width)),
  );
  assertEquals(sim.balance, initialBalance - expectedCost);
  // Verify sufficient funds remain for cheapest train
  assert(sim.balance >= minTrainCost);
});

Deno.test("addTracks returns false when no isolated stations", () => {
  const game = createSimulation();
  // Create stations and connect them manually
  const station1 = game.createStation();
  const station2 = game.createStation();
  // Manually add a track
  game.createTrack(station1, station2);

  // Now, no isolated stations
  assertEquals(station1.numTrack(), 1);
  assertEquals(station2.numTrack(), 1);

  // Add tracks should return false
  const result = addTracks(game);
  assertEquals(result, false);
});

Deno.test("addTracks returns false when insufficient funds remain", () => {
  const game = createSimulation({ balance: 200 }); // Not enough to leave minimum after track cost

  // Add tracks should return false because remaining balance would be less than minTrainCost
  const result = addTracks(game);
  assertEquals(result, false);
  assertEquals(game.network.tracks.size, 0);
  assertEquals(game.balance, 200);
});
