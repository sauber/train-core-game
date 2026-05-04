import type { Simulation } from "../play/simulation.ts";
import type { Station, Stations } from "../state/station.ts";
import { Network } from "./network.ts";

/** List of all networks in game */
export function listNetworks(game: Simulation): Network[] {
  const networks: Network[] = [];
  const stations: Stations = new Set<Station>([...game.stations]);
  while (stations.size > 0) {
    const station: Station = [...stations][0];
    const network = new Network(station);
    networks.push(network);
    for (const station of network.stations) {
      stations.delete(station);
    }
  }
  return networks;
}
