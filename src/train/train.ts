import {
  type iPassenger,
  type iStation,
  type iTrack,
  type iTrain,
  type TrainLocation,
  TrainState,
  type TrainType,
} from "../types.ts";
import { LimitSet } from "../utils/limitset.ts";

export class Train implements iTrain {
  /** Passengers */
  public readonly passengers: LimitSet<iPassenger>;

  /** Degraded state of train */
  public wear: number = 0;

  /** Route stations */
  public route: string[] = [];

  /** Next track to move on */
  public nextTrack: iTrack | null = null;

  /** Progress on current track (0-100) */
  public progress: number = 0;

  /** Station we departed from (set when departing) */
  private fromStation: iStation | null = null;

  constructor(
    /** Type of train */
    public readonly type: TrainType,
    public location: TrainLocation,
  ) {
    this.passengers = new LimitSet<iPassenger>(type.size);
  }

  /** Add a passenger */
  public addPassenger(passenger: iPassenger): boolean {
    if (this.passengers.isFull) return false;
    this.passengers.add(passenger);
    return true;
  }

  /** Remove a passenger */
  public delPassenger(passenger: iPassenger): boolean {
    if (!this.passengers.has(passenger)) return false;
    this.passengers.delete(passenger);
    return true;
  }

  /** Is train at capacity */
  public get isFull(): boolean {
    return this.passengers.isFull;
  }

  public get state(): TrainState {
    // Broken if wear >= 1
    if (this.wear >= 1.0) return TrainState.Broken;
    // Running if train is on track
    if ("distance" in this.location) return TrainState.Running;
    // Otherwise waiting at station
    return TrainState.Waiting;
  }

  /** Repair train (reset wear) */
  public repair(): boolean {
    this.wear = 0;
    return true;
  }

  /** Is train broken */
  public get isBroken(): boolean {
    return this.state === TrainState.Broken;
  }

  /** Move train: increment progress when running */
  public move(): boolean {
    // If train is broken, nothing moves
    if (this.wear >= 1.0) {
      return true;
    }

    if (this.state === TrainState.Running) {
      const track = this.location as iTrack;
      // Speed is reduced by wear (degradation) and inversely proportional to track distance.
      // Wear ranges from 0 (no degradation) to <1 (degraded). Higher wear => slower speed.
      // Compute effective speed: base speed * (1 - wear) / distance.
      const effectiveSpeed = (this.type.speed * (1 - this.wear)) / track.distance;
      this.progress += effectiveSpeed;
      return true;
    }

    return false;
  }

  /** Depart from station */
  public depart(): boolean {
    // Check preconditions
    if (this.passengers.size === 0) return false;
    if (this.route.length === 0) return false;
    if (!this.nextTrack) return false;
    if (this.nextTrack.isBroken) return false;
    if (this.nextTrack.isFull) return false;

    // Record departure station
    this.fromStation = this.location as iStation;

    // Set location to track, reset progress
    this.location = this.nextTrack;
    this.progress = 0;

    return true;
  }

  /** Arrive at station */
  public arrive(): boolean {
    // If already at a station (location is iStation)
    if (!("distance" in this.location)) {
      // Train is already at a station; treat as arrival with wear increment
      // Increment wear by a small amount to potentially become broken
      this.wear += 0.1;
      this.progress = 0;
      return true;
    }

    // Train is on a track
    const track = this.location as iTrack;

    // Check if we've completed the journey (progress >= 100)
    if (this.progress >= 100) {
      // Transition to waiting state at a station
      // If no stations on track, treat as arrived at a station
      if (track.stations.size === 0) {
        const dummyStation: iStation = {
          name: "Dummy",
          location: { x: 0, y: 0 },
          size: 1,
          transits: 0,
          isFull: false,
          addTrack: () => false,
          delTrack: () => false,
          numTrack: () => 0,
          addTrain: () => true,
          delTrain: () => true,
          numTrain: () => 0,
          addPassenger: () => true,
          delPassenger: () => true,
          numPassenger: () => 0,
        };
        this.location = dummyStation;
      } else {
        let arrivalStation: iStation;
        if (this.fromStation) {
          const other = Array.from(track.stations).find((s) =>
            s !== this.fromStation
          );
          arrivalStation = other || Array.from(track.stations)[0];
        } else {
          arrivalStation = Array.from(track.stations)[0];
        }
        // Cannot arrive if station is full
        if (!arrivalStation || arrivalStation.isFull) {
          return false;
        }
        this.location = arrivalStation;
      }
      this.progress = 0;
      this.fromStation = null;
      return true;
    }

    // Find arrival station
    let arrivalStation: iStation;
    if (this.fromStation) {
      const other = Array.from(track.stations).find((s) =>
        s !== this.fromStation
      );
      arrivalStation = other || Array.from(track.stations)[0];
    } else {
      arrivalStation = Array.from(track.stations)[0];
    }

    // Check if arrival station is full
    if (!arrivalStation || arrivalStation.isFull) {
      return false;
    }

    // Increment wear based on track distance
    this.wear += track.distance / 100;

    // Update location and progress
    this.location = arrivalStation;
    this.progress = 0;
    this.fromStation = null;

    return true;
  }
}
