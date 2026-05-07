# To Do

## Abstraction Tasks

- Define abstract `Lifecycle` class with journal logging, balance handling, and
  relationship integrity checks.
- Implement concrete lifecycle subclasses for Area, Network, Fleet, and
  Population.
- Refactor existing object creation/deletion to use lifecycle methods.

## Area Tasks

- Refactor `Area.createStation` to use Area Lifecycle for station addition.
- Add method to safely delete stations via lifecycle, ensuring linked tracks are
  removed.
- Update Area Agent to call lifecycle methods instead of direct mutations.

## Station Tasks

- Integrate Station Lifecycle for creation/deletion logging and balance updates.
- Implement platform growth state machine transitions.
- Ensure revenue collection updates Simulation balance through lifecycle.
- Add tests for station lifecycle operations.

## Network Tasks

- Implement Network Lifecycle for track addition, repair, and deletion with
  proper journal entries.
- Ensure track linking to stations is validated in lifecycle methods.
- Update Network Agent to use lifecycle for track construction/repair.
- Add tests for network lifecycle operations.

## Track Tasks

- Refactor `Track.add` and `Track.remove` to use Network Lifecycle.
- Implement track degradation and repair state machine within lifecycle.
- Add validation for track removal only when no trains present.
- Write unit tests for track lifecycle behavior.

## Fleet Tasks

- Create Fleet Lifecycle handling train purchase, repair, and disposal with
  balance adjustments.
- Update Fleet Agent to utilize lifecycle methods for train insertion and
  repair.
- Add tests for fleet lifecycle actions.

## Train Tasks

- Integrate Train Lifecycle for adding, moving, and removing trains with journal
  logging.
- Implement train state machine (idle, waiting for route, waiting for
  passengers, departs, runs, arrives, broken).
- Add degradation handling during movement via lifecycle.
- Write tests for train lifecycle and state transitions.

## Passenger Tasks

- Implement Population Lifecycle for passenger spawn and removal, handling fare
  revenue.
- Update Passenger Agent (planned) to use lifecycle for boarding/disembarkment.
- Add tests for passenger lifecycle and fare collection.

## Simulation Tasks

- Ensure Simulation `event` method is used by all lifecycle classes.
- Add utility functions to query balance and journal for debugging.
- Write integration tests covering end‑to‑end lifecycle interactions.
