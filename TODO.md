# To Do

## Abstraction Tasks

- [x] Define abstract `Lifecycle` class with journal logging, balance handling,
      and relationship integrity checks.
- [x] Implement concrete lifecycle subclasses for Area, Network, Fleet, and
      Population.
- [x] Refactor existing object creation/deletion to use lifecycle methods.

## Area Tasks

- [x] Refactor `Area.createStation` to use Area Lifecycle for station addition.
- [x] Add method to safely delete stations via lifecycle, ensuring linked tracks
      are removed.
- [x] Update Area Agent to call lifecycle methods instead of direct mutations.

## Station Tasks

- [x] Integrate Station Lifecycle for creation/deletion logging and balance
      updates.
- [x] Implement platform growth state machine transitions.
- [x] Ensure revenue collection updates Simulation balance through lifecycle.
- [x] Add tests for station lifecycle operations.

## Network Tasks

- [x] Implement Network Lifecycle for track addition, repair, and deletion with
      proper journal entries.
- [x] Ensure track linking to stations is validated in lifecycle methods.
- [x] Update Network Agent to use lifecycle for track construction/repair.
- [x] Add tests for network lifecycle operations.

## Track Tasks

- [x] Refactor `Track.add` and `Track.remove` to use Network Lifecycle.
- [x] Implement track degradation and repair state machine within lifecycle.
- [x] Add validation for track removal only when no trains present.
- [x] Write unit tests for track lifecycle behavior.

## Fleet Tasks

- [x] Create Fleet Lifecycle handling train purchase, repair, and disposal with
      balance adjustments.
- [ ] Update Fleet Agent to utilize lifecycle methods for train insertion and
      repair.
- [ ] Add tests for fleet lifecycle actions.

## Train Tasks

- [ ] Integrate Train Lifecycle for adding, moving, and removing trains with
      journal logging.
- [ ] Implement train state machine (idle, waiting for route, waiting for
      passengers, departs, runs, arrives, broken).
- [ ] Add degradation handling during movement via lifecycle.
- [ ] Write tests for train lifecycle and state transitions.

## Passenger Tasks

- [x] Implement Population Lifecycle for passenger spawn and removal, handling
      fare revenue.
- [ ] Update Passenger Agent (planned) to use lifecycle for
      boarding/disembarkment.
- [ ] Add tests for passenger lifecycle and fare collection.

## Simulation Tasks

- [x] Ensure Simulation `event` method is used by all lifecycle classes.
- [ ] Add utility functions to query balance and journal for debugging.
- [ ] Write integration tests covering end‑to‑end lifecycle interactions.
