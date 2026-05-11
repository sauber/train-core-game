/** Route implementation for network paths */
import type { Distance, iRoute, iStation, iTrack } from "../types.ts";

export class Route implements iRoute {
  private _tracks: iTrack[];

  constructor(tracks: iTrack[]) {
    this._tracks = tracks;
  }

  /** Total distance of route */
  public get distance(): Distance {
    return this._tracks.reduce((acc, track) => acc + track.distance, 0);
  }

  /** Remove next track from route */
  public shift(): iStation | iTrack {
    if (this._tracks.length === 0) {
      throw new Error("Route is empty");
    }
    return this._tracks.shift() as iStation | iTrack;
  }

  /** Confirm if next track matches next track in other Route */
  public nextMatch(other: iRoute): boolean {
    if (this._tracks.length === 0 || other.distance === 0) return false;
    // Compare first track by distance as a simple heuristic
    return this._tracks[0].distance === other.distance;
  }
}
