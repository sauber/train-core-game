import type { iFleet, iTrain } from "../types.ts";

export class Fleet implements iFleet {
  private _trains = new Set<iTrain>();

  public addTrain(train: iTrain): boolean {
    this._trains.add(train);
    return true;
  }

  public delTrain(train: iTrain): boolean {
    return this._trains.delete(train);
  }

  public get size(): number {
    return this._trains.size;
  }

  public get trains(): Set<iTrain> {
    return new Set<iTrain>([...this._trains]);
  }
}
