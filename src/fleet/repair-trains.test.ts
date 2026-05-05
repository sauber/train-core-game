import { assertEquals } from "@std/assert";
import { Simulation } from "../play/simulation.ts";
import { Train } from "../train/train.ts";
import type { TrainType } from "../train/train-type.ts";
import { repairTrains } from "./repair-trains.ts";

const defaultType: TrainType = {
  name: "Local",
  speed: 0.2,
  wear: 0.1,
  cost: 200,
  minimum: 1,
  maximum: 4,
};

Deno.test("No degraded trains", () => {
  const game = new Simulation();
  const train = new Train(defaultType);
  train.degraded = 0;
  game.trains.add(train);

  const result = repairTrains(game);

  assertEquals(result, false);
  assertEquals(train.degraded, 0);
  assertEquals(game.balance, 1000);
  assertEquals(game.journal.length, 0);
});

Deno.test("Repair first degraded train only", () => {
  const game = new Simulation();
  const trainA = new Train(defaultType);
  trainA.degraded = 3;
  const trainB = new Train(defaultType);
  trainB.degraded = 5;

  game.trains.add(trainA);
  game.trains.add(trainB);

  const firstResult = repairTrains(game);

  assertEquals(firstResult, true);
  assertEquals(trainA.degraded, 0);
  assertEquals(trainB.degraded, 5);
  assertEquals(game.balance, 900);
  assertEquals(game.journal.length, 1);
  assertEquals(game.journal[0].message, "Local train repaired");
  assertEquals(game.journal[0].transaction, -100);

  const secondResult = repairTrains(game);

  assertEquals(secondResult, true);
  assertEquals(trainB.degraded, 0);
  assertEquals(game.balance, 800);
  assertEquals(game.journal.length, 2);
});

Deno.test("Repair cost has a minimum of one", () => {
  const game = new Simulation();
  const cheapType: TrainType = {
    name: "Mini",
    speed: 0.1,
    wear: 0.05,
    cost: 1,
    minimum: 1,
    maximum: 2,
  };
  const train = new Train(cheapType);
  train.degraded = 4;
  game.trains.add(train);

  const result = repairTrains(game);

  assertEquals(result, true);
  assertEquals(train.degraded, 0);
  assertEquals(game.balance, 999);
  assertEquals(game.journal.length, 1);
  assertEquals(game.journal[0].transaction, -1);
});
