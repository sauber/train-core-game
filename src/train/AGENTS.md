# Train

A carrier of passengers.

## Type

There are different types of trains. Type wary by name, speed, cost and
capacity.

## Route

A train holds a Route (a chain of stations and tracks) obtained from the
Network Agent. The Route represents the planned path to a final destination.

When a train reaches the final station in its route, the route is cleared,
and a new one is requested from the Network Agent. Passengers aboard will
disembark at their destination stations along the route.

## Depart

Train will depart from station onto track when

- Train has route
- Next track on route is free from other trains
- Has at least one passenger aboard
- Train is not broken (degraded<1)
- Track is not broken (degraded<1)

Departing station is chopped off Route.

## Driving

Train will progress down a track at each simulation tick until reaching other
end of track.

Each train has a speed (maximum distance units per step), specified as a
parameter for each train type (typically 1-25 dps). The actual travel speed is
reduced by degradation of both the train and the track:

```
travelSpeed = maxSpeed * min((1 - train.degraded), (1 - track.degraded))
```

Travel speed is 0 if train is broken or track is broken (degraded >= 1).

The number of ticks to traverse a track depends on the track distance divided
by the travel speed (rounded up to whole ticks).

## Arrive

A train will arrive at station when

- Train reached end of track
- Capacity is available at arriving station

The tracked that was just passed is chopped of Route.

Number of passes of track is incremented which affect track degradation.

## Final destination

If train reaches the last station in its Route, the route is cleared, a new
route is requested from the Network Agent, and remaining passengers disembark
at that station.

## Degradation

Trains degrade for each unit of distance traveled on previous track. Degradation
is updated after passing a track.

If degraded >= 1, train is marked as broken, otherwise it's operations.

Trains can be repaired for a cost.

## Agent

The Train Agent will handle requesting route, departure, driving and arrival for
all trains.

Trains will degrade themselves.
