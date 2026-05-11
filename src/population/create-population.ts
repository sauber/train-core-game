import type { iPopulation } from "../types.ts";
import { Population } from "./population.ts";

export function createPopulation(): iPopulation {
  return new Population();
}
