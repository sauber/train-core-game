import type { Simulation } from "./simulation.ts";
import { createGame } from "./create-game.ts";
import { playerAgent } from "../agent/player-agent.ts";

const player = playerAgent;

/** Play a game with player controller */
export function playGame(maxSteps: number = 10): Simulation {
  const game = createGame();
  game.run([player], maxSteps);
  return game;
}
