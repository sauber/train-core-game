import { assertInstanceOf } from "@std/assert/instance-of";
import { runSimulation } from "./run-simulation.ts";
import { Simulation } from "./simulation.ts";
import { assertEquals, assertGreaterOrEqual } from "@std/assert";

Deno.test("Play a game", () => {
  const steps = 4;
  const game = runSimulation(steps);
  // console.log(game.journal);
  // game.journal.forEach((entry) =>
  //   console.log(entry.message, entry.balance || "")
  // );
  assertInstanceOf(game, Simulation);
  assertEquals(game.tick, steps);
  assertGreaterOrEqual(game.journal.length, 1);
});
