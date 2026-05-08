/**
 * Abstract Lifecycle class providing common functionality for creating and destroying
 * game objects. All concrete lifecycles must extend this class and implement the
 * `spawn` and `destroy` methods.
 *
 * The class ensures:
 *   - All actions are recorded in the Simulation journal via `game.event()`.
 *   - Payments are deducted from the Simulation balance when spawning objects.
 *   - Revenue is added to the balance when destroying objects (if applicable).
 *   - Relationship integrity checks can be performed before mutating state.
 */
import type { Simulation } from "../simulation/mod.ts";

export abstract class Lifecycle<T> {
  /** Reference to the simulation instance */
  protected readonly game: Simulation;

  constructor(game: Simulation) {
    this.game = game;
  }

  /** Spawn a new object of type T. Implementations must log the event and
   * optionally adjust the balance.
   */
  abstract spawn(...args: unknown[]): T;

  /** Destroy an existing object of type T. Implementations must log the event
   * and optionally adjust the balance (e.g., revenue from selling).
   */
  abstract destroy(obj: T, ...args: unknown[]): void;
}
