/** An extension of native Set but with a maximum limit of items */
export class LimitSet<T> extends Set<T> {
  constructor(
    public limit: number,
    values?: readonly T[] | null,
  ) {
    super(values);
    if (this.size > this.limit) {
      throw new Error(`LimitSet exceeded initial limit of ${this.limit}`);
    }
  }

  /** Add item to set if limit is not reached */
  public override add(value: T): this {
    if (this.size >= this.limit && !this.has(value)) {
      return this;
    }
    super.add(value);
    return this;
  }

  /** Check if set is at capacity */
  public get isFull(): boolean {
    return this.size >= this.limit;
  }
}
