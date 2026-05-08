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

Agents are not part part of the objects class, but a separate function which can
change state of an object by evaluation conditions and making changes. Agents
ensure rules for conditions and station transitions are follow.

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

- **Area**: Manages stations. See `src/area/AREA.md` for details.
- **Network**: Manages trakcs. See `src/network/NETWORK.md` for details.
- **Fleet**: Manages trains. See `src/fleet/FLEET.md` for details.
- **Population**: Manages passengers. See `src/population/POPULATION.md` for
  details.

## Objects

Game objects are state machines, that cycle through states. Game object agents
confirm if next state is possible, and proceeds.

List of objects:

- **Station**: A location in the area. See `src/station/STATION.md` for details.
- **Track**: Connecting two stations. See `src/track/TRACK.md` for details.
- **Passenger**: Travellers between stations. See
  `src/passenger/PASSENGER.md`for details.
- **Train**: Carrier of passengers betweem stations. See `src/train/TRAIN.md`
  for details.

## Simulation

Simulation container of all factory objects. When a simulation runs, it takes
one step at a time. At each step, all the factory agents are called once one by
one. The factory agents call the object agents for all objects that it manages.

For example Simulation call the Fleet agent. The fleet agent calls the Train
agent for each train created. The train agent for each train is allowed to take
one action per step.

The order of calling agents are:

- Population -> All Passenger Agents -> Population Agent
- Fleet -> All Train Agents -> Fleet Agent
- Network -> All Track Agents -> Network Agent
- Area -> All Station Agents -> Area Agent
