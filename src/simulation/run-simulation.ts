import type { Agents } from "./agent.ts";
import { Simulation } from "./simulation.ts";
import { fleetAgent } from "../fleet/mod.ts";
import { areaAgent } from "../area/mod.ts";
import { trackAgent } from "../track/mod.ts";
import { reportAgent } from "../agent/mod.ts";

const agents: Agents = [fleetAgent, trackAgent, areaAgent, reportAgent];

/** Play a game with player controller */
export function runSimulation(maxSteps: number = 10): Simulation {
  const game = new Simulation();
  game.run(agents, maxSteps);
  return game;
}
