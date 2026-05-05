# AGENTS.md

## Network

A Network is an abstraction representing a collection of Stations connected by
tracks, generated on-demand from the current simulation state. Networks are
transient — they are constructed when needed, used for analysis or route
planning, and then discarded. There is no persistent Network object in the
simulation; instead, functions generate a network view (list of stations and
their connecting tracks) from the current state.

Multiple Networks may exist in isolation from each other within the same
simulation. A Network might be as small as a single Station without any Tracks.

When a new track is built, two previously separate Networks may merge into one.
When a track is deleted, a single Network may split into multiple isolated
Networks.

Because Networks are stateless abstractions, there is no Network Agent with
internal state or autonomous triggers. Other agents (Train, Station, Area)
generate Network views to:

- Find reachable stations for a given origin
- Evaluate connectivity and isolation
- Plan routes (shortest/fastest paths)
- Determine buildable track locations

## Route

A Route is a chain of stations and tracks to get from one Station to another.
Finding routes from one station to another is the responsibility of a Route
object, which may evaluate different criteria: number of hops, shortest total
distance, or fastest total travel time.

The Shortest Route has the smallest distance, and the Fastest Route is the
smallest distance divided by track degradation factors.

## Route generation

When a train at a station has no route, it requests one from the Network Agent.
The Network Agent generates a route for the train by building a temporary
Network view and applying a route-finding algorithm. The algorithm may vary:
it could be a random next station, a comprehensive journey visiting all
stations in the network (traveling salesman), or something in between.

Network generation and route planning are triggered by agent requests
(Train Agent requesting a route, etc.) rather than by autonomous Network actions.
Actions that affect connectivity (building, repairing, removing tracks) are
performed by other agents and result in updated simulation state from which
Networks are subsequently generated.
