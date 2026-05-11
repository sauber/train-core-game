import { assertEquals } from "@std/assert";
import type {} from "./train-type.ts";
import { Train } from "./train.ts";
import type { TrainLocation, TrainType } from "../types.ts";

Deno.test("Init train", () => {
  const type: TrainType = {
    name: "Express",
    speed: 100,
    quality: 10,
    cost: 1000,
    size: 200,
  };
  const loc = {} as TrainLocation;
  const train = new Train(type, loc);
  assertEquals(train.type, type);
});
