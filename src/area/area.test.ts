import { assertInstanceOf } from "@std/assert";
import { Area } from "./area.ts";

Deno.test("Init Area", () => {
  const area = new Area();
  assertInstanceOf(area, Area);
});
