# DESIGN.md

## Project Overview

A transportation simulation. The objective is to transport as many passengers
from one station to another to maximize revenue from tickets sold. Passengers
are transported by trains. Trains drive on tracks. Tracks connect stations.

## Economy

Simulation has a balance. Costs are deducted from balance and revenue is added
to balance.

- Trains and tracks are cost money to obtain.
- Trains and tracks degrade and cost money to repair.
- Passengers pay a fare when they arrive at destination station.

## Agent

An Agent is an autonomous decision-maker that controls a specific set of
objects. Each agent observes the simulation state and makes decisions to
transition objects (e.g., board trains, build tracks, spawn passengers)
according to defined rules and objectives.

In every simulation step, all registered agents are executed in a single pass.

### Journaling

Agents observe the current simulation state and record actions in the journal
via `game.event()`. State mutations (e.g., creating stations, building tracks,
purchasing trains) occur directly via method calls on simulation objects. The
journal serves as a record of actions for debugging and monitoring purposes.
Actions do not go through the journal for execution/replay; the journal is an
observer pattern for tracking simulation history.

## Lifecycle Management

Factories add and remove objects and ensures consistency. The factories
themselves are created at start of simulation and factory agents make decisions
for the factories. For example the Fleet factory creates trains, and ensures
train is placed at a station with an available platform, and that train itself
is aware of location at the given station.

List of factories:

- **Area**: Creates stations
- **Network**: Creates, repairs and deletes tracks
- **Fleet**: Creates, repairs and delete trains.
- **Population**: Creates and deletes passengers
- **Navigation**: Create routes

See `src/<factory>/<FACTORY>.md` for more details.

## Objects

Game objects are state machines, that cycle through states. Game object agents
confirm if next state is possible, and proceeds.

List of objects:

- **Station**: Has location in Area, a max number of capacity for trains, a set
  of trains currently at station, a set of passengers waiting for trains and
  waiting to exit, a set of tracks connecting to other stations.
- **Track**: Has two stations as endpoints, a distance, a degraded status and
  may have zero or one trains running on it.
- **Passenger**: Has origin station and destination station, has a route for
  desired path to destination, and has current location which is either a
  station or a track.
- **Train**: Has a type and a route. Is located at a station or on a track.
- **Route**: Chain of stations and tracks from one station to another station.

See `src/<object>/<OBJECT>.md` for more details.
