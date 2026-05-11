import { assertEquals, assertInstanceOf, assertThrows } from "@std/assert";
import { Area } from "./area.ts";
import type { Location } from "../types.ts";
import { createStation } from "../station/mod.ts";

Deno.test("Init Area", () => {
  const width = 10;
  const height = 20;
  const area = new Area({ width, height });
  assertInstanceOf(area, Area);
  assertEquals(area.width, width);
  assertEquals(area.height, height);
});

Deno.test("Add Station", () => {
  // Add a stations until maximum
  const area = new Area();
  for (let i = 0; i < area.maxStations; i++) {
    const loc: Location = area.findLocation();
    const st = createStation(loc);
    area.addStation(st);
  }

  // Add stations beyond maximum
  const loc: Location = area.findLocation();
  const st = createStation(loc);
  assertThrows(() => area.addStation(st));
});
