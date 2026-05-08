# Area

An area is the board of the Simulation. Stations are placed in the area.

## Location

A place in the Area with X, Y coordinates.

## Distance

The distance between two locations.

## Properties

- Width
- Height
- Set of Stations

## Actions

The Area Agent can decide to take any of these actions

### Add

Create a new station

Conditions:

- Balance has reached new threshold level
- Number of stations is less than simulation maximum

Changes:

- A random location is identified with a minimum distance to all other stations.
- A name for the station is decided.
- The stations is added to Area Set of Stations.
- Report station addition to journal.

## Thresholds

When simulation balance reaches a certain threshold, a new station can be added.
The threshold levels are configured in the Simulation. Examples:

- Station 1: Balance >= 0
- Station 2: Balance >= 0
- Station 3: Balance >= 0
- Station 4: Balance >= 0
- Station 5: Balance >= 6000
- Station 6: Balance >= 10000
- Station 7: Balance >= 20000

In this example 4 stations are added immediately at simulation start, and
stations 5-7 are added when balance increases above defined threshold. In this
example the maximum number of stations is 7.

Stations are never removed.
