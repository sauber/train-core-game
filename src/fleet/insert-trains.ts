import { listNetworks } from "../network/mod.ts";
import { createTrain } from "../train/mod.ts";
import type { Simulation } from "../simulation/mod.ts";
import type { Trains } from "../train/mod.ts";
import type { Networks } from "../network/mod.ts";
import type { Station } from "../station/mod.ts";
import type { TrainType, TrainTypes } from "../train/train-type.ts";
import { trainPurchaseCost } from "../utils/mod.ts";

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
  return [...types].find((type) => trainPurchaseCost(type) <= budget);
}

/** Insert train in network which has none */
export function insertTrains(game: Simulation): boolean {
  const station: Station | undefined = findStation(listNetworks(game));
  if (!station) return false;

  // A train type affordable
  const type: TrainType | undefined = findTrain(game.trainTypes, game.balance);
  if (!type) return false;

  // Insert train at station
  const cost = trainPurchaseCost(type);
  const train = createTrain(game, type, station);
  game.event(`${type.name} train inserted in ${station.name}`, -cost);
  // console.log(game.journal);
  // throw new Error("Train created with out event");

  return true;
}
