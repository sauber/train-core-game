# Track

A Track connects two Stations directly, enabling train movement between them.

## Distance

Track distance equals the geometric distance between its connected Stations on
the Area map, as defined in `src/area/AGENTS.md`.

Distance is measured in distance units (DU) and rounded to whole numbers.

## States

- **Operational**: Track is functional (degradation < 1.0)
- **Broken**: Track is non-functional (degradation ≥ 1.0)

## Degradation

Tracks degrade each time a train passes over them. The degradation increment
depends on the train's condition and the distance traveled.

When a track becomes fully degraded, it is broken and cannot be traversed until
repaired.

## Building

New tracks can be built between any two stations that are not already directly
connected. The build cost is calculated as:

```
buildCost = distance * buildUnitCost
```

Where `buildUnitCost` is a simulation parameter.

## Repairing

Broken or degraded tracks can be repaired. The repair cost is:

```
repairCost = distance * repairUnitCost
```

Where `repairUnitCost` is a simulation parameter.

Repairing restores the track to operational state (degradation = 0).

## Capacity

Each track can accommodate at most one train at a time. A train must occupy a
track exclusively during transit.
