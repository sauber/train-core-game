# Station

A Station is a node on the map where trains can stop, passengers can wait, and
tracks connect to other stations.

## Properties

- **Name**: Unique identifier
- **Location**: Coordinates on the Area map
- **Platforms (train capacity)**: Maximum number of trains that can be at the station
- **Tracks**: Connections to other stations (no limit)
- **Passengers**: Travelers waiting at the station (no limit)

## Train Capacity

Train capacity is determined by the number of boardings and disembarkments
at the station. Capacity starts at 1 train and increases monotonically as
activity grows.

### Capacity Thresholds (Defaults)

- 0 boardings/disembarkments → 1 train
- 100 boardings/disembarkments → 2 trains
- 250 boardings/disembarkments → 3 trains
- 500 boardings/disembarkments → 4 trains

Capacity never decreases. (Note: capacity growth not yet implemented.)

## Revenue Collection (Planned)

When implemented, the Station Agent will:
1. Check passengers waiting at the station
2. For each passenger whose destination matches the station:
   - Calculate fare based on shortest-path distance from origin to destination
   - Add fare to station revenue
   - Remove passenger from simulation

Station revenue is transferred to the Simulation Balance each tick.

## Passenger Spawning (Planned)

When implemented, the Station Agent will spawn new passengers at the station.
Newly spawned passengers have random origin and destination within the network.
Frequency and volume may vary based on simulation phase or station characteristics.

## Current Implementation

Stations exist and can:
- Hold trains (up to platform capacity)
- Connect to other stations via tracks
- Hold waiting passengers (no current limits)
- Have their capacity determined by initial platforms (not yet by activity)

Boarding/disembarkment decisions, revenue collection, and passenger spawning
are not yet automated. These will be handled by the planned Station Agent
(not yet implemented).
