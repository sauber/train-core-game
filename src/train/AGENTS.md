# Train

A Train is a carrier of passengers that moves between stations along tracks.

## Type

Different train types vary by name, speed, cost, and passenger capacity. Train
types are defined in `train-type.ts`.

## States

- **Operational**: Functional and can transport passengers (degradation < 1.0)
- **Broken**: Non-functional (degradation ≥ 1.0)

## Route (Planned)

When implemented, a train will hold a Route — a chain of stations and tracks
obtained from route planning. The Route represents the planned path to a
destination.

- When reaching the final station, the route is cleared and a new one is
  requested
- Passengers aboard disembark at their destination stations along the route

## Departure (Planned)

A train will depart from a station onto a track when:

- It has a route
- The next track on the route is free
- Has at least one passenger aboard (may be relaxed in future)
- Train is not broken
- Track is not broken

## Driving (Planned)

A train progresses down a track each simulation tick until reaching the other
end.

Travel speed is 0 if either train or track is broken.

Time to traverse a track = ceil(track distance / travel speed).

## Arrival (Planned)

A train arrives at a station when:

- It reaches the end of its current track
- Platform capacity is available at the destination

## Current Implementation

Trains exist and can:

- Be added to/removed from the simulation
- Move between stations and tracks (immediate, not tick-based)
- Hold passengers up to their type's capacity
- Track their own degradation level
- Be inserted by the Fleet Agent

**Note:** Automated route following, speed-based travel, departure/arrival
logic, and degradation during travel are not yet implemented. These will be
handled by the planned Train Agent (not yet implemented).

## Degradation

Trains degrade over time and use. Currently degradation is set per-type and
trains do not self-degrade during movement.

When implemented:

- Trains will degrade per unit of distance traveled
- Degradation ≥ 1.0 marks a train as broken
- Broken trains can be repaired for a cost
