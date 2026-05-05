# Simulation

The simulation coordinates all game objects and agents, advancing the world
state in discrete steps.

## Agents

The simulation uses an array of agents that are executed each tick. Agents are
stateless functions that observe the simulation state and record actions in the
journal.

### Current Agents

In order of execution:

1. **Fleet Agent** — Train insertion and repair
2. **Track Agent** — Track construction and repair
3. **Area Agent** — Station creation
4. **Report Agent** — State reporting

**Network Agent** - Not yet implemented. Would handle track construction/repair decisions
and route planning.

Lower-scale agents (passenger boarding, train routing, station operations)
are not yet implemented.

### Agent Execution Order

The agents execute in a fixed order each simulation step. Order matters because
some agents may depend on state updates produced by earlier agents.
Agents should be stateless between ticks and rely only on the current
simulation state.

### Agent State Mutation

Agents observe the current simulation state and record actions in the journal
via `game.event()`. State mutations (e.g., creating stations, building tracks,
purchasing trains) occur directly via method calls on simulation objects.
The journal serves as a record of actions for debugging and monitoring purposes.
Actions do not go through the journal for execution/replay; the journal is an
observer pattern for tracking simulation history.
