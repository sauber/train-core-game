import { assertEquals, assertInstanceOf } from "@std/assert";
import type { Location } from "../types.ts";
import { Station } from "./station.ts";
import { createStation } from "./create-station.ts";

Deno.test("Create Station", () => {
  const location: Location = { x: 0, y: 0 };
  const station = createStation(location);
  assertEquals(station.location, location);
  assertInstanceOf(station, Station);
});
