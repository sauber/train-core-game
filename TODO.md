# To Do

Steps to complete towards implementation

## Station Tasks

### Capacity Growth

- [x] Add activity counter to Station class
  - Suggestion: Add `activity: number = 0` property to track
    boardings/disembarkments
- [ ] Increment activity on passenger events
  - Suggestion: In station agent, increment station.activity when passengers
    board/disembark
- [ ] Implement capacity threshold checks
  - Suggestion: Create function to calculate new capacity based on activity
    (100→2, 250→3, etc.)
- [ ] Update station platform limit when capacity grows
  - Suggestion: Modify station.trains.limit and station.platforms when threshold
    reached

### Revenue Collection

- [ ] Add revenue property to Station class
  - Suggestion: Add `revenue: number = 0` to Station
- [ ] Detect arrived passengers at stations
  - Suggestion: In station agent, check passengers where passenger.destination
    === station
- [ ] Calculate fare for arrived passengers
  - Suggestion: Use Euclidean distance between origin/destination, multiply by
    rate (e.g., 0.5)
- [ ] Add fare to station revenue and remove passenger
  - Suggestion: station.revenue += fare, remove from station.passengers and
    game.passengers
- [ ] Transfer station revenue to simulation balance
  - Suggestion: Periodically (end of tick?) add station.revenue to game.balance,
    reset station.revenue

### Passenger Spawning

- [ ] Move passenger spawning from area agent to station agent
  - Suggestion: Remove passenger creation from area-agent.ts, add to
    station-agent.ts
- [ ] Implement spawning frequency logic
  - Suggestion: Spawn one passenger per station per tick, or based on station
    size/activity
- [ ] Ensure spawning only when network exists
  - Suggestion: Check game.stations.size >= 2 before calling createPassenger

## Track Tasks

### Degradation on Train Pass

- [ ] Add degradation increment when train moves on track
  - Suggestion: In train movement logic, track.degraded += wear rate (e.g., 0.1
    per pass)
- [ ] Implement repair triggering based on degradation
  - Suggestion: In track agent, check if track.degraded > threshold, trigger
    repair
- [ ] Add degradation visualization
  - Suggestion: Update track display to show degraded state (color, opacity)

## Passenger Tasks

### Boarding Logic

- [ ] Create Passenger Agent
  - Suggestion: New file src/passenger/passenger-agent.ts with agent function
- [ ] Implement route planning for passengers
  - Suggestion: When passenger spawns, calculate shortest path to destination
- [ ] Check for compatible trains at station
  - Suggestion: Find trains whose route matches passenger's next segment
- [ ] Board passenger onto train
  - Suggestion: Move passenger from station to train.passengers, update
    locations
- [ ] Prevent boarding full trains
  - Suggestion: Check train.passengers.size < train.type.maximum before boarding

### Disembarkment Logic

- [ ] Check for destination reached on train arrival
  - Suggestion: When train arrives at station, check passengers whose
    destination matches
- [ ] Disembark passengers at destination
  - Suggestion: Move from train.passengers to station.passengers
- [ ] Handle route continuation or end
  - Suggestion: If passenger has more route, keep on train; else disembark

## Train Tasks

### Departure Logic

- [ ] Create Train Agent
  - Suggestion: New file src/train/train-agent.ts with agent function
- [ ] Check trains ready to depart
  - Suggestion: Find trains at stations with assigned routes
- [ ] Validate departure conditions
  - Suggestion: Check platform availability, route exists, train not full if
    needed
- [ ] Move train from station to track
  - Suggestion: Update train.location to next track segment
- [ ] Update train route progress
  - Suggestion: Advance route index, set next destination

### Degradation per Distance

- [ ] Add distance tracking to train movement
  - Suggestion: When train moves between locations, calculate distance traveled
- [ ] Increment train degradation based on distance
  - Suggestion: train.degraded += distance * train.type.wear
- [ ] Implement repair triggering for degraded trains
  - Suggestion: In fleet agent, check train.degraded > threshold, trigger repair
- [ ] Add degradation effects on performance
  - Suggestion: Reduce train speed or increase failure chance based on
    degradation
