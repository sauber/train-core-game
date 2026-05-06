import type { Simulation } from "../simulation/simulation.ts";

export function renderJournal(game: Simulation, maxEntries = 3): string[] {
  const events = game.journal.slice(-maxEntries).map((entry: { tick: number; message: string; balance?: number }) => {
    const balanceText = entry.balance !== undefined
      ? ` balance=${entry.balance}`
      : "";
    return `Tick ${entry.tick}: ${entry.message}${balanceText}`;
  });

  // Ensure exactly maxEntries lines, padding with empty strings
  return Array.from({ length: maxEntries }, (_, i) => events[i] || "");
}
