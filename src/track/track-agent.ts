import { findNearestStation } from "../station/find-nearest-station.ts";
import { unConnectedStations } from "../station/list-unconnected-stations.ts";
import { createTrack } from "./create-track.ts";
import { trackBuildCost } from "./cost.ts";
import type { Agent, Simulation } from "../play/simulation.ts";
import type { Track } from "./track.ts";

/** If a station is unconnected, connect it to nearest other station */
export const trackAgent: Agent = (game: Simulation): void => {
  const unconnected = unConnectedStations(game);
  for (const station of unconnected) {
    const other = findNearestStation(game, station);
    if (other == station) continue;

    const tempTrack = new Track(station, other);
    const price = trackBuildCost(game, tempTrack);

    let cheapest = Infinity;
    for (const type of game.trainTypes) {
      cheapest = Math.min(cheapest, type.cost);
    }

    if (price > (game.balance - cheapest)) continue;

    const track: Track | Error = createTrack(game, station, other);
    if (track instanceof Error) {
      game.event(
        `Error: Track from ${station.name} to ${other.name} not built: ` +
          track.message,
      );
    } else {
      game.event(
        `Track built from ${station.name} to ${other.name}`,
        -price,
      );
    }
    // Only put down one track per step
    return;
  }
};
