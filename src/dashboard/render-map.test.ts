import { assertEquals, assertStringIncludes } from "@std/assert";
import { Simulation } from "../simulation/simulation.ts";
import { renderMap } from "../dashboard/render-map.ts";
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

  const map = renderMap(game, { width: 40, height: 12 });

  assertStringIncludes(map, "Rosbo");
  assertStringIncludes(map, "Skærbølle");
  assertStringIncludes(map, "Stations: Rosbo(1) Skærbølle(0)");
  assertStringIncludes(map, "Tracks: Rosbo-Skærbølle(0)");
  assertStringIncludes(map, "Balance: 1000");
  assertStringIncludes(map, "Tick 0: Built track from Rosbo to Skærbølle");
  assertStringIncludes(map, "Tick 0: Inserted train at Rosbo");
  console.log(map);
});
