import { assertEquals, assertInstanceOf } from "@std/assert";
import { Simulation } from "../simulation/simulation.ts";
import { renderMap } from "./dashboard.ts";
import { Station } from "../station/mod.ts";
import { Track } from "../track/mod.ts";
import { Train } from "../train/mod.ts";

Deno.test("Render ASCII map with stations, track and trains", () => {
  const game = new Simulation();
  const stationA = new Station("Rosbo", { x: 0, y: 0 }, 1);
  const stationB = new Station("Skærbølle", { x: 1000, y: 600 }, 1);

  game.area.stations.add(stationA);
  game.area.stations.add(stationB);

  const track = new Track(stationA, stationB);
  const trackAddResult = track.add(game);
  assertEquals(trackAddResult, true);

  const train = new Train([...game.trainTypes][0]);
  const trainAddResult = train.add(game, stationA);
  assertEquals(trainAddResult, true);

  game.event("Built track from Rosbo to Skærbølle");
  game.event("Inserted train at Rosbo", 0);

  const _map = renderMap(game, { width: 40, height: 12 });
});
