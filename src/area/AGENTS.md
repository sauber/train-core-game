## Station Creation (Area Agent)

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

## Costs

Stations have no building or repair cost.