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

Lower-scale agents (passenger boarding, train routing, station operations)
are not yet implemented.

### Agent Execution Order

The agents execute in a fixed order each simulation step. Order matters because
some agents may depend on state updates produced by earlier agents.
Agents should be stateless between ticks and rely only on the current
simulation state.

## Step

A simulation step:

1. Increments the tick counter
2. Executes each agent in the defined order
3. Collects resulting state changes and records events in the journal
4. Evaluates termination conditions

## Lifecycle

A tick consists of the phases described in **Step** above.

## Simulation Phases

The simulation progresses through these phases:

1. **Not started** — before the first step has run
2. **Started** — the first stations have appeared
3. **Growing** — the simulation has passed the first configured `stationLevels` capital milestone
4. **Profiting** — the highest configured station capital milestone has been reached and the final set of stations has been built
5. **Terminated** — the simulation has ended due to reaching max steps or becoming stuck

### Phase Detection

- **Not started**: `tick == 0` and no station spawn actions have occurred
- **Started**: the first station exists in the area (typically after the first step)
- **Growing**: the simulation has passed the first configured `stationLevels` capital milestone
- **Profiting**: the highest configured station capital milestone has been reached and all planned stations have been built
- **Terminated**: `terminated == true` or the tick limit has been reached

## Tick

A counter for number of steps since the beginning of simulation.

## Termination

Simulation stops when one of the termination conditions is met:

- The simulation tick reaches the configured maximum number of steps
- The simulation becomes stuck because no meaningful action can occur

### Stuck Situations

- No trains exist and the simulation cannot afford the cheapest available train
- All trains are broken and there are insufficient funds to repair any of them
- All tracks are broken and there are no funds available for repairs

## Run

Run all steps automatically until termination.

## Game

A game is a simulation where some agent decisions are replaced by user control.
The player acts as an agent for certain decisions (e.g., route assignment,
construction priorities), while automated agents handle the rest.

The game records player actions in the journal alongside automated agent
actions, and evaluates win/loss conditions, profit, and network efficiency.
