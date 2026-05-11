import type { iSimulation } from "../types.ts";

export function renderJournal(sim: iSimulation, maxEntries = 3): string[] {
  const events = sim.journal.slice(-maxEntries).map(
    (entry: { tick: number; message: string; balance?: number }) => {
      const balanceText = entry.balance !== undefined
        ? ` balance=${entry.balance}`
        : "";
      return `Tick ${entry.tick}: ${entry.message}${balanceText}`;
    },
  );

  // Ensure exactly maxEntries lines, padding with empty strings
  return Array.from({ length: maxEntries }, (_, i) => events[i] || "");
}
