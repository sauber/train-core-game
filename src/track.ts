import type { Station } from "./station.ts";

export class Track {
  constructor(public readonly stations: [Station, Station]) {}
}
