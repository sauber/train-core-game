# AGENTS.md

## Game Overview

A logistics strategy game. The player manages a railway network, which
transports passengers, and earns profit while maintaining tracks.

## Platform

- Programming language: Typescript
- Test: `deno test`
- Link: `deno lint`

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

Do no import directly from other project feature implementation file. Bad
example:

```
import { <symbol>, type <symbol> } from "../<feature>/<file>.ts;
```
