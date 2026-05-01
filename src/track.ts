import { Station } from "./station.ts";

export class Track {
  constructor(readonly stations: [Station, Station]) {}
}
