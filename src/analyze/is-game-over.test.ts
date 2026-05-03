import { assertEquals } from "@std/assert";
import { createGame } from "../play/create-game.ts";
import { isGameover } from "./is-game-over.ts";

Deno.test("Affort a train", () => {
  const game = createGame();
  const cheapestTrainPrice = Math.min(
    ...[...game.trainTypes].map((t) => t.cost),
  );

  // Can affort a train
  game.balance = cheapestTrainPrice + 1;
  let gameover: boolean = isGameover(game);
  assertEquals(gameover, false);

  // Cannot afford a train
  game.balance = cheapestTrainPrice - 1;
  gameover = isGameover(game);
  assertEquals(gameover, true);
});
