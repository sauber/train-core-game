import { Fleet } from './fleet.ts';
import { assertEquals, assertFalse } from '@std/assert';

let fleet: Fleet;
let mockTrain1: any;
let mockTrain2: any;

// Setup before each test
const setup = () => {
  fleet = new Fleet();
  // Create distinct mock trains that satisfy iTrain interface
  // Since Fleet only uses trains as Set entries (by reference), we can use simple objects
  mockTrain1 = { id: 1 };
  mockTrain2 = { id: 2 };
};

Deno.test('Fleet.addTrain should add a train and return true', () => {
  setup();
  const result = fleet.addTrain(mockTrain1);
  assertEquals(result, true);
  assertEquals(fleet.size, 1);
});

Deno.test('Fleet.addTrain should not increase size when adding duplicate train (same reference)', () => {
  setup();
  fleet.addTrain(mockTrain1);
  const result = fleet.addTrain(mockTrain1);
  assertEquals(result, true); // Method always returns true
  assertEquals(fleet.size, 1);
});

Deno.test('Fleet.addTrain should add multiple distinct trains', () => {
  setup();
  fleet.addTrain(mockTrain1);
  fleet.addTrain(mockTrain2);
  assertEquals(fleet.size, 2);
});

Deno.test('Fleet.delTrain should remove an existing train and return true', () => {
  setup();
  fleet.addTrain(mockTrain1);
  const result = fleet.delTrain(mockTrain1);
  assertEquals(result, true);
  assertEquals(fleet.size, 0);
});

Deno.test('Fleet.delTrain should return false when removing non-existing train', () => {
  setup();
  const result = fleet.delTrain(mockTrain1);
  assertFalse(result);
  assertEquals(fleet.size, 0);
});

Deno.test('Fleet.delTrain should not remove a different train', () => {
  setup();
  fleet.addTrain(mockTrain1);
  const result = fleet.delTrain(mockTrain2);
  assertFalse(result);
  assertEquals(fleet.size, 1);
});

Deno.test('Fleet.size getter should return 0 for empty fleet', () => {
  setup();
  assertEquals(fleet.size, 0);
});

Deno.test('Fleet.size getter should return correct count after add/remove operations', () => {
  setup();
  assertEquals(fleet.size, 0);
  fleet.addTrain(mockTrain1);
  assertEquals(fleet.size, 1);
  fleet.addTrain(mockTrain2);
  assertEquals(fleet.size, 2);
  fleet.delTrain(mockTrain1);
  assertEquals(fleet.size, 1);
  fleet.delTrain(mockTrain2);
  assertEquals(fleet.size, 0);
});

Deno.test('Fleet.trains getter should return a set containing all trains', () => {
  setup();
  fleet.addTrain(mockTrain1);
  fleet.addTrain(mockTrain2);
  const trainsSet = fleet.trains;
  assertEquals(trainsSet.size, 2);
  assertEquals(trainsSet.has(mockTrain1), true);
  assertEquals(trainsSet.has(mockTrain2), true);
});

Deno.test('Fleet.trains getter should return a new set instance each time', () => {
  setup();
  fleet.addTrain(mockTrain1);
  const firstSet = fleet.trains;
  const secondSet = fleet.trains;
  assertEquals(firstSet === secondSet, false); // Different objects
});

Deno.test('Fleet.trains getter should not allow modification of internal set via returned set', () => {
  setup();
  fleet.addTrain(mockTrain1);
  const trainsSet = fleet.trains;
  trainsSet.add(mockTrain2); // Add to returned set
  assertEquals(fleet.size, 1); // Internal set unchanged
});