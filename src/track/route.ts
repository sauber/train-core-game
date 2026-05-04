import type { Distance } from "../area/area.ts";
import type { Track } from "./track.ts";

export type Sequence = Track[];

/** A sequence of tracks to get from one stations to another */
export class Route {
  constructor(public readonly tracks: Sequence) {}

  /** Total distance of route */
  public distance(): Distance {
    return this.tracks.reduce((acc, track) => acc + track.distance, 0);
  }
}
