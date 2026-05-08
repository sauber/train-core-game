# Network

Management of tracks.

## Properties

- Set of Tracks
- Set of Islands

## Island

A Network is Set of Islands. Each Island is Set of Tracks and Stations
connected. An Island has a single stations if the statiom has no tracks

Islands are recomputed when a track is added or deleted.

## Route

Islands can compute routes from one station to another upon request.

A route is path from one station to another. It's a chain of alternating
Stations and Tracks, each connected to the next item in the chain.

Types of Routes:

- **Shortest**: Only the distance of each track is taken into consideration.
- **Fastest**: Distance and degradation of each track is considered.

## Actions

The Network Agent can autonomusly take any of these actions:

### Add

Conditions:

- A station exist with less than two tracks
- Find nearest station not already connected to isolated (0 tracks) or end (1
  track) station. If such a station exists.
- The price of track from the isolation station to nearest other station is less
  than price of cheapest train type.

Changes:

- Track is build with isolation station and nearest station as endpoints.
- Track added to isolation station
- Track is added to nearest station.
- Track is added to Network Set of tracks
- Islands are recomputed
- Price of track is deducted from Balance
- Report Track addition event to journal

### Repair

Condition:

- A track is broken
- Funds for repair is available

Changes:

- Set Track degraded to 0
- Deduct repair cost from Balance
- Report track repair event to journal

### Delete

If long track could be replaced by two shorter ones, do so.

Conditions:

- Find longest track
- Find end stations of longest track.
- Among all other stations, find the stations with shortest combined station to
  track end stations.
- Confirm both new track distances each are shorter then longest track.

Changes:

- Delete longest track
- Report track deletion to journal.

Even through new imaginary tracks where created for comparison, do not add them
to network. Discard instead.
