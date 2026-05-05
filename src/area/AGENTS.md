# Area

The Area is the map where stations are placed. It manages station placement and
enforces spacing constraints.

## Properties

- **Width/Height**: Dimensions of the map
- **Margin**: Minimum distance from edges for station placement
- **Minimum Distance**: Minimum distance between any two stations
- **Stations**: Collection of all stations on the map

## Station Creation (Area Agent)

The Area Agent creates new stations when simulation capital reaches configured
milestones. Creation process:

1. Attempts random locations within the area until finding one with minimum
   distance to all existing stations
2. Generates a random station name
3. Adds the new station to the area with initial capacity (1 train platform)

The minimum distance is a simulation configuration parameter (default valid
range: 1-1000 distance units).

## Costs

Stations have no building or repair cost.
