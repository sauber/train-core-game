# Network

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
internal state or autonomous triggers. Other agents generate Network views to:

- Find reachable stations for a given origin
- Evaluate connectivity and isolation
- Plan routes (shortest/fastest paths)
- Determine buildable track locations

## Network Agent (Current)

The Network Agent makes track construction and repair decisions. It operates
on network connectivity to:

1. **Repair tracks** — Fix broken tracks when affordable, prioritizing critical connections
2. **Add tracks** — Connect isolated stations to improve network reachability

## Current Implementation

The Network Agent uses `list-networks.ts` and related functions to generate
network views. It prioritizes repairing broken tracks over building new ones.

Track construction/repair decisions consider:
- Available capital and repair budgets
- Track distance and degradation state
- Cost-effectiveness via centralized cost calculations

## Route

A Route is a chain of stations and tracks to get from one Station to another.
Finding routes from one station to another is the responsibility of a Route
object, which may evaluate different criteria: number of hops, shortest total
distance, or fastest total travel time.

The Shortest Route has the smallest distance, and the Fastest Route is the
smallest distance divided by track degradation factors.

## Route Usage (Planned)

When implemented, Train Agents will request routes for trains. A route-finding
algorithm will build a temporary Network view and compute paths. Algorithms may
include:

- Random next station
- Shortest path (fewest hops or distance)
- Fastest path (minimizing travel time)
- Network-spanning routes (visiting multiple stations)

Network generation and route planning are triggered by agent requests rather
than by autonomous Network actions. Actions that affect connectivity (building,
repairing, removing tracks) are performed by other agents and result in updated
simulation state from which Networks are subsequently generated.