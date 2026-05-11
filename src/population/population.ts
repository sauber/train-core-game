import type { iPassenger, iPopulation } from "../types.ts";

export class Population implements iPopulation {
  private passengers = new Set<iPassenger>();

  public get size(): number {
    return this.passengers.size;
  }

  public addPassenger(passenger: iPassenger): boolean {
    this.passengers.add(passenger);
    return true;
  }

  public delPassenger(passenger: iPassenger): boolean {
    return this.passengers.delete(passenger);
  }
}
