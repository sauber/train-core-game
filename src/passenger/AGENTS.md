Passengers are travellers from one station to another. Origin and destination
are static for each traveller. The objective for a traveller is to reach
destination as fast as possible.

Passengers are spawned by the Station Agent but boarding, disembarkment, and
route planning decisions are controlled by the Passenger Agent. Passengers
do not manage their own lifecycle.

A Location marks where a passenger currently is. A passenger can be waiting at a
station or aboard a train. A passenger is at all times at exactly one location.

## Passenger boarding

When a passenger spawns at a station (or disembarks), the Passenger Agent
immediately creates or replaces a fastest-path route to the destination station.
The passenger then boards any train at the same station whose planned route
matches the passenger's intended next segment. If no such train is available,
the passenger waits for one to arrive. Passengers will not board trains which
are already full.

## Passenger disembark

Passengers disembark when their destination station is reached, or when
continuing on the current train's route no longer aligns with their planned
path. If a train reaches its final route station, all passengers whose
destination matches will disembark; passengers whose destination is further
along may remain aboard only if a compatible subsequent train is assured.

If a train has no route (e.g. after reaching a final destination), all
passengers on the train will disembark.

## Passenger removal

Passengers do not manage their own lifecycle. When a passenger reaches their
destination station, the Station Agent calculates the fare, collects payment,
and removes the passenger from the simulation.
