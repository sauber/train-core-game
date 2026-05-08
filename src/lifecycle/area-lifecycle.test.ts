import { assertEquals } from "@std/assert";
import { Simulation } from "../simulation/mod.ts";
import { AreaLifecycle } from "./area-lifecycle.ts";
import { Station } from "../station/mod.ts";

Deno.test("AreaLifecycle - can spawn station with journal logging", () => {
  const game = new Simulation({ balance: 1000 });
  const lifecycle = new AreaLifecycle(game);

  const station = lifecycle.spawn("Test Station", 2);

  assertEquals(station.name, "Test Station");
  assertEquals(station.platforms, 2);
  assertEquals(game.balance, 800); // 1000 - (2 platforms * 100 cost)
  assertEquals(game.journal.length, 1);
  assertEquals(
    game.journal[0].message.includes("Created station Test Station"),
    true,
  );
  assertEquals(game.journal[0].transaction, -200);
});

Deno.test("AreaLifecycle - can destroy station", () => {
  const game = new Simulation({ balance: 1000 });
  const lifecycle = new AreaLifecycle(game);

  // Create a station first (costs 200, balance = 800)
  const station = lifecycle.spawn("Test Station", 2);

  // Clear journal to focus on destroy event
  game.journal = [];

  lifecycle.destroy(station);

  // Balance should be 800 + 100 (revenue) = 900
  assertEquals(game.balance, 900); // 800 + (2 platforms * 50 revenue)
  assertEquals(game.journal.length, 1);
  assertEquals(
    game.journal[0].message.includes("Removed station Test Station"),
    true,
  );
  assertEquals(game.journal[0].transaction, 100);
});

Deno.test("AreaLifecycle - journal entries include tick", () => {
  const game = new Simulation({ balance: 1000, tick: 10 });
  const lifecycle = new AreaLifecycle(game);

  lifecycle.spawn("Test Station", 1);

  assertEquals(game.journal[0].tick, 10);
});
