import { CharPlot } from "@sauber/widgets";
import { frameLayer } from "./frame-layer.ts";
import { assertEquals } from "@std/assert";

Deno.test("Frame Layer", () => {
  const canvas = new CharPlot();
  frameLayer(canvas, 3, 3);
  assertEquals(canvas.toString(), "╭─╮\n│ │\n╰─╯");
});
