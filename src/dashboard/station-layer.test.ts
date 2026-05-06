import { assertEquals } from "@std/assert";
import { stationLayer } from "./station-layer.ts";
import { Simulation } from "../simulation/simulation.ts";
import { Station } from "../station/mod.ts";
import { CharPlot } from "@sauber/widgets";

Deno.test("station layer draws station labels", () => {
  const game = new Simulation();
  const station = new Station("Test", { x: 0, y: 0 }, 1);
  game.area.stations.add(station);

  const canvas = new CharPlot();
  stationLayer(canvas, 10, 10, game);

  // Verify the canvas has been modified (station label should be drawn)
  const output = canvas.toString();
  // The station name "Test" should appear somewhere in the output
  assertEquals(output.includes("Test"), true);
});
