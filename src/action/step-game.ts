import type { State } from "../entity/state.ts";

// Increasing ticks throughout the game
export type Tick = number;

/** Automatic tasks to perform at each tick in game */
export function stepGame(state: State, tick: Tick): void {
  // TODO
  // Game:
  // - Increase tick
  // - Gameover?
  // - Adjust phase
  // Station:
  // - Adjust platforms
  // - Create
  // Track:
  // - Degrade
  // Train:
  // - Degrade
  // - Arrive
  // - Move
  // - Depart
  // - Set Route
  // Passenger
  // - Create
  // - Board
  // - Disembark
  // - Exit (=Pay)
}
