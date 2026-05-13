import type { Agents } from "../types.ts";
import { Simulation } from "./simulation.ts";
import { fleetAgent } from "../fleet/mod.ts";
import { areaAgent } from "../area/mod.ts";
import { networkAgent } from "../network/mod.ts";
import { populationAgent } from "../population/mod.ts";
import { passengerAgent } from "../passenger/mod.ts";
import { trackAgent } from "../track/mod.ts";
import { trainAgent } from "../train/mod.ts";
import { stationAgent } from "../station/mod.ts";
import { mapAgent } from "../dashboard/mod.ts";

const agents: Agents = [
  passengerAgent,
  populationAgent,
  trackAgent,
  networkAgent,
  trainAgent,
  fleetAgent,
  stationAgent,
  areaAgent,
  mapAgent,
];

/** Play a game with player controller */
const maxSteps: number = 10;
const game = new Simulation();
await game.run(agents, maxSteps, 500);
