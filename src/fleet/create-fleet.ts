import type { iFleet } from "../types.ts";
import { Fleet } from "./fleet.ts";

export function createFleet(): iFleet {
  return new Fleet();
}
