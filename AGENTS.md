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
  `src/state/train.ts` and `src/state/train.test.ts`.

## Code Structure

Code is divided into folders by feature.

```
src/
├── area/        # Stations on a map
├── fleet/       # Trains in networks
├── network/     # Graphs of stations connected by tracks
├── passenger/   # A traveller on a train or at a station
├── play/        # Game simulation
├── station/     # A node on the map with passengers, tracks and trains
├── track/       # Link between two stations
├── train/       # Transportation of passengers
└── utils/       # Supporting functions
```
