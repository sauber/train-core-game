import type { Distance, Location } from "../types.ts";

/** Distance between two locations  */
export function distance(a: Location, b: Location): Distance {
  return Math.ceil(Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2));
}
