import { type Station, Stations } from "../station/station.ts";
import { Tracks } from "../track/track.ts";
import { Trains } from "../train/train.ts";

/** From one stations, create a list of recursively all possible destination stations */
function destinations(
  station: Station,
  stations: Stations = new Stations(Infinity, [station]),
): Stations {
  station.tracks.forEach((track) => {
    const other: Station = track.otherStation(station);
    if (!stations.has(other)) {
      stations.add(other);
      destinations(other, stations);
    }
  });
  return stations;
}

/** A network of connected stations */
export class Network {
  public readonly stations: Stations = new Stations();
  public readonly tracks: Tracks = new Tracks();

  constructor(station: Station) {
    // All stations
    this.stations = destinations(station);

    // All tracks
    for (const station of this.stations) {
      for (const track of station.tracks) {
        this.tracks.add(track);
      }
    }
  }

  /** Trains in the network, either at stations or on tracks */
  public get trains(): Trains {
    const trains: Trains = new Trains(Infinity);

    // Trains at stations
    for (const station of this.stations) {
      for (const train of station.trains) {
        trains.add(train);
      }
    }

    // Trains on tracks
    for (const track of this.tracks) {
      for (const train of track.trains) {
        trains.add(train);
      }
    }

    return trains;
  }
}

export type Networks = Set<Network>;
