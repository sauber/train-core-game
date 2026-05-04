import { assertEquals, assertStringIncludes } from "@std/assert";
import { createStation } from "../factory/create-station.ts";
import { createTrack } from "../track/create-track.ts";
import { networkAgent } from "./network-agent.ts";
import { Simulation } from "../play/simulation.ts";

Deno.test("Network agent inserts a train into a connected network", () => {
  const game = new Simulation({ balance: 1000 });
  const stationA = createStation(game);
  const stationB = createStation(game);

  createTrack(game, stationA, stationB);
  assertEquals(game.trains.size, 0);

  networkAgent(game);

  assertEquals(game.trains.size, 1);
  assertEquals(game.journal.length, 1);
  assertStringIncludes(game.journal[0].message, "train inserted in ");
});
