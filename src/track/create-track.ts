import type { Simulation } from "../simulation/mod.ts";
import type { Station } from "../station/mod.ts";
import { Track } from "./mod.ts";
import { trackBuildCost } from "./mod.ts";

/** Create a track between two stations, if it doesn't exist already */
export function createTrack(
  state: Simulation,
  a: Station,
  b: Station,
): Track | Error {
  for (const track of state.tracks) {
    const [m, n] = track.stations;
    if ((m == a && n == b) || (m == b && n == a)) {
      return Error(`Track exists between ${m.name} and ${n.name}`);
    }
  }

  // Create track
  const track = new Track(a, b);
  const price = trackBuildCost(state, track);

  if (price > state.balance) {
    return new Error(`Not enough funds ${price}>${state.balance}`);
  }

  // Insert track
  state.tracks.add(track);
  a.addTrack(track);
  b.addTrack(track);
  return track;
}
