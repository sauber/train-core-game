import type { iNetwork } from "../types.ts";
import { Network } from "./network.ts";

export function createNetwork(): iNetwork {
  return new Network();
}
