/** Island implementation that groups connected stations */
import type { iIsland, iRoute, iStation, iTrain } from "../types.ts";
import { Route } from "./route.ts";

export class Island implements iIsland {
  public readonly stations: Set<iStation>;
  public readonly trains: Set<iTrain> = new Set();

  constructor(stations: Set<iStation>) {
    this.stations = new Set<iStation>(stations);
  }

  /** Returns shortest path between two stations */
  shortestPath(_a: iStation, _b: iStation): iRoute {
    // Placeholder implementation: return empty route
    return new Route([]);
  }

  /** Returns fastest path between two stations */
  fastestPath(_a: iStation, _b: iStation): iRoute {
    // Placeholder implementation: return empty route
    return new Route([]);
  }
}
