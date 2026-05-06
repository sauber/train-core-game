# AGENTS.md

## Game Overview

A logistics strategy game. The player manages a railway network, which
transports passengers, and earns profit while maintaining tracks.

## Platform

- Programming language: Typescript
- Shell: Windows 11 Powershell
- Type checking command: `deno check`
- Test command: `deno test`
- Lint command: `deno lint`

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

Each feature has a main implementation responsible for integrity of
relationships in simulation, and may have an agent which can decide actions and
execute them.

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

In every simulation step, all registered agents are executed in a single pass.
Each agent is stateless between ticks and operates only on the current
simulation state.

Multitick goals are stored as Routes in trains and passenger objects. Agents
help objects reach goals.

### Current Agents

In order of execution:

1. **Fleet Agent** — Train insertion and repair
2. **Track Agent** — Track construction and repair
3. **Area Agent** — Station creation
4. **Station Agent** — Passenger spawning, revenue collection, and capacity
   management
5. **Report Agent** — State reporting

**Network Agent** - Not yet implemented. Would handle track construction/repair
decisions and route planning.

Lower-scale agents that would make fine-grained decisions (passenger boarding,
train routing, station operations) are not yet implemented.

### Agent Execution Order

The agents execute in a fixed order each simulation step. Order matters because
some agents may depend on state updates produced by earlier agents. Agents
should be stateless between ticks and rely only on the current simulation state.

### Agent State Mutation

Agents observe the current simulation state and record actions in the journal
via `game.event()`. State mutations (e.g., creating stations, building tracks,
purchasing trains) occur directly via method calls on simulation objects. The
journal serves as a record of actions for debugging and monitoring purposes.
Actions do not go through the journal for execution/replay; the journal is an
observer pattern for tracking simulation history.

## Planned Agent Types (Not Yet Implemented)

- **Passenger Agent** - Would control passenger boarding and disembarkment
  decisions
- **Train Agent** - Would control train routing, departure, driving, and arrival
- **Network Agent** - Would handle track construction/repair decisions and route
  planning

When implemented, these agents would execute before the Fleet Agent in order
from smallest-scale (passengers) to largest-scale (network).
