# Simulation

The simulation coordinates all game objects and agents, advancing the world
state in discrete steps.

## Lifecycle Integration

The Simulation manages the Lifecycle classes for all game objects:

- All spawn and destroy activities are logged in the journal via `game.event()`
- All payments are deducted from the Balance via Lifecycle
- All revenue is added to the Balance via Lifecycle

## Agents

The simulation uses an array of agents that are executed each simulation tick.
Agents are stateless functions that observe the simulation state and record
actions in the journal.

### Current Agents

In order of execution:

1. **Fleet Agent** — Train insertion and repair (uses Fleet Lifecycle)
2. **Track Agent** — Track construction and repair (uses Network Lifecycle)
3. **Area Agent** — Station creation (uses Area Lifecycle)
4. **Station Agent** — Passenger spawning, revenue collection, and capacity
   management (uses Population Lifecycle)
5. **Report Agent** — State reporting

**Network Agent** - Not yet implemented. Would handle track construction/repair
decisions and route planning.

Lower-scale agents (passenger boarding, train routing, station operations) are
not yet implemented.

### Agent Execution Order

The agents execute in a fixed order each simulation step. Order matters because
some agents may depend on state updates produced by earlier agents. Agents
should be stateless between ticks and rely only on the current simulation state.

### Agent State Mutation

Agents observe the current simulation state and record actions in the journal
via `game.event()`. State mutations (e.g., creating stations, building tracks,
purchasing trains) occur through Lifecycle classes which ensure:

- Journal logging
- Balance deductions/additions
- Relationship integrity

Actions do not go through the journal for execution/replay; the journal is an
observer pattern for tracking simulation history.
