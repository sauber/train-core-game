# Station

A Station is a node on the area where trains can stop, passengers can wait, and
tracks connect to other stations.

## Properties

- Location
- Name
- Set of platforms, minimum and default is 1, maximum is simulation
  configuration.
- Each platform is either free, or has a train
- Set of Passengers
- Number of transits
- Set of Tracks

## Actions

### Grow

When simulation configured thresholds are reached, a platform is added, until
maximum number of platforms. Example:

- 0 Transits: Platforms = 1
- 10 Transits: Platforms = 2
- 100 Transits: Platforms = 3
- 250 Transits: Platforms = 4

Station agent reports to simulation journal when number of platforms are
increased.

When maximum number of platforms are reached, no more platforms are added.
Platforms are never removed.

## Transit

A transit is when passenger is added or removed from Set of passengers.
