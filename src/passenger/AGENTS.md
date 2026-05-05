# Passenger

Passengers are travellers from one station to another. Origin and destination
are static for each traveller. The objective for a traveller is to reach
destination as fast as possible.

Passengers do not manage their own lifecycle. A passenger is always at exactly
one location: either waiting at a station or aboard a train.

## Current Implementation

Passengers can be spawned at stations and move between locations. Boarding,
disembarkment, and route planning decisions are not yet automated — these will
be handled by the planned Passenger Agent (not yet implemented).

## Passenger States

- **Waiting**: At a station, awaiting transport
- **In Transit**: Aboard a train

## Boarding (Planned)

When a passenger spawns at a station (or disembarks), the Passenger Agent will
create or update a fastest-path route to the destination station. The passenger
then boards any train at the same station whose planned route matches the
passenger's intended next segment. If no such train is available, the passenger
waits. Passengers will not board full trains.

## Disembarkment (Planned)

Passengers disembark when:
- Their destination station is reached, or
- Continuing on the current train's route no longer aligns with their planned path

If a train reaches its final route station, all passengers whose destination
matches will disembark. Other passengers may remain only if a compatible
subsequent train is assured.

If a train has no route, all passengers on board will disembark.

## Fare Collection (Planned)

When passengers reach their destination station, the Station Agent will:
1. Calculate the fare based on the shortest path distance from origin to destination
2. Add the fare to the station's revenue
3. Remove the passenger from the simulation

## Planned Passenger Agent

The not-yet-implemented Passenger Agent will control:
- Route planning for individual passengers
- Boarding/disembarkment decisions
- Waiting behavior at stations
- Path re-evaluation when trains don't match planned routes
