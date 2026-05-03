import { assertEquals } from "@std/assert";
import { Station } from "./station.ts";
import type { TrainType } from "./train-type.ts";

Deno.test("Station Init", () => {
  const station = new Station("Alice", { x: 0, y: 0 }, 1);
  assertEquals(station.name, "Alice");
  assertEquals(station.availablePlatforms, 1);
  assertEquals(station.trains.size, 0);
  assertEquals(station.tracks.size, 0);
  assertEquals(station.passengers.size, 0);
});

Deno.test("Station add train", () => {
  const station = new Station("Alice", { x: 0, y: 0 }, 1);
  const express: TrainType = {
    name: "Express",
    speed: 100,
    wear: 10,
    cost: 1000,
    minimum: 50,
    maximum: 200,
  };
  const train = {
    type: express,
    passengers: [],
  };
  station.addTrain(train);
  assertEquals(station.availablePlatforms, 0);
});
