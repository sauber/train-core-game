import type { Station, Stations } from "../station/station.ts";
import type { Track, Tracks } from "../track/track.ts";
import type { Train, Trains } from "../train/train.ts";

/** From one stations, create a list of recursively all possible destination stations */
function destinations(
  station: Station,
  stations: Stations = new Set<Station>([station]),
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
  public readonly stations: Stations = new Set<Station>();
  public readonly tracks: Tracks = new Set<Track>();

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
    const trains: Trains = new Set<Train>();

    // Trains at stations
    for (const station of this.stations) {
      for (const train of station.trains) {
        trains.add(train);
      }
    }

    // Trains on tracks
    for (const track of this.tracks) {
      if (track.train) trains.add(track.train);
    }

    return trains;
  }
}
