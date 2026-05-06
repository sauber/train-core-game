import { assertEquals } from "@std/assert";
import { createBrailleLayer } from "./braille-layer.ts";

Deno.test("braille layer converts pixels to braille", () => {
  const pixels = [
    [false, false, false],
    [false, true, false],
    [false, false, false],
    [false, false, false],
  ];

  const result = createBrailleLayer(pixels, 3, 1);
  assertEquals(result.length, 1);
  assertEquals(result[0].length, 3);
});
