# Track

A Track connects two Stations directly, enabling train movement between them.

## Properties

- Two Stations, one at each end
- Distance between stations
- Degraded status
- Train, an optional train on track, or it's free from any trains
- Passes

## Actions

### Add Train

Add train, only if track is free and not track is not broken.

### Remove train

When a train is removed, increment number of passes, and increase degradation.
