import type { Agent, Simulation } from "../simulation/mod.ts";

import { addTracks } from "./add-tracks.ts";
// import { removeTracks } from "./remove-track.ts";
import { repairTracks } from "./repair-tracks.ts";

/** Take actions on track, such as add, repair or remove */
export const networkAgent: Agent = (game: Simulation): void => {
  // if (removeTracks(game)) return;
  if (repairTracks(game)) return;
  if (addTracks(game)) return;
};
