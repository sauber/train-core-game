// import type { Simulation } from "../simulation/mod.ts";
// import { trackRepairCost } from "../track/mod.ts";

// /** Repair a degraded track */
// export function repairTracks(game: Simulation): boolean {
//   for (const track of game.tracks) {
//     if (track.wear <= 0) continue;

//     const cost = trackRepairCost(game, track);
//     if (cost > game.balance) continue;

//     track.wear = 0;
//     const [first, second] = Array.from(track.stations);
//     game.event(
//       `Track repaired between ${first.name} and ${second.name}`,
//       -cost,
//     );
//     return true;
//   }

//   return false;
// }
