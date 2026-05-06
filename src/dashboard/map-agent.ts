import type { Agent, Simulation } from "../simulation/mod.ts";
import { renderMap } from "./dashboard.ts";

let previousLineCount = 0;

/** Display ASCII map at each simulation step, updating in place */
export const mapAgent: Agent = (game: Simulation) => {
  const clearSequence = (previousLineCount > 0)
    ? `\x1b[${previousLineCount}A\x1b[0J`
    : "";

  const mapOutput = renderMap(game);
  const lineCount = mapOutput.split("\n").length;
  previousLineCount = lineCount;
  console.log(clearSequence + mapOutput);
};
