import { assertEquals } from "@std/assert";
import type { TrainType } from "./train-type.ts";
import { Track } from "./track.ts";
import { Train } from "./train.ts";
import { Station } from "./station.ts";

Deno.test("Init train", () => {
  const type: TrainType = {
    name: "Express",
    speed: 100,
    wear: 10,
    cost: 1000,
    minimum: 50,
    maximum: 200,
  };
  const A = new Station("A");
  const B = new Station("B");
  const track = new Track([A, B]);
  const train = new Train(type, track);
  assertEquals(train.type, type);
  assertEquals(train.passengers, []);
});
