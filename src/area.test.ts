import { assertEquals } from "@std/assert";
import { Area } from "./area.ts";

Deno.test("Init Area", () => {
  const area = new Area(100, 100, 10, 5);
  assertEquals(area.width, 100);
  assertEquals(area.height, 100);
  assertEquals(area.distance, 10);
  assertEquals(area.margin, 5);
});
