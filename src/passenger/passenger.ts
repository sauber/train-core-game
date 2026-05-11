import type {
  iPassenger,
  iRoute,
  iStation,
  iTrain,
  PassengerLocation,
} from "../types.ts";

/** A traveler from station trying to reach another destination */
export class Passenger implements iPassenger {
  /** Current location of passenger */
  public location: PassengerLocation;

  constructor(
    /** Travel origin */
    public readonly origin: iStation,
    /** Travel destination  */
    public readonly destination: iStation,
    /** The path passenger wants to take */
    public readonly route: iRoute,
  ) {
    this.location = origin;
  }

  /** Move passenger from station to train */
  public board(train: iTrain): boolean {
    this.location = train;
    return true;
  }

  /** Move passenger from train to station */
  public disembark(station: iStation): boolean {
    this.location = station;
    return true;
  }
}
