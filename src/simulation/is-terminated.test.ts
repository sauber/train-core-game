import { assertEquals } from "@std/assert";
import { isTerminated } from "./is-terminated.ts";
import { Simulation } from "./simulation.ts";

Deno.test("Affort a train", () => {
  const game = new Simulation();
  const cheapestTrainPrice = Math.min(
    ...[...game.trainTypes].map((t) => t.cost),
  );

  // Can afford a train
  game.balance = cheapestTrainPrice + 1;
  let terminated: boolean = isTerminated(game);
  assertEquals(terminated, false);

  // Cannot afford a train
  game.balance = cheapestTrainPrice - 1;
  terminated = isTerminated(game);
  assertEquals(terminated, true);
});
