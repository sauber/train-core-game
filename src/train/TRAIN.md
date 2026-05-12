# Train

A Train is a carrier of passengers that moves between stations along tracks.

## Properties

- Route
- Type
- State
- Degraded
- Location
- Progress on track
- Set of Passengers aboard
- Door status

## Train Type

Train types vary by name, speed, cost, and passenger capacity.

## Location

- Train is at any time only at one location, either at a station or a track.
- Train can relocate from a station to a track connected to the station when
  there are not other trains on the track.
- Train can relocate from a track to a connected station when there is free
  capacity for trains at the station.

## States

- **Broken**: Train is not operational. Passengers must disembark.
- **Waiting**: (Default state) Train is at station and missing passengers, route
  or free track. Passenger may board or disembark.
- **Running**: Train is on track and is moving down the track. Passenger may not
  board or disembark.

## State Transition Rules

The train agent will follow the rules below for changing state of train.

Rules for changing state:

### Waiting -> Broken

Conditions:

- Degraded ≥ 1.0

Changes:

- Set Doors to Exit

### Broken -> Waiting

Conditions:

- Degraded < 1.0

Changes:

- Set Doors to Open

### Waiting -> Running

Conditions:

- Passengers>=1
- Route is assigned
- Next Track is free
- Next Track is not broken

Change:

- Set Doors to Closed
- Set Progress to 0
- Delete Station from Route
- Set Location to Track
- Delete Train from Station
- Add Train to track
- Set progress to 0

## Running -> Waiting

Condition:

- Progress>=100%
- Capacity available at destination station

Change:

- Degraded is increase according to distance traveled in previuos track
- Delete Track from Route
- Request next route from Network if Route completed.
- Delete Train from Track
- Add Train to Station
- Set location to Station
- Set Doors to Open

## Speed

A train progresses down a track each simulation tick until reaching the other
end.

Travel speed is type.speed / Max(track.degraded, train.degraded)

Time to traverse a track = ceil(track distance / travel speed).
