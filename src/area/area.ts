import type { Distance, iArea, iStation, Location } from "../types.ts";
import { LimitSet } from "../utils/limitset.ts";
import { distance } from "./distance.ts";

/** Game map */
export class Area implements iArea {
  public readonly stations: LimitSet<iStation>;

  /** Width of map */
  public readonly width: Distance = 1000;
  /** Height of map */
  public readonly height: Distance = 600;
  /** Minimum distance between stations */
  public readonly distance: Distance = 100;
  /** Margin to edges within the map */
  public readonly margin: Distance = 50;
  /** Max number of stations */
  public readonly maxStations: number = 12;

  constructor(p: Partial<Area> = {}) {
    Object.assign(this, p);
    this.stations = new LimitSet<iStation>(this.maxStations);
  }

  /** Find a random location on the map with minimum distance to existing stations */
  public findLocation(): Location {
    const m = this.margin;
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(Math.random() * (this.width - 2 * m)) + m;
      const y = Math.floor(Math.random() * (this.height - 2 * m)) + m;
      const loc: Location = { x, y };

      let ok = true;
      for (const s of this.stations.values()) {
        if (distance(loc, s.location) < this.distance) {
          ok = false;
          break;
        }
      }
      if (ok) return loc;
    }
    throw new Error("Could not find empty location for station");
  }

  /** Add station somewhere on the map */
  public addStation(station: iStation): boolean {
    if (this.stations.size >= this.maxStations) {
      throw new Error("Maximum number of stations reached");
    }
    this.stations.add(station);
    return true;
  }

  public get size(): number {
    return this.stations.size;
  }
}
