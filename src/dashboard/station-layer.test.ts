import { assertEquals } from "@std/assert";
import { createStationLayer } from "./station-layer.ts";
import { Simulation } from "../simulation/simulation.ts";
import { Station } from "../station/mod.ts";

Deno.test("station layer creates positions", () => {
  const game = new Simulation();
  const station = new Station("Test", { x: 0, y: 0 }, 1);
  game.area.stations.add(station);
  const { stationPositions, stationCellMap } = createStationLayer(
    game,
    10,
    10,
    1,
    1,
  );
  assertEquals(stationPositions.has(station), true);
  assertEquals(stationCellMap.size, 1);
});
