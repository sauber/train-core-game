import { assert, assertEquals } from "@std/assert";
import { Simulation } from "../simulation/mod.ts";
import { addTracks } from "./add-tracks.ts";
import { Track } from "../track/mod.ts";
import type { TrainType } from "../train/train-type.ts";

Deno.test("addTracks adds one track to isolated stations if affordable", () => {
  const game = new Simulation();
  // Create some stations
  const station1 = game.area.createStation("Station1", 1);
  const station2 = game.area.createStation("Station2", 1);
  const station3 = game.area.createStation("Station3", 1);

  const initialBalance = game.balance;
  const minTrainCost = Math.min(
    ...Array.from(game.trainTypes).map((t: TrainType) => t.cost),
  );

  // Initially, all should have no tracks
  assertEquals(station1.tracks.size, 0);
  assertEquals(station2.tracks.size, 0);
  assertEquals(station3.tracks.size, 0);
  assertEquals(game.tracks.size, 0);

  // Add tracks
  const result = addTracks(game);

  // Should have added one track
  assertEquals(result, true);
  assertEquals(game.tracks.size, 1);

  // Get the created track to verify the cost
  const track = Array.from(game.tracks)[0];
  const expectedCost = Math.max(
    1,
    Math.round(track.distance * (game.initialBalance / game.area.width)),
  );
  assertEquals(game.balance, initialBalance - expectedCost);
  // Verify sufficient funds remain for cheapest train
  assert(game.balance >= minTrainCost);
  assert(game.journal.length > 0);
  assert(game.journal[game.journal.length - 1].message.includes("Track built"));
  assertEquals(
    game.journal[game.journal.length - 1].transaction,
    -expectedCost,
  );
});

Deno.test("addTracks returns false when no isolated stations", () => {
  const game = new Simulation();
  // Create stations and connect them manually
  const station1 = game.area.createStation("Station1", 1);
  const station2 = game.area.createStation("Station2", 1);
  // Manually add a track
  const track = new Track(station1, station2);
  track.add(game);

  // Now, no isolated stations
  assertEquals(station1.tracks.size, 1);
  assertEquals(station2.tracks.size, 1);

  // Add tracks should return false
  const result = addTracks(game);
  assertEquals(result, false);
});

Deno.test("addTracks returns false when insufficient funds remain", () => {
  const game = new Simulation({ balance: 200 }); // Not enough to leave minimum after track cost

  // Add tracks should return false because remaining balance would be less than minTrainCost
  const result = addTracks(game);
  assertEquals(result, false);
  assertEquals(game.tracks.size, 0);
  assertEquals(game.balance, 200);
});
