import type { State } from "../entity/state.ts";
import type { Station } from "../entity/station.ts";
import { Track } from "../entity/track.ts";

/** Create a track between two stations, if it doesn't exist already */
export function createTrack(
  state: State,
  a: Station,
  b: Station,
): Track | Error {
  for (const track of state.tracks) {
    const [m, n] = track.stations;
    if ((m == a && n == b) || (m == b && n == a)) {
      return Error(`Track exists between ${m.name} and ${n.name}`);
    }
  }
  const track = new Track(a, b);
  state.tracks.add(track);
  return track;
}
