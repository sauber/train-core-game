import { assertInstanceOf } from "@std/assert";
import { Area } from "./area.ts";

/** Test cases for "./area.ts"
Confirm requirements are met:
- Has positive width and height
- Can add Stations
- Can find empty spot for Station
*/

Deno.test("Init Area", () => {
  const area = new Area();
  assertInstanceOf(area, Area);
});
