import { assertEquals } from "@std/assert";
import { Station } from "./station.ts";

Deno.test("Init", () => {
  const station = new Station("Alice");
  assertEquals(station.name, "Alice");
});
