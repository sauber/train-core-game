import { assertEquals, assertStringIncludes } from "@std/assert";
import { areaAgent } from "./area-agent.ts";
import { Simulation } from "../play/simulation.ts";

Deno.test("Area agent builds one station per tick", () => {
  const game = new Simulation({ balance: 1000 });

  assertEquals(game.stations.size, 0);
  areaAgent(game);

  assertEquals(game.stations.size, 1);
  assertEquals(game.journal.length, 1);
  assertStringIncludes(game.journal[0].message, "station built");

  areaAgent(game);
  assertEquals(game.stations.size, 2);
  assertEquals(game.journal.length, 2);
});
