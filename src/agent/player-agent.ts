import { findNearestStation } from "../station/mod.ts";
import { listNetworks } from "../network/mod.ts";
import { unConnectedStations } from "../station/mod.ts";
import { createTrack } from "../track/mod.ts";
import { createTrain } from "../train/mod.ts";
import type { Agent, Simulation } from "../simulation/mod.ts";
import type { Trains } from "../train/mod.ts";

/** Take an action on behalf of a player */
export const playerAgent: Agent = (game: Simulation): void => {
  // Place a train on a network without any trains
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

    // A train type affordable by user
    const type = [...game.trainTypes].find((type) => type.cost <= game.balance);
    if (!type) break;
    createTrain(game, type, station);
    game.event(`${type.name} train inserted in ${station.name}`);
    return;
  }

  // If a station is unconnected, connect it to nearest other station
  const unconnected = unConnectedStations(game);
  for (const station of unconnected) {
    const other = findNearestStation(game, station);
    createTrack(game, station, other);
    game.event(`Track built from ${station.name} to ${other.name}`);
    return;
  }
};
