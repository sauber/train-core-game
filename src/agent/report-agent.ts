import type { Agent, Simulation } from "../play/simulation.ts";

/** Write to console events which happened at current tick */
export const reportAgent: Agent = (game: Simulation) => {
  const events = game.journal.filter((e) => e.tick == game.tick);
  if (events.length > 0) {
    // console.log(`Tick ${game.tick}`);
    for (const event of events) {
      const amount: number | undefined = event.transaction;
      const balance: number | undefined = event.balance;
      if (amount && balance) {
        const calc = `${balance - amount}${
          amount < 0 ? amount : "+" + amount
        }=${balance}`;
        console.log(game.tick, event.message, calc);
      } else {
        console.log(
          game.tick,
          event.message,
        );
      }
    }
  }
};
