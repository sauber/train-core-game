import type { iArea } from "../types.ts";
import { Area } from "./area.ts";

export function createArea(): iArea {
  return new Area();
}
