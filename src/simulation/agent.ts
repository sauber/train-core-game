import type { Simulation } from "./simulation.ts";

/** Agents for controlling game */
export type Agent = (game: Simulation) => void;
export type Agents = Array<Agent>;
