import type { Station } from "./station.ts";

// A coordinate on the map
type Location = {
  x: number;
  y: number;
};

// Distance between two locations
function distance(a: Location, b: Location): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// A station at a location on the map
type Spot = Location & {
  station: Station;
};

/** Game map */
export class Area {
  private readonly spots: Array<Spot> = [];

  constructor(
    /** Width of map */
    public readonly width: number,
    /** Height of map */
    public readonly height: number,
    /** Minimum distance between stations */
    public readonly distance: number,
    /** Margin to edges within the map */
    public readonly margin: number,
  ) {}

  // A random location on the map
  private randomLocation(): Location {
    return {
      x: Math.random() * (this.width - 2 * this.margin) + this.margin,
      y: Math.random() * (this.height - 2 * this.margin) + this.margin,
    };
  }

  // What is the shortest distance from a location to any existing spots
  private shortestDistance(location: Location): number {
    let shortest = Infinity;
    for (const spot of this.spots) {
      const dist = distance(location, spot);
      if (dist < shortest) shortest = dist;
    }
    return shortest;
  }

  // Find a random location on the map with minimum distance to existing spots
  private findEmptyLocation(): Location {
    // TODO: Fail after maximum number of tries
    while (true) {
      const location: Location = this.randomLocation();
      const distance = this.shortestDistance(location);
      if (distance >= this.distance) return location;
    }
  }

  /** Add station somewhere on the map */
  public add(station: Station): boolean {
    const location = this.findEmptyLocation();
    this.spots.push({ ...location, station });
    return true;
  }
}
