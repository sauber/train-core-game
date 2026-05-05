import { assertEquals, assertStringIncludes } from "@std/assert";
import { createStation } from "../station/mod.ts";
import { trackAgent } from "../track/mod.ts";
import { Simulation } from "../simulation/mod.ts";

Deno.test("Track agent connects one unconnected station", () => {
  const game = new Simulation({ balance: 1000 });
  const stationA = createStation(game);
  const stationB = createStation(game);

  assertEquals(game.tracks.size, 0);

  trackAgent(game);

  assertEquals(game.tracks.size, 1);
  assertEquals(stationA.tracks.size + stationB.tracks.size, 2);
  assertEquals(game.journal.length, 1);
  assertStringIncludes(game.journal[0].message, "Track built from ");
});
