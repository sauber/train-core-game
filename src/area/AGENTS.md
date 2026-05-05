# Area

The Area is the map where stations are placed. It manages station placement
and enforces spacing constraints.

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

The minimum distance is a simulation configuration parameter (default valid range:
1-1000 distance units).

## Distance Units

All distances in simulation are relative to area width. One distance unit (DU)
is 1/1000 of the area width:

```
distanceUnit = 1 / 1000 * simulation.area.width
```

Distances are calculated as geometric distance and rounded to whole distance units.

### Example

```
simulation.area.width = 400
distanceUnit = 1 / 1000 * 400 = 0.4

location a = {x: 100, y: 100}
location b = {x: 200, y: 200}

distance = ceil(sqrt((a.x - b.x)^2 + (a.y - b.y)^2) / distanceUnit)
         = ceil(141.42 / 0.4)
         = ceil(353.55)
         = 354
```

## Costs

Stations have no building or repair cost.
