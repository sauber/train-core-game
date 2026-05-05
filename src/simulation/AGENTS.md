# AGENTS.md

Run simulation of railway network.

## Agent

Make decisions and manipulate simulation.

## Step

A simulation step advances the current tick by one and executes all agents in a
single pass.

Agent execution order follows the principle of smallest to largest: the
passenger agent runs first, and the area agent runs last. Every agent is called
at every step.

## Lifecycle

A tick consists of the following phases:

1. Increment the tick counter.
2. Execute each agent in the defined order.
3. Collect resulting state changes and record events in the journal.
4. Evaluate termination conditions.

Order matters because some agents may depend on the state updates produced by
earlier agents. For example, a passenger agent may make boarding decisions
before a fleet agent moves trains.

Agents should be stateless between ticks and rely only on the current simulation
state.

## Simulation phases

The simulation progresses through these phases:

1. Not started — before the first step has run.
2. Started — the first stations have appeared.
3. Growing — the simulation has reached its first capital milestone.
4. Profiting — the final stations have been built and the network is mature.
5. Terminated — the simulation has ended due to reaching max steps or becoming
   stuck.

### Phase detection

- Not started: `tick == 0` and no station spawn actions have occurred.
- Started: the first station exists in the area, which typically happens after
  the first step.
- Growing: the simulation has passed the first configured `stationLevels`
  capital milestone, indicating the network is expanding.
- Profiting: the highest configured station capital milestone has been reached
  and the final set of stations has been built.
- Terminated: `terminated == true` or the tick limit has been reached.

## Tick

A counter for number of steps since beginning of simulation.

## Termination

Simulation stops when one of the termination conditions is met.

Termination happens when:

- the simulation tick reaches the configured maximum number of steps
- or the simulation becomes stuck because no meaningful action can occur

Examples of stuck situations:

- no trains exist and the simulation cannot afford the cheapest available train
- all trains are broken and there are insufficient funds to repair any of them
- all tracks are broken and there are no funds available for repairs

## Simulation

Run all steps automatically until termination.

## Game

A game is a simulation where some Agent tasks are replaced by user control.
