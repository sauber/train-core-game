import { assertEquals, assertFalse } from "@std/assert";
import { Population } from "./population.ts";
import type { iPassenger, iStation, iRoute, iTrain } from "../types.ts";

// Helper to create mock passengers
function createMockPassenger(
  originName: string,
  destName: string,
): iPassenger {
  const origin = { name: originName } as iStation;
  const destination = { name: destName } as iStation;
  const route = {} as iRoute;
  return {
    origin,
    destination,
    location: origin,
    route,
    board(_train: iTrain): boolean {
      return true;
    },
    disembark(_station: iStation): boolean {
      return true;
    },
  };
}

let population: Population;
let passengerA: iPassenger;
let passengerB: iPassenger;
let passengerC: iPassenger;

// Setup before each test
const setup = () => {
  population = new Population();
  passengerA = createMockPassenger("StationA", "StationB");
  passengerB = createMockPassenger("StationC", "StationD");
  passengerC = createMockPassenger("StationE", "StationF");
};

Deno.test("Population initial size is 0", () => {
  setup();
  assertEquals(population.size, 0);
});

Deno.test("Population.addPassenger adds a passenger and returns true", () => {
  setup();
  const result = population.addPassenger(passengerA);
  assertEquals(result, true);
  assertEquals(population.size, 1);
});

Deno.test("Population.addPassenger adds multiple distinct passengers", () => {
  setup();
  population.addPassenger(passengerA);
  population.addPassenger(passengerB);
  population.addPassenger(passengerC);
  assertEquals(population.size, 3);
});

Deno.test("Population.addPassenger does not increase size for same passenger reference", () => {
  setup();
  population.addPassenger(passengerA);
  const result = population.addPassenger(passengerA);
  assertEquals(result, true); // Method always returns true
  assertEquals(population.size, 1);
});

Deno.test("Population.delPassenger removes an existing passenger and returns true", () => {
  setup();
  population.addPassenger(passengerA);
  const result = population.delPassenger(passengerA);
  assertEquals(result, true);
  assertEquals(population.size, 0);
});

Deno.test("Population.delPassenger returns false when passenger not in population", () => {
  setup();
  const result = population.delPassenger(passengerA);
  assertFalse(result);
  assertEquals(population.size, 0);
});

Deno.test("Population.delPassenger does not remove a different passenger", () => {
  setup();
  population.addPassenger(passengerA);
  const result = population.delPassenger(passengerB);
  assertFalse(result);
  assertEquals(population.size, 1);
});

Deno.test("Population.size reflects add and remove operations", () => {
  setup();
  assertEquals(population.size, 0);

  population.addPassenger(passengerA);
  assertEquals(population.size, 1);

  population.addPassenger(passengerB);
  assertEquals(population.size, 2);

  population.delPassenger(passengerA);
  assertEquals(population.size, 1);

  population.delPassenger(passengerB);
  assertEquals(population.size, 0);
});

Deno.test("Population handles add and del intermixed correctly", () => {
  setup();
  population.addPassenger(passengerA);
  population.addPassenger(passengerB);
  assertEquals(population.size, 2);

  population.delPassenger(passengerA);
  assertEquals(population.size, 1);

  population.addPassenger(passengerC);
  assertEquals(population.size, 2);

  population.delPassenger(passengerB);
  assertEquals(population.size, 1);

  population.delPassenger(passengerC);
  assertEquals(population.size, 0);
});