import { type Agents, Simulation } from "./simulation.ts";
import { networkAgent } from "../agent/network-agent.ts";
import { areaAgent } from "../agent/area-agent.ts";
import { trackAgent } from "../track/track-agent.ts";

const agents: Agents = [networkAgent, trackAgent, areaAgent];

/** Play a game with player controller */
export function runSimulation(maxSteps: number = 10): Simulation {
  const game = new Simulation();
  game.run(agents, maxSteps);
  return game;
}
