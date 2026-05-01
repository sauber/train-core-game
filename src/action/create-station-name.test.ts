import { assertGreaterOrEqual, assertNotEquals } from "@std/assert";
import { createStationName } from "./create-station-name.ts";

Deno.test("Create station name", () => {
  const name = createStationName();
  assertGreaterOrEqual(name.length, 4);
});

Deno.test("Uniq station names", () => {
  const n1 = createStationName();
  const n2 = createStationName();
  assertNotEquals(n1, n2);
});
