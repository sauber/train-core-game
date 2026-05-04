import { assertEquals } from "@std/assert";
import type { TrainType } from "./train-type.ts";
import { Train } from "./train.ts";

Deno.test("Init train", () => {
  const type: TrainType = {
    name: "Express",
    speed: 100,
    wear: 10,
    cost: 1000,
    minimum: 50,
    maximum: 200,
  };
  const train = new Train(type);
  assertEquals(train.type, type);
});
