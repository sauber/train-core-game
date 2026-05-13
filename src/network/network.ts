/** A network of connected stations and tracks */
import type { iIsland, iNetwork, iStation, iTrack } from "../types.ts";
import type { Station } from "../station/station.ts";
import { Island } from "./island.ts";

export class Network implements iNetwork {
  public readonly tracks: Set<iTrack> = new Set();
  public islands: Set<iIsland> = new Set();

  public addTrack(track: iTrack): boolean {
    this.tracks.add(track);
    this.createIslands();
    return true;
  }

  public delTrack(track: iTrack): boolean {
    this.tracks.delete(track);
    this.createIslands();
    return true;
  }

  private createIslands(): void {
    const adjacency: Map<Station, Set<Station>> = new Map();
    const allStations: Set<Station> = new Set();

    for (const track of this.tracks) {
      const [a, b] = Array.from(track.stations) as [Station, Station];
      if (!adjacency.has(a)) adjacency.set(a, new Set());
      if (!adjacency.has(b)) adjacency.set(b, new Set());
      adjacency.get(a)!.add(b);
      adjacency.get(b)!.add(a);
      allStations.add(a);
      allStations.add(b);
    }

    const visited = new Set<Station>();
    this.islands.clear();

    for (const station of allStations) {
      if (!visited.has(station)) {
        const component: Set<Station> = new Set();
        this.dfs(station, adjacency, visited, component);
        this.islands.add(new Island(component));
      }
    }
  }

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

  public islandByStation(station: iStation): iIsland {
    for (const island of this.islands) {
      if (island.stations.has(station)) return island;
    }
    throw new Error("Station not in network");
  }

  public get size(): number {
    return this.tracks.size;
  }
}
