/** WearRatio is percentage decline per tick.
 * For example if WearRate = 1, then object declines from Optimal to Broken in 100 ticks.
 */
export type WearRatio = number;

/** Currrent wear of object, from Optimal (Wear=0) to Broken (Wear>=1) */
export type Wear = number;
export type Optimal = 0;
export type Broken = 1;
