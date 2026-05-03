# Game State

Ensure game is always in valid state.

## Rules for state of game objects

### Game

- Game is in one of the following states: Not started, started, growing,
  profitting, game over
- Game transits states forward, never backwards.

### Area

- Ensure minimum distance within edge
- Ensure minimum distance between any two stations

### Station

- Stations are located on the area
- At least one platform per station
- Maximum one train on each platform

### Track

- One track connects two stations
- Only one track connects same two stations
- Maximum 1 train on each track
- Degraded state between 0 and 1

### Train

- Transports passengers
- Valid states:
  - Route (waiting for, if needed)
  - Boarding (waiting for passengers to enter train)
  - Departing (waiting for track to be available)
  - Running (on track)
  - Arrived (waiting for platform)
  - Disembark (waiting for passengers to leave train)
  - Degraded (waiting for repair of train, if needed)
- State transitions forwards in a loop, not backwards.
- Degraded state between 0 and 1
- Passenger capacity not exceeded

### Passenger

- A traveler from origin station to destination station
- Located on a station or on a train, never both

### Route

- A chain of tracks between station A and station B
- B is reachable from A
