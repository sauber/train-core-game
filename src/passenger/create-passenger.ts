import type { iPassenger, iRoute, iStation } from "../types.ts";
import { Passenger } from "./passenger.ts";

/** Create passenger at random connected station */
export function createPassenger(
  a: iStation,
  b: iStation,
  r: iRoute,
): iPassenger {
  // Confirm origin and destination are not same:
  if (a == b) throw new Error("Origin and destination stations are the same");
  return new Passenger(a, b, r);
}
