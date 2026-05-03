import { playGame } from "./play-game.ts";
import { assertEquals } from "@std/assert";

Deno.test("Play game", () => {
  const maxTicks = 5;
  const game = playGame(maxTicks);
  assertEquals(game.tick, maxTicks);
});
