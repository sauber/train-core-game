Passenger are travellers from one station to another. Original and destination
are static for each traveller. The object for traveller is to reach destination
as fast as possible.

A Location marks where passenger currently is. A passenger can we waiting at a
station or abord a train. Passenger are at all times at exatly one location.

If waiting at the destination station, the passenger pays a fee for the journey,
and exits. The passenger no longer exists.

When waiting at any other station than destination, the passenger can board any
trains at the same station. Or skip boarding. If no trains are at same station,
then passenger simply waits for one to arrive.

Passenger will not board trains which are already full.

If passenger is abort a train, which is on a track, disembark is not possible.
If train is at a station, passenger may disembark to same station. Or stay
aboard if train has a route where next destination is similar to passengers
preferred or acceptable route.

If train reach final station of its route, all passengers on train will
disembark, and no passengers will board. Same if train has no route.
