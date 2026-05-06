import { assertEquals } from "@std/assert";
import { trackLayer } from "./track-layer.ts";
import { Simulation } from "../simulation/simulation.ts";
import { Station } from "../station/mod.ts";
import { Track } from "../track/mod.ts";
import { CharPlot } from "@sauber/widgets";

Deno.test("track layer draws tracks", () => {
  const game = new Simulation();
  const stationA = new Station("A", { x: 0, y: 0 }, 1);
  const stationB = new Station("B", { x: 1000, y: 600 }, 1);
  game.area.stations.add(stationA);
  game.area.stations.add(stationB);

  const track = new Track(stationA, stationB);
  track.add(game);

  const canvas = new CharPlot();
  trackLayer(canvas, 20, 20, game);

  // Verify the canvas has been modified (track should be drawn)
  const output = canvas.toString();
  // Should contain some non-space characters (Braille characters)
  const hasNonSpace = output.split("").some((char) =>
    char !== " " && char !== "\n"
  );
  assertEquals(hasNonSpace, true);
});
