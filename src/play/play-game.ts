import type { Simulation } from "./simulation.ts";
import { createGame } from "./create-game.ts";
import { playerAgent } from "../agent/player-agent.ts";
import { areaAgent } from "../agent/area-agent.ts";

const player = playerAgent;
const area = areaAgent;

/** Play a game with player controller */
export function playGame(maxSteps: number = 10): Simulation {
  const game = createGame();
  game.run([area, player], maxSteps);
  return game;
}
