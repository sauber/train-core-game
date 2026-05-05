import type { Agents } from "./agent.ts";
import { Simulation } from "./simulation.ts";
import { fleetAgent } from "../fleet/mod.ts";
import { areaAgent } from "../area/mod.ts";
import { trackAgent } from "../track/mod.ts";
import { mapAgent } from "./mod.ts";

const agents: Agents = [fleetAgent, trackAgent, areaAgent, mapAgent];

/** Play a game with player controller */
const maxSteps: number = 10;
const game = new Simulation();
game.run(agents, maxSteps, 500);
