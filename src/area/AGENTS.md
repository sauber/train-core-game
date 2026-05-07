## Station Lifecycle (Area Agent)

The Area Agent creates and deletes stations using the Area Lifecycle class.

### Lifecycle Responsibilities

- **Add station**: Logged via `game.event()`, payment for construction (if any)
  deducted from Balance
- **Delete station**: Logged via `game.event()`, revenue from station closure
  added to Balance
- Ensures station is properly linked to tracks before deletion
- Tracks minimum distance constraints when placing new stations

### State Machine

- **Waiting for platforms**: Station exists but has no platforms
- **Platforms increased**: Station capacity grows based on activity thresholds
- **Operational**: Station has platforms and is ready for trains

### Current Implementation

The Area Agent creates new stations when simulation capital reaches configured
milestones. Creation process:

1. Attempts random locations within the area until finding one with minimum
   distance to all existing stations
2. Generates a random Danish-inspired station name using `createStationName()`
3. Adds the new station to the area with initial capacity (1 train platform)

The minimum distance is a simulation configuration parameter (default valid
range: 1-1000 distance units).

The Area Agent creates **at most one station per simulation tick**. If multiple
stations are needed (based on capital milestones), they are created over
subsequent ticks.

### Costs

Stations have no building or repair cost. Revenue from station operations flows
through the Lifecycle to the Balance.
