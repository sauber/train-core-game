import type { Game } from "./game.ts";
import { createGame } from "./create-game.ts";
import { stepGame } from "./step-game.ts";
import { playerController } from "../controller/player-controller.ts";

const player = playerController;

/** Play a game with player controller */
export function playGame(maxSteps: number = 10): Game {
  const game = createGame();
  while (!game.gameover && game.tick < maxSteps) {
    game.tick++;
    player(game);
    stepGame(game);
  }
  return game;
}
