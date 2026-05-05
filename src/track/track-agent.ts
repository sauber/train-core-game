import { findNearestStation } from "../station/mod.ts";
import { unConnectedStations } from "../station/mod.ts";
import { createTrack } from "./mod.ts";
import { trackBuildCost } from "./mod.ts";
import type { Agent, Simulation } from "../simulation/mod.ts";
import { Track } from "../track/mod.ts";

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
