import {
  assertEquals,
  assertGreaterOrEqual,
  assertNotEquals,
} from "@std/assert";
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

Deno.test("Several uniq names", { ignore: true }, () => {
  const size = 25;
  const stations = new Set<string>();
  for (let i = 0; i < size; i++) {
    stations.add(createStationName());
  }
  console.log(stations);
  assertEquals(stations.size, size);
});
