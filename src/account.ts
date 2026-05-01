export type Transaction = {
  type: "purchase" | "income" | "other";
  amount: number;
  timestamp: number;
};

export class Account {
  private journal: Transaction[] = [];

  constructor(public balance: number) {
    if (balance < 0) {
      throw new Error("Initial balance cannot be negative");
    }
  }

  /**
   * Record a transaction of a given type and amount. Amounts are positive.
   */
  private record(type: Transaction["type"], amount: number) {
    this.journal.push({ type, amount, timestamp: Date.now() });
  }

  /**
   * Spend amount from account if sufficient funds exist.
   */
  spend(amount: number): void {
    if (amount <= 0) {
      throw new Error("Spend amount must be positive");
    }
    if (this.balance - amount < 0) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
    this.record("purchase", amount);
  }

  /**
   * Add income to balance.
   */
  addIncome(amount: number): void {
    if (amount <= 0) {
      throw new Error("Income amount must be positive");
    }
    this.balance += amount;
    this.record("income", amount);
  }

  /**
   * Return a copy of the transaction log.
   */
  getJournal(): ReadonlyArray<Transaction> {
    return [...this.journal];
  }
}
