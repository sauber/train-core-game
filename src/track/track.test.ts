import { assertEquals } from "@std/assert";
import { Track } from "./track.ts";
import type { iStation, iTrain } from "../types.ts";

Deno.test("Create track", () => {
  const a = { location: { x: 0, y: 0 } } as iStation;
  const b = { location: { x: 0, y: 0 } } as iStation;
  const track = new Track(a, b);
  assertEquals(track.distance, 0);
  assertEquals(track.otherStation(a), b);
  assertEquals(track.otherStation(b), a);
});

Deno.test("Add/remove train on track", () => {
  const a = { location: { x: 0, y: 0 } } as iStation;
  const b = { location: { x: 0, y: 0 } } as iStation;
  const track = new Track(a, b);

  // Add train when track is empty
  const train1 = {} as iTrain;
  assertEquals(track.addTrain(train1), true);
  assertEquals(track.isFull, true);
  assertEquals(track.numTrain(), 1);

  // Cannot add train again when track is full
  const train2 = {} as iTrain;
  assertEquals(track.addTrain(train2), false);
  assertEquals(track.isFull, true);

  // Remove train
  assertEquals(track.delTrain(train1), true);
  assertEquals(track.isFull, false);
  assertEquals(track.numTrain(), 0);

  // Cannot remove train again when track is empty
  assertEquals(track.delTrain(train1), false);
  assertEquals(track.isFull, false);
});

Deno.test("Repair track with wear/breakage", () => {
  const a = { location: { x: 0, y: 0 } } as iStation;
  const b = { location: { x: 0, y: 0 } } as iStation;
  const track = new Track(a, b);

  // Track is not broken initially
  assertEquals(track.isBroken, false);

  // Simulate track becoming worn (wear >= 1)
  Object.assign(track, { wear: 1 });
  assertEquals(track.isBroken, true);

  // Cannot add train when track is broken
  const train = {} as iTrain;
  assertEquals(track.addTrain(train), false);

  // Test repair functionality
  assertEquals(track.repair(), true);
  assertEquals(track.isBroken, false);
});
