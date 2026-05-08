import { assertEquals } from "@std/assert";
import { Simulation } from "../simulation/mod.ts";
import { NetworkLifecycle } from "./network-lifecycle.ts";
import { Station } from "../station/mod.ts";
import { Location } from "../area/mod.ts";

Deno.test("NetworkLifecycle - can spawn track with journal logging", () => {
  const game = new Simulation({ balance: 10000 });

  // Create two stations first
  const station1 = new Station("Station1", { x: 0, y: 0 } as Location, 1);
  const station2 = new Station("Station2", { x: 100, y: 0 } as Location, 1);
  game.stations.add(station1);
  game.stations.add(station2);

  const lifecycle = new NetworkLifecycle(game);

  // Spawn track between stations
  const track = lifecycle.spawn(station1, station2);

  assertEquals(track.stations.has(station1), true);
  assertEquals(track.stations.has(station2), true);

  // Balance should be reduced by track cost (distance * 50 = 100 * 50 = 5000)
  assertEquals(game.balance, 5000);
  assertEquals(game.journal.length >= 1, true);
  assertEquals(game.journal[game.journal.length - 1].transaction, -5000);
});

Deno.test("NetworkLifecycle - can repair track", () => {
  const game = new Simulation({ balance: 10000 });

  // Create two stations and a track
  const station1 = new Station("Station1", { x: 0, y: 0 } as Location, 1);
  const station2 = new Station("Station2", { x: 100, y: 0 } as Location, 1);
  game.stations.add(station1);
  game.stations.add(station2);

  const lifecycle = new NetworkLifecycle(game);
  const track = lifecycle.spawn(station1, station2);

  // Degrade the track
  track.degraded = 0.5;

  // Clear journal
  game.journal = [];

  // Repair track
  lifecycle.repair(track);

  // Balance should be reduced by repair cost (distance * 25 * degraded = 100 * 25 * 0.5 = 1250)
  assertEquals(game.balance, 3750); // 10000 - 5000 (spawn) - 1250 (repair)
  assertEquals(game.journal.length, 1);
  assertEquals(game.journal[0].transaction, -1250);
  assertEquals(track.degraded, 0);
});

Deno.test("NetworkLifecycle - can destroy track", () => {
  const game = new Simulation({ balance: 10000 });
  // Create two stations and a track
  const station1 = new Station("Station1", { x: 0, y: 0 } as Location, 1);
  const station2 = new Station("Station2", { x: 100, y: 0 } as Location, 1);
  game.stations.add(station1);
  game.stations.add(station2);

  const lifecycle = new NetworkLifecycle(game);
  const track = lifecycle.spawn(station1, station2);

  // Clear journal
  game.journal = [];

  // Destroy track
  lifecycle.destroy(track);

  // Balance should be increased by revenue (distance * 25 = 100 * 25 = 2500)
  assertEquals(game.balance, 7500); // 10000 - 5000 (spawn) + 2500 (revenue)
  assertEquals(game.journal.length, 1);
  assertEquals(game.journal[0].transaction, 2500);
});
