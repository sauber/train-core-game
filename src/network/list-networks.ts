import type { Simulation } from "../simulation/mod.ts";
import { type Station, Stations } from "../station/mod.ts";
import { Network, type Networks } from "./network.ts";

/** List of all networks in game */
export function listNetworks(game: Simulation): Networks {
  const networks: Networks = new Set<Network>();
  // Make clone of stations
  const stations: Stations = new Stations(Infinity, [...game.stations]);
  while (stations.size > 0) {
    const station: Station = [...stations][0];
    const network = new Network(station);
    networks.add(network);
    for (const station of network.stations) {
      stations.delete(station);
    }
  }
  return networks;
}
