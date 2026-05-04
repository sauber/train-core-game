import { findNearestStation } from "../analyze/find-nearest-station.ts";
import { unConnectedStations } from "../analyze/list-unconnected-stations.ts";
import { createTrack } from "../factory/create-track.ts";
import type { Agent, Simulation } from "../play/simulation.ts";
import { distance } from "../state/area.ts";
import type { Track } from "../state/track.ts";

/** If a station is unconnected, connect it to nearest other station */
export const trackAgent: Agent = (game: Simulation): void => {
  const unconnected = unConnectedStations(game);
  for (const station of unconnected) {
    const other = findNearestStation(game, station);
    if (other == station) continue;

    // Calculate price of track
    const unitPrice = game.initalBalance / game.area.width;
    const price = Math.max(
      1,
      Math.round(distance(station.location, other.location) * unitPrice),
    );

    let cheapest = Infinity;
    for (const type of game.trainTypes) {
      cheapest = Math.min(cheapest, type.cost);
    }

    // Leave enough balance for the cheapest train
    // console.log(`Balance=${game.balance} cheapest=${cheapest} price=${price}`);
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
