import { playGame } from "./play-game.ts";

Deno.test("Play a game", () => {
  const game = playGame();
  console.log(game.journal);
});
