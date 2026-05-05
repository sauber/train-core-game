import { Station, Stations } from "../station/mod.ts";

export type Distance = number;

// A coordinate on the map
export type Location = {
  x: number;
  y: number;
};

// Distance between two locations
export function distance(a: Location, b: Location): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

/** Game map */
export class Area {
  public readonly stations: Stations = new Stations();

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

  // What is the shortest distance from a location to any existing stations
  private shortestDistance(location: Location): number {
    let shortest = Infinity;
    this.stations.forEach((station: Station) => {
      const dist = distance(location, station.location);
      if (dist < shortest) shortest = dist;
    });
    return shortest;
  }

  // Find a random location on the map with minimum distance to existing stations
  private findEmptyLocation(): Location {
    // TODO: Fail after maximum number of tries
    while (true) {
      const location: Location = this.randomLocation();
      const distance = this.shortestDistance(location);
      if (distance >= this.distance) return location;
    }
  }

  /** Add station somewhere on the map */
  public createStation(name: string, platforms: number): Station {
    const location = this.findEmptyLocation();
    const station = new Station(name, location, platforms);
    this.stations.add(station);
    return station;
  }
}
