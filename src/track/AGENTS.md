# Track

A Track connects two Stations directly, enabling train movement between them.

## Lifecycle Responsibilities (Network Lifecycle)

- **Add track**: Logged via `game.event()`, build cost deducted from Balance
- **Repair track**: Logged via `game.event()`, repair cost deducted from Balance
- **Delete track**: Logged via `game.event()`, revenue (if any) added to Balance
- Ensures track is linked to both stations before addition
- Ensures stations are updated when track is deleted

## Distance

Track distance equals the geometric distance between its connected Stations on
the Area map, as defined in `src/area/AGENTS.md`.

Distance is measured in distance units (DU) and rounded to whole numbers.

## States

- **New**: Track just added, degradation = 0
- **Operational**: Track is functional (degradation < 1.0)
- **Degrading**: Track degradation increasing with train usage
- **Broken**: Track is non-functional (degradation ≥ 1.0)
- **Repaired**: Track restored to operational state

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
