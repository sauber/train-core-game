# Area

The map where stations are placed. When simulation is starting, a few stations
are added automatically.

The Area Agent watches the Simulation Balance, and when increasing tresholds are
reached, a new station is added to the Area.

A Station have a minimum distance to all other stations on the map, to allow
building tracks between them.

Stations have no building or repair cost.

## Distance

All distances in simulation are ratios of Area size, where one distance unit is
1/1000 th of Area width:

```
distanceUnit = 1 / 1000 * simulation.area.width;
```

Distances are calculated as the geometric distance and rounded to a whole number
of units. Example:

```
simulation.area.width = 400;
distanceUnit = 1 / 1000 * simulation.area.width = 0.4;
location a = {x: 100, y: 100};
location b = {x: 200, y: 200};
distance = ceil(sqrt((a.x - b.x)^2 + (a.y - b.y)^2) / distanceUnit) = 354;
```
