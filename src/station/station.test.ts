import { assertEquals, assertThrows } from "@std/assert";
import { Station } from "./station.ts";
import type { iPassenger, iTrack, iTrain, Location } from "../types.ts";

/** Test cases for "./station.ts"
Confirm requirements are met:
- Has a Name
- Has a Location
- Can add and remove Trains
- Can add and remove Tracks
- Can add and remove Passengers
- Can report number of free capacity for Trains
- Increments transits when passengers board or disembark
*/

Deno.test("Station Name", () => {
  const location: Location = { x: 0, y: 0 };
  const station = new Station("Test Station", location, 1);
  assertEquals(station.name, "Test Station");
});

Deno.test("Station Location", () => {
  const location: Location = { x: 0, y: 0 };
  const station = new Station("Test Station", location, 1);
  assertEquals(station.location, location);
});

Deno.test("Station Tracks", () => {
  const location: Location = { x: 0, y: 0 };
  const station = new Station("Test Station", location, 1);
  assertEquals(station.numTrack(), 0);

  // Add Track, confirm NumTrack increase
  const track = {} as iTrack;
  station.addTrack(track);
  assertEquals(station.numTrack(), 1);

  // Remove Track, confirm NumTrack decrease
  station.delTrack(track);
  assertEquals(station.numTrack(), 0);
});

Deno.test("Station Trains", () => {
  const location: Location = { x: 0, y: 0 };
  const station = new Station("Test Station", location, 1);
  const train = {} as iTrain;

  assertEquals(station.numTrain(), 0);
  assertEquals(station.isFull, false);

  station.addTrain(train);
  assertEquals(station.numTrain(), 1);
  assertEquals(station.isFull, true);

  // Should throw when adding beyond capacity
  assertThrows(
    () => station.addTrain({} as iTrain),
    Error,
    "No platforms available",
  );

  station.delTrain(train);
  assertEquals(station.numTrain(), 0);
  assertEquals(station.isFull, false);
});

Deno.test("Station Passengers and Transits", () => {
  const location: Location = { x: 0, y: 0 };
  const station = new Station("Test Station", location, 1);
  const passenger = {} as iPassenger;

  assertEquals(station.numPassenger(), 0);
  assertEquals(station.transits, 0);

  // Adding passenger increments transits
  station.addPassenger(passenger);
  assertEquals(station.numPassenger(), 1);
  assertEquals(station.transits, 1);

  // Removing passenger increments transits again
  station.delPassenger(passenger);
  assertEquals(station.numPassenger(), 0);
  assertEquals(station.transits, 2);
});
