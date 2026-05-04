import { listNetworks } from "./list-networks.ts";
import { createTrain } from "../train/create-train.ts";
import type { Agent, Simulation } from "../play/simulation.ts";
import type { Trains } from "../train/train.ts";

/** Insert a train on a network without any trains */
export const networkAgent: Agent = (game: Simulation): void => {
  const networks = listNetworks(game);
  for (const network of networks) {
    if (network.tracks.size == 0) continue;

    const trains: Trains = network.trains;
    if (trains.size > 0) continue;

    // Stations with most passengers waiting for a train
    let station = [...network.stations][0];
    for (const other of network.stations) {
      if (other.passengers.size > station.passengers.size) {
        station = other;
      }
    }
    // console.log("Looking for train for", station.name);

    // A train type affordable by user
    const type = [...game.trainTypes].find((type) =>
      (type.cost) <= game.balance
    );
    // console.log(type);
    if (!type) break;
    const cost = Math.max(1, Math.round(type.cost));
    createTrain(game, type, station);
    game.event(`${type.name} train inserted in ${station.name}`, -cost);
    // console.log(station);
    return;
  }
};
