/** A network of connected stations and tracks */
import type { iIsland, iNetwork, iStation, iTrack } from "../types.ts";
import type { Station } from "../station/station.ts";
import { Island } from "./island.ts";

export class Network implements iNetwork {
  // Public properties
  public readonly tracks: Set<iTrack> = new Set();
  public islands: Set<iIsland> = new Set();

  /** Adds a track to the network and updates connected islands */
  public addTrack(track: iTrack): boolean {
    this.tracks.add(track);
    this.createIslands();
    return true;
  }

  /** Removes a track from the network and updates connected islands */
  public delTrack(track: iTrack): boolean {
    this.tracks.delete(track);
    this.createIslands();
    return true;
  }

  /**
   * Calculates all connected island components in the network
   * Uses depth-first search to find connected stations
   */
  private createIslands(): void {
    // Build adjacency map: station -> Set of connected stations
    const adjacency: Map<Station, Set<Station>> = new Map();
    const allStations: Set<Station> = new Set();

    // Iterate over all tracks to build the graph
    for (const track of this.tracks) {
      const [a, b] = Array.from(track.stations) as [Station, Station];
      // Ensure both stations are in the map
      if (!adjacency.has(a)) adjacency.set(a, new Set());
      if (!adjacency.has(b)) adjacency.set(b, new Set());
      // Connect a to b and b to a
      adjacency.get(a)!.add(b);
      adjacency.get(b)!.add(a);
      allStations.add(a);
      allStations.add(b);
    }

    // Find connected components using DFS
    const visited = new Set<Station>();
    for (const station of allStations) {
      if (!visited.has(station)) {
        const component: Set<Station> = new Set();
        this.dfs(station, adjacency, visited, component);
        this.islands.add(new Island(component));
      }
    }
  }

  /**
   * Depth-first search to find all stations in a connected component
   */
  private dfs(
    station: Station,
    adjacency: Map<Station, Set<Station>>,
    visited: Set<Station>,
    component: Set<Station>,
  ): void {
    if (visited.has(station)) return;
    visited.add(station);
    component.add(station);
    const neighbors = adjacency.get(station);
    if (neighbors) {
      for (const neighbor of neighbors) {
        this.dfs(neighbor, adjacency, visited, component);
      }
    }
  }

  /**
   * Finds the island containing a specific station
   */
  public islandByStation(station: iStation): iIsland {
    for (const island of this.islands) {
      if (island.stations.has(station)) return island;
    }
    throw new Error("Station not in network");
  }

  /** Gets the number of tracks in the network */
  public get size(): number {
    return this.tracks.size;
  }
}
