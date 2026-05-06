import { assertEquals } from "@std/assert";
import { createTrackLayer } from "./track-layer.ts";
import { Simulation } from "../simulation/simulation.ts";
import { Station } from "../station/mod.ts";
import { Track } from "../track/mod.ts";

Deno.test("track layer creates pixels", () => {
  const game = new Simulation();
  const stationA = new Station("A", { x: 0, y: 0 }, 1);
  const stationB = new Station("B", { x: 10, y: 10 }, 1);
  game.area.stations.add(stationA);
  game.area.stations.add(stationB);
  
  const track = new Track(stationA, stationB);
  track.add(game);
  
  const stationPositions = new Map();
  stationPositions.set(stationA, { x: 0, y: 0 });
  stationPositions.set(stationB, { x: 10, y: 10 });
  
  const { pixels, trainCellMap } = createTrackLayer(
    game,
    stationPositions,
    20,
    20,
  );
  
  assertEquals(pixels.length, 20);
  assertEquals(pixels[0].length, 20);
  assertEquals(trainCellMap.size, 0);
});
