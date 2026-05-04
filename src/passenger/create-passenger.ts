import { listNetworks } from "../network/list-networks.ts";
import type { Networks } from "../network/network.ts";
import type { Simulation } from "../play/simulation.ts";
import { shuffle } from "../utils/shuffle.ts";
import { Passenger } from "./passenger.ts";

/** Create passenger at random connected station */
export function createPassenger(game: Simulation): Passenger | Error {
  const networks: Networks = listNetworks(game);
  if (networks.size == 0) return new Error("No networks");

  // Go through network in random order
  const shuffled = shuffle([...networks]);
  for (const network of shuffled) {
    if (network.stations.size < 2) continue;

    // Two random stations
    const [origin, destination] = shuffle([...network.stations]);

    const passenger = new Passenger(origin, destination);
    origin.passengers.add(passenger);
    game.passengers.add(passenger);
    return passenger;
  }
  return new Error("No stations connected");
}
