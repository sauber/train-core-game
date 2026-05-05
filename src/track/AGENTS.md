# Track

## Connect stations

A track connects two Stations directly.

## Distance

Track distance equals the distance between its connected Stations on the Area
map, as defined in `src/area/AGENTS.md`. See that document for the distance
calculation rules and units.

## Degraded

Tracks degrade for every train pass. When fully degraded, Track is Broken,
otherwise Operational.

## Building

Building a track has cost: cost = distance * buildunitcost

## Repairing

Repairing a track has cost: cost = distance * repairunitcost
