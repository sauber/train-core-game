import type { iStation, iTrack } from "../types.ts";
import { Track } from "./track.ts";

/** Create a track between two stations */
export function createTrack(
  a: iStation,
  b: iStation,
): iTrack {
  // Create track
  const track = new Track(a, b);
  return track;
}
