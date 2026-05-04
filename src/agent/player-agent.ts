import { findNearestStation } from "../analyze/find-nearest-station.ts";
import { listNetworks } from "../analyze/list-networks.ts";
import { unConnectedStations } from "../analyze/list-unconnected-stations.ts";
import { createTrack } from "../factory/create-track.ts";
import { createTrain } from "../factory/create-train.ts";
import type { Simulation } from "../play/simulation.ts";
import type { Trains } from "../state/train.ts";

/** Take an action on behalf of a player */
export const playerAgent = (game: Simulation): void => {
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
    console.log(`Player create track from ${station.name} to ${other.name}`);
    return;
  }
};
