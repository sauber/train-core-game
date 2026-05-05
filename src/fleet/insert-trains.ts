import { listNetworks } from "../network/list-networks.ts";
import { createTrain } from "../train/create-train.ts";
import type { Simulation } from "../play/simulation.ts";
import type { Trains } from "../train/train.ts";
import type { Networks } from "../network/network.ts";
import type { Station } from "../station/station.ts";
import type { TrainType, TrainTypes } from "../train/train-type.ts";

// The stations with the most need of a train
function findStation(networks: Networks): Station | undefined {
  for (const network of networks) {
    if (network.tracks.size == 0) continue;

    const trains: Trains = network.trains;
    if (trains.size > 0) continue;

    // Stations with most passengers waiting for a train
    let station: Station = [...network.stations][0];
    for (const other of network.stations) {
      if (other.passengers.size > station.passengers.size) {
        station = other;
      }
    }

    return station;
  }
}

// Any train within budget
function findTrain(types: TrainTypes, budget: number): TrainType | undefined {
  return [...types].find((type) => (type.cost) <= budget);
}

/** Insert train in network which has none */
export function insertTrains(game: Simulation): boolean {
  const station: Station | undefined = findStation(listNetworks(game));
  if (!station) return false;

  // A train type affordable
  const type: TrainType | undefined = findTrain(game.trainTypes, game.balance);
  if (!type) return false;

  // Insert train at station
  const cost = Math.max(1, Math.round(type.cost));
  createTrain(game, type, station);
  game.event(`${type.name} train inserted in ${station.name}`, -cost);

  return true;
}
