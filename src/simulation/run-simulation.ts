import type { Agents } from "../types.ts";
import { Simulation } from "./simulation.ts";
import { fleetAgent } from "../fleet/mod.ts";
import { areaAgent } from "../area/mod.ts";
import { networkAgent } from "../network/mod.ts";
import { populationAgent } from "../population/mod.ts";
import { mapAgent } from "../dashboard/mod.ts";

const agents: Agents = [
  populationAgent,
  fleetAgent,
  networkAgent,
  areaAgent,
  mapAgent,
];

/** Play a game with player controller */
const maxSteps: number = 10;
const game = new Simulation();
await game.run(agents, maxSteps, 500);
