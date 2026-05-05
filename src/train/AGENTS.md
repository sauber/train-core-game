# Train

A carrier of passengers.

## Type

There are different types of trains. Type wary by name, speed, cost and
capacity.

## Route

A train has a route. If it has no route, it will request one from Network.

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

The number of ticks depends on distance of track, degradation of track and
degradation of train.

## Arrive

A train will arrive at station when

- Train reached end of track
- Capacity is available at arriving station

The tracked that was just passed is chopped of Route.

Number of passes of track is incremented which affect track degradation.

## Final destination

If train reaches final Station in Route, all passengers disembark, Route is
remove, and new one is requested from Network.

## Degradation

Trains degrade for each unit of distance traveled on previous track. Degradation
is updated after passing a track.

If degraded >= 1, train is marked as broken, otherwise it's operations.

Trains can be repaired for a cost.

## Agent

The Train Agent will handle requesting route, departure, driving and arrival for
all trains.

Trains will degrade themselves.
