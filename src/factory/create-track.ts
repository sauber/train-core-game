import type { Simulation } from "../play/simulation.ts";
import type { Station } from "../state/station.ts";
import { Track } from "../state/track.ts";

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

  // TODO: Calculate prices in a store

  // Create track
  // const unitCost = state.initalBalance / state.area.width;
  const track = new Track(a, b);

  // Estimate price and confirm available funds
  // const price = track.price;
  // if (price > state.balance) {
  //   return new Error(`Not enough funds ${price}>${state.balance}`);
  // }
  // state.balance -= price;

  // Insert track
  state.tracks.add(track);
  a.addTrack(track);
  b.addTrack(track);
  return track;
}
