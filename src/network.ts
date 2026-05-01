import { Station } from "./station.ts";
import { Track } from "./track.ts";
import { Train } from "./train.ts";

export class Network {
  public readonly stations: Station[] = [];
  public readonly tracks: Track[] = [];
  public readonly trains: Train[] = [];
}
