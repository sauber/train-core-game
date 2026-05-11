import { assertInstanceOf } from "@std/assert";
import { createArea } from "./create-area.ts";
import { Area } from "./area.ts";
import type { iArea } from "../types.ts";

Deno.test("create area", () => {
  const area: iArea = createArea();
  assertInstanceOf(area, Area);
});
