import { findNearestStation } from "../analyze/find-nearest-station.ts";
import { unConnectedStations } from "../analyze/list-unconnected-stations.ts";
import { createTrack } from "../factory/create-track.ts";
import type { Agent, Simulation } from "../play/simulation.ts";

/** If a station is unconnected, connect it to nearest other station */
export const trackAgent: Agent = (game: Simulation): void => {
  const unconnected = unConnectedStations(game);
  for (const station of unconnected) {
    const other = findNearestStation(game, station);
    if (other == station) continue;
    createTrack(game, station, other);
    game.event(`Track built from ${station.name} to ${other.name}`);
    // Only put down one track per step
    return;
  }
};
