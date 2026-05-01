import { assertEquals } from "@std/assert";
import { Network } from "./network.ts";

Deno.test("Init Network", () => {
  const network = new Network();
  assertEquals(network.stations, []);
  assertEquals(network.tracks, []);
  assertEquals(network.trains, []);
});
