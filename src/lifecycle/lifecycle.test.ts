import { assertEquals, assertThrows } from "@std/assert";
import { Simulation } from "../simulation/mod.ts";
import { Lifecycle } from "./lifecycle.ts";

// Mock object type for testing
interface TestObject {
  id: number;
  name: string;
}

// Concrete implementation for testing
class TestLifecycle extends Lifecycle<TestObject> {
  spawn(...args: unknown[]): TestObject {
    const id = args[0] as number;
    const name = args[1] as string;
    // Log event and deduct cost
    this.game.event(`Spawned object ${name}`, -100);
    return { id, name };
  }

  destroy(obj: TestObject, ...args: unknown[]): void {
    // Log event and add revenue
    this.game.event(`Destroyed object ${obj.name}`, 50);
  }
}

Deno.test("Lifecycle - concrete implementation can spawn objects", () => {
  const game = new Simulation({ balance: 1000 });
  const lifecycle = new TestLifecycle(game);

  const obj = lifecycle.spawn(1, "TestObject");

  assertEquals(obj.id, 1);
  assertEquals(obj.name, "TestObject");
  assertEquals(game.balance, 900); // 1000 - 100
  assertEquals(game.journal.length, 1);
  assertEquals(game.journal[0].message, "Spawned object TestObject");
  assertEquals(game.journal[0].transaction, -100);
});

Deno.test("Lifecycle - concrete implementation can destroy objects", () => {
  const game = new Simulation({ balance: 1000 });
  const lifecycle = new TestLifecycle(game);

  const obj = { id: 1, name: "TestObject" } as TestObject;
  lifecycle.destroy(obj);

  assertEquals(game.balance, 1050); // 1000 + 50
  assertEquals(game.journal.length, 1);
  assertEquals(game.journal[0].message, "Destroyed object TestObject");
  assertEquals(game.journal[0].transaction, 50);
});

Deno.test("Lifecycle - journal entries include tick", () => {
  const game = new Simulation({ balance: 1000, tick: 5 });
  const lifecycle = new TestLifecycle(game);

  lifecycle.spawn(1, "TestObject");

  assertEquals(game.journal[0].tick, 5);
});

Deno.test("Lifecycle - insufficient balance throws error", () => {
  const game = new Simulation({ balance: 50 });
  const lifecycle = new TestLifecycle(game);

  assertThrows(
    () => {
      lifecycle.spawn(1, "ExpensiveObject");
    },
    Error,
    "Negative balance",
  );
});
