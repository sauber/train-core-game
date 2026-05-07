# Station

A Station is a node on the map where trains can stop, passengers can wait, and
tracks connect to other stations.

## Lifecycle Responsibilities

The Station Lifecycle (inherited from Area Lifecycle) manages station creation
and deletion:

- Station creation logged via `game.event()`, no cost deducted
- Station deletion logged via `game.event()`, revenue from station operations
  added to Balance
- Ensures all tracks connected to station are handled before deletion

## Properties

- **Name**: Unique identifier
- **Location**: Coordinates on the Area map
- **Platforms (train capacity)**: Maximum number of trains that can be at the
  station
- **Tracks**: Connections to other stations (no limit)
- **Passengers**: Travelers waiting at the station (no limit)

## Train Capacity

Train capacity is determined by the number of boardings and disembarkments at
the station. Capacity starts at 1 train and increases monotonically as activity
grows.

### Capacity Thresholds (Implemented)

- 0 boardings/disembarkments → 1 train
- 100 boardings/disembarkments → 2 trains
- 250 boardings/disembarkments → 3 trains
- 500 boardings/disembarkments → 4 trains

Capacity never decreases. (Capacity growth is now implemented.)

## Revenue Collection (Implemented)

When passengers reach their destination station, the Station Agent will:

1. Check passengers waiting at the station
2. For each passenger whose destination matches the station:
   - Calculate fare based on Euclidean distance from origin to destination
   - Add fare to station revenue (via Lifecycle, added to Balance)
   - Remove passenger from simulation (via Lifecycle)

Station revenue is collected and transferred to the Simulation Balance via
Lifecycle.

## Passenger Spawning (Implemented)

The Station Agent spawns new passengers at random connected stations each tick.
Newly spawned passengers have random origin and destination within the network.

## State Machine

- **Waiting for platforms**: Station exists but has no platforms
- **Platforms increased**: Station capacity grows based on activity
- **Operational**: Station has platforms and is ready for trains
