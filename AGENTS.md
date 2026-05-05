# AGENTS.md

## Game Overview

A logistics strategy game. The player manages a railway network, which
transports passengers, and earns profit while maintaining tracks.

## Platform

- Programming language: Typescript
- Type checking: `deno check`
- Test: `deno test`
- Lint: `deno lint`
- Shell: Windows 11 Powershell

## Code standards

- SOLID principles
- Design patterns

## Testing requirements

- Test driven development (TDD): Write the test before implementation of
  features or fixing bugs.
- Workflow for each new feature or bug fix
  1. Create a failing test in `src/<folder>/<module>.test.ts` describing the
     desired behavior.
  2. Execute `deno test src/<folder>/<module>.test.ts` and verify the test
     fails.
  3. Implement the feature in `src/<folder>/<module>.ts` until the test passes.
  4. Run `deno test` to ensure the entire test suite passes and no regressions
     appear.
- Test files are placed side‑by‑side with their implementation files, e.g.
  `src/train/train.ts` and `src/train/train.test.ts`.
- Use "@std/assert" for assert functions. Avoid to use the generic `assert()`
  and use instead more specific ones such as `assertEquals()`,
  `assertInstanceOf()` etc.

## Code Structure

Code is divided into folders by feature.

```
src/
├── area/        # Stations on a map
├── fleet/       # Trains in networks
├── network/     # Graphs of stations connected by tracks
├── passenger/   # A traveller on a train or at a station
├── simulation/  # Execute steps of simulation
├── station/     # A node on the map with passengers, tracks and trains
├── track/       # Link between two stations
├── train/       # Transportation of passengers
└── utils/       # Supporting functions
```

## Feature Structure

Each feature has an main implementation responsible for integrity of
relationships in simulation, and an agent which can decide actions, and execute
them.

Generally there is only one class or one function per file. Typescript Types are
defined where they are processed as input or generated as output.

```
src/<feature>/
├── <feature>.ts             # Add, remove, change object in game. Ensure relationships constrains
├── <feature>.test.ts        # Test cases for <feature>.ts
├── <feature>-agent.ts       # Decide events for all objects of type, calculate cost, execute events, record in simulation journal.
├── <feature>-agent.test.ts  # Test cases for <feature>-agent.ts
├── mod.ts                   # Export symbols from <feature>.ts and <feature>-agent.ts
└...                         # Other supporting files
```

## Import modules

Feature may have to import other modules. Use one of these three patterns:

- External modules:
  `import { <symbol>, type <symbol> } from "jsr:@<org>/<module>;`
- Project feature:
  `import { <symbol>, type <symbol> } from "../<feature>/mod.ts;`
- Location symbols: `import { <symbol>, type <symbol> } from "./<file>.ts;`

Do not import directly from other folder feature implementation file. Bad
example:

```
import { <symbol>, type <symbol> } from "../<feature>/<file>.ts;
```

Importing files from same folder should never use `mod.ts`. Its use is only for
other features.

When importing multiple symbols from other folder, keep all symbols on same
import line.

## Agent

An Agent is an autonomous decision-maker that controls a specific set of objects
or aspects of the simulation. Each agent observes the simulation state and makes
decisions to transition objects (e.g., board trains, build tracks, spawn
passengers) according to defined rules and objectives.

In every simulation step, all registered agents are executed in a fixed order
from smallest-scale (passengers) to largest-scale (area), ensuring that
lower-level decisions are made before higher-level ones. Each agent is stateless
between ticks and operates only on the current simulation state.

Multitick goals are stored as Routes in trains and passenger objects. Agents
help objects reach goals.

### Agent Types

- **Passenger Agent** - Controls passenger boarding and disembarkment decisions
- **Train Agent** - Controls train routing, departure, driving, and arrival
- **Station Agent** - Controls station operations including passenger spawning,
  revenue collection, and train capacity management
- **Network Agent** - Controls track construction, repair, and removal
- **Area Agent** - Controls station creation and placement on the map

### Agent Responsibilities

Agents make decisions and report actions to the simulation journal. They do not
directly mutate the simulation state; instead, actions are recorded and applied
in a controlled manner. An agent may be called once per tick but should remain
deterministic and idempotent.

## Simulation

The simulation is the automated execution of the game world according to agent
decisions. It runs in discrete steps (ticks), executing all agents in order and
advancing the game state. The simulation handles the lifecycle of all objects,
track degradation, train movement, passenger transport, and revenue flow.

A simulation may be run to completion (terminating on configured conditions) or
stepped interactively for observation and player intervention.

## Game

A game is a simulation in which some agent responsibilities are replaced by
player control. The player acts as an agent for certain decisions (e.g., route
assignment, construction priorities), while automated agents handle the rest.
The game records player actions in the journal alongside automated agent
actions, and evaluates win/loss conditions, profit, and network efficiency.

## Distance

All distances are relative to area width, so that simulation run similarly
regardless of area size. This accomodate similar experiences when running in
webbrowser windows of various sizes where the simulation area is tied to brwoser
canvas.

One distance unit (DU) is 1/1000 of area width.

## Speed

Speed is measured in distance units per step (DUPS). For example 20 DUPS means
moving 2% of area width per step.

## Cost

All costs are relative to initial Balance, to have a similar simulation
regardless of initial Balance.
