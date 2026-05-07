// Test for activity counter increment on passenger boarding
import { assertEquals } from "@std/assert";
import { Station } from "./station.ts";
import { Train } from "../train/mod.ts";
import { Passenger } from "../passenger/mod.ts";

Deno.test("Station activity increments on passenger boarding", () => {
  const station = new Station("A", { x: 0, y: 0 }, 2);
  const destination = new Station("B", { x: 10, y: 10 }, 2);

  // Create a passenger at the station wanting to go to destination
  const passenger = new Passenger(station, destination);

  // Create a train at the station
  const train = new Train({
    name: "Local",
    speed: 20,
    wear: 0.1,
    cost: 200,
    minimum: 1,
    maximum: 4,
  });

  // Initially activity should be 0
  assertEquals(station.activity, 0, "Activity should start at 0");

  // Simulate boarding: passenger moves from station to train
  station.passengers.delete(passenger);
  train.passengers.add(passenger);

  // Increment activity for boarding
  station.activity++;

  assertEquals(station.activity, 1, "Activity should increment on boarding");
});
