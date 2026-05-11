import { assertEquals } from "@std/assert";
import type { Distance, Location } from "../types.ts";
import { distance } from "./distance.ts";

Deno.test("distance", () => {
  const a: Location = { x: 1, y: 1 };
  const b: Location = { x: 4, y: 5 };
  const d: Distance = distance(a, b);
  assertEquals(d, 5);
});
