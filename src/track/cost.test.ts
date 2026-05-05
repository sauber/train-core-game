import { assertEquals } from "@std/assert";
import { Simulation } from "../simulation/mod.ts";
import { Track } from "./mod.ts";
import {
  trackBuildCost,
  trackBuildUnitCost,
  trackRepairCost,
  trackRepairUnitCost,
} from "./mod.ts";

Deno.test("build and repair cost formulas use track distance and game state", () => {
  const game = new Simulation();
  const stationA = game.area.createStation("A", 1);
  const stationB = game.area.createStation("B", 1);
  const track = new Track(stationA, stationB);

  const expectedUnit = game.initialBalance / game.area.width;
  assertEquals(trackBuildUnitCost(game), expectedUnit);
  assertEquals(
    trackBuildCost(game, track),
    Math.max(1, Math.round(track.distance * expectedUnit)),
  );

  track.degraded = 2;
  assertEquals(trackRepairUnitCost(game), expectedUnit * 0.25);
  assertEquals(
    trackRepairCost(game, track),
    Math.max(
      1,
      Math.round(track.distance * trackRepairUnitCost(game) * track.degraded),
    ),
  );
});
