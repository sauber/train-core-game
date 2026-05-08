# To Do

Pending items are marked as

- [ ] Task description

Completed items are marked as

- [x] Task description

## Documentation

- [ ] Create architecture diagram showing agent flow:
      Population→Fleet→Network→Area

## Area Tasks

### Current State

The Area class manages stations with width, height, and minimum distance
properties. The area-agent.ts handles station creation using AreaLifecycle
class. Station creation follows hardcoded thresholds in simulation.ts
(DEFAULT_STATION_LEVES) but the logic is split between area-agent.ts and
lifecycle class.

### Problems

1. AreaLifecycle class adds unnecessary abstraction - design specifies agents
   should be simple functions
2. Station creation thresholds in simulation.ts don't match AREA.md design
   (design shows 4 stations at balance>=0, then thresholds at 6000,
   10000, 20000)
3. No maximum station limit validation (design says "Number of stations is less
   than simulation maximum")
4. Initial platform count is hardcoded to 1 in area-lifecycle.ts spawn method

### Fix Suggestions

- [ ] Remove lifecycle/area-lifecycle.ts - integrate station creation logic
      directly into area-agent.ts
- [ ] Update simulation.ts DEFAULT_STATION_LEVES to match design: [0, 0, 0, 0,
      6000, 10000, 20000, ...]
- [ ] Add maximum station limit property to Simulation class (configure via
      constructor)
- [ ] Modify area-agent.ts to check station count against maximum before
      spawning
- [ ] Make initial platform count configurable (read from simulation config or
      area-agent)
- [ ] Add method to Area class: validateMinimumDistance(location: Location):
      boolean
- [ ] Add method to Area class: calculateStationDensity(): number

## Station Tasks

### Current State

Station class has platforms, trains, tracks, passengers, revenue, and activity
properties. Platform growth uses thresholds [0→1, 100→2, 250→3, 500→4] which
don't match design. Station-agent.ts handles passenger boarding/disembarking and
revenue collection, but also spawns passengers (should be Population agent's job
per design).

### Problems

1. Platform growth thresholds don't match STATION.md design (design: 0→1, 10→2,
   100→3, 250→4)
2. Transit counting is unclear - design defines transit as "passenger is added
   or removed from Set of passengers", but current implementation counts in
   station-agent.ts mixing boarding/disembarking
3. Station-agent.ts does too much: handles passengers AND spawns new passengers
   (should only handle station operations)
4. Revenue collection logic is in station-agent.ts but design suggests it should
   be part of Population agent's remove action

### Fix Suggestions

- [ ] Remove station-agent.ts - station operations should be handled by Station
      class methods or Area agent
- [ ] Fix platform growth thresholds in station.ts to match design: 0→1, 10→2,
      100→3, 250→4
- [ ] Clarify transit counting: add method to Station to track transits
      (passenger add/remove events)
- [ ] Move passenger spawning logic out of station-agent.ts to population-agent
- [ ] Add method to Station: getCapacityUtilization(): number (trains/platforms
      ratio)
- [ ] Add method to Station: getPassengerFlow(): {boarding: number,
      disembarking: number}
- [ ] Add method to Station: validatePlatformAvailability(): boolean

## Network Tasks

### Current State

Network class computes connected stations and tracks from a starting station.
Network-agent.ts uses add-tracks.ts and repair-tracks.ts functions. The
network-agent calls these functions but doesn't implement track deletion logic
specified in NETWORK.md.

### Problems

1. Network-agent.ts doesn't implement track deletion (design specifies: "If long
   track could be replaced by two shorter ones, do so")
2. Track addition logic in add-tracks.ts checks "isolated station" (0 tracks)
   but design says "station with less than two tracks" (includes end stations
   with 1 track)
3. No validation for cheapest train price check when adding tracks (design:
   "price of track... is less than price of cheapest train type")
4. Network class doesn't recompute islands when track is added/deleted (design:
   "Islands are recomputed when a track is added or deleted")
5. No route calculation methods for "Shortest" and "Fastest" routes (design
   specifies two types)

### Fix Suggestions

- [ ] Remove network-agent.ts - integrate logic into Network class methods
- [ ] Remove network/add-tracks.ts and network/repair-tracks.ts after
      integrating
- [ ] Implement track deletion logic in Network class: findLongestTrack(),
      findShorterReplacement(), deleteTrackAndReconnect()
- [ ] Fix track addition validation: check for stations with <2 tracks (not just
      0 tracks)
- [ ] Add validation: track cost < cheapest train type cost before building
- [ ] Add method to Network: recomputeIslands() - recalculate connected
      components
- [ ] Add method to Network: findIslands(): Set<Set<Station>>
- [ ] Implement route calculation: shortestRoute(origin, destination): Route
- [ ] Implement route calculation: fastestRoute(origin, destination): Route
      (considers degradation)
- [ ] Add method to Network: getEfficiencyMetrics(): {totalTracks: number,
      islands: number, avgTrackLength: number}

## Track Tasks

### Current State

Track class connects two stations with distance and degraded properties. Tracks
have a Trains set (limit 1) for the train on track. Track-agent.ts doesn't exist
as separate file - track operations are in network-agent.ts. Track doesn't have
"passes" property mentioned in TRACK.md.

### Problems

1. Missing "passes" property (design: Track has "Passes" - incremented when
   train removes from track)
2. Train property is Trains set but design suggests single optional train
   ("Train, an optional train on track, or it's free from any trains")
3. No addTrain/removeTrain methods with degradation logic (design specifies
   these actions)
4. Degradation increase on train removal not implemented (design: "increment
   number of passes, and increase degradation")

### Fix Suggestions

- [ ] Add "passes" property to Track class: public passes: number = 0
- [ ] Change trains property from Trains set to optional single train: public
      train: Train | undefined
- [ ] Implement addTrain(train: Train): boolean - check track free and not
      broken
- [ ] Implement removeTrain(): void - increment passes, increase degradation,
      clear train reference
- [ ] Add method to Track: calculateMaintenanceCost(): number (based on distance
      and degradation)
- [ ] Add method to Track: validateCapacity(): boolean (check if track can
      accept train)
- [ ] Add method to Track: degrade(amount: number): void (increase degradation
      over time)

## Fleet Tasks

### Current State

Fleet agent is implemented in fleet-agent.ts which uses FleetLifecycle class.
The fleet-agent checks for broken trains and repairs them, then tries to insert
a train at the first station with the first train type. This doesn't match
design specifications.

### Problems

1. Train insertion logic doesn't match FLEET.md design:
   - Design: "Network Island has at least one track" (current: no check)
   - Design: "Network Island has no trains" (current: no check)
   - Design: "Balance is more than cost of cheapest train" (current: checks
     balance but picks first type)
2. Train insertion picks first station and first train type (design: "Inserts
   train at station in Network with most passengers")
3. FleetLifecycle class adds unnecessary abstraction (design specifies agents
   are simple functions)
4. No validation that inserted train matches passenger demand

### Fix Suggestions

- [ ] Remove fleet-agent.ts - implement fleet logic as simple agent function
- [ ] Remove lifecycle/fleet-lifecycle.ts after integrating
- [ ] Implement proper train insertion logic:
  - Check network islands have tracks
  - Check islands have no trains
  - Find station with most passengers in that island
  - Find affordable train type
- [ ] Add method to Fleet: calculateUtilization(): {active: number, broken:
      number, total: number}
- [ ] Add method to Fleet: validateDeploymentRequirements(island: Network):
      boolean
- [ ] Add method to Fleet: scheduleTrain(island: Network, station: Station,
      type: TrainType): Train

## Train Tasks

### Current State

Train class has states: "idle", "waiting_for_route", "waiting_for_passengers",
"departs", "runs", "arrives", "broken". Design specifies only three states:
"Broken", "Waiting", "Running". Train has no route property, no progress
tracking, no door status.

### Problems

1. State machine doesn't match design:
   - Design: Broken, Waiting, Running
   - Current: idle, waiting_for_route, waiting_for_passengers, departs, runs,
     arrives, broken
2. Missing route property (design: "Route" in properties)
3. Missing progress on track property (design: "Progress on track")
4. Missing door status property (design: "Door status" with values
   Closed/Open/Exit)
5. State transition rules not implemented (design specifies conditions and
   changes for each transition)
6. Speed calculation doesn't match design: "travel speed is type.speed /
   Max(track.degraded, train.degraded)"
7. No "Waiting -> Broken" transition when degraded >= 1.0

### Fix Suggestions

- [ ] Redefine TrainState type to match design: "Broken" | "Waiting" | "Running"
- [ ] Add route property: public route: Route | undefined
- [ ] Add progress property: public progress: number = 0 (0-100%)
- [ ] Add doorStatus property: public doorStatus: "Closed" | "Open" | "Exit" =
      "Closed"
- [ ] Implement state machine logic:
  - Waiting -> Broken: if degraded >= 1.0, set doors to Exit
  - Broken -> Waiting: if degraded < 1.0, set doors to Open
  - Waiting -> Running: if passengers>=1, route assigned, next track free and
    not broken
  - Running -> Waiting: if progress>=100%, capacity available at destination
- [ ] Implement door status changes in state transitions
- [ ] Add method to Train: calculateTravelTime(): number (distance / (speed /
      Max(track.degraded, train.degraded)))
- [ ] Add method to Train: validateBoardingCapacity(): boolean
- [ ] Add method to Train: boardPassenger(passenger: Passenger): boolean
- [ ] Add method to Train: alightPassenger(passenger: Passenger): boolean
- [ ] Add method to Train: calculateFuelConsumption(): number (based on
      distance)

## Population Tasks

### Current State

Population lifecycle is in lifecycle/population-lifecycle.ts. There's no
population-agent.ts file. Passenger spawning is currently done in
station-agent.ts. The design specifies Population manages passengers with Add,
Remove, and Fee actions.

### Problems

1. No population-agent.ts file (design specifies Population agent that
   autonomously takes actions)
2. Passenger spawning in station-agent.ts should be in Population agent
3. No passenger routing logic (design: "Add Route" action when passenger at
   station with no route)
4. No boarding logic (design specifies conditions: at station, trains available,
   matching next track, free capacity, door open)
5. No disembarking logic (design specifies two conditions for exit)
6. No fee calculation (design: "5% of distance" via shortest route)
7. No remove action for arrived passengers (design: calculate fees, delete
   passengers)

### Fix Suggestions

- [ ] Create population-agent.ts with Agent type function
- [ ] Remove lifecycle/population-lifecycle.ts after integrating logic
- [ ] Implement passenger routing in population-agent:
  - Check passengers with no route at station
  - Request fastest route from Network
  - Store route in passenger.route
- [ ] Implement boarding logic:
  - Check passenger at station with trains
  - Find train with matching next track on passenger route
  - Check train has free capacity and door is Open
  - Move passenger from station to train
- [ ] Implement disembarking logic:
  - Condition #1: passenger on train with door status Exit
  - Condition #2: passenger on train with door Open and next track differs from
    train's next track
  - Move passenger from train to station
- [ ] Implement fee calculation: passengerFare(origin, destination): number =
      shortestRouteDistance * 0.05
- [ ] Implement remove action:
  - Find passengers at destination station
  - Calculate total fare for station
  - Report to journal
  - Delete passengers from station and population
- [ ] Add method to Population: validateOriginDestination(origin, destination):
      boolean
- [ ] Add method to Population: calculateDemandPatterns(): Map<Station, number>

## Passenger Tasks

### Current State

Passenger class has origin, destination, location properties. No route property.
Movement logic is basic with TODO comments for validation. Design specifies
passenger has Route property and agent takes actions.

### Problems

1. Missing route property (design: "Route" in properties)
2. Passenger move() method has TODO for validation (design specifies conditions
   for boarding/disembarking)
3. No validation that passenger origin and destination are in same island
   (design: "Pick random destination in same Island as origin")
4. Location type includes Train but design suggests passenger location is
   Station or Train

### Fix Suggestions

- [ ] Add route property to Passenger: public route: Route | undefined
- [ ] Implement route request: requestRoute(network: Network): void
- [ ] Add validation in move() method:
  - Boarding: check train at station, matching next track, free capacity, door
    open
  - Disembarking: check door status Exit or Open with different next track
- [ ] Add method to Passenger: validateMovementConstraints(): boolean
- [ ] Add method to Passenger: estimateTravelTime(): number
- [ ] Add method to Passenger: getNextTrack(): Track | undefined (from route)

## Simulation Tasks

### Current State

Simulation class has balance, stations (via area), tracks, trains, passengers,
tick, journal. Agent execution order in run-simulation.ts is: fleetAgent,
trackAgent, areaAgent, stationAgent, mapAgent. Design specifies:
Population→Fleet→Network→Area.

### Problems

1. Agent execution order doesn't match design:
   - Design: Population -> All Passenger Agents -> Population Agent Fleet -> All
     Train Agents -> Fleet Agent Network -> All Track Agents -> Network Agent
     Area -> All Station Agents -> Area Agent
   - Current: fleetAgent, trackAgent, areaAgent, stationAgent, mapAgent
2. No clear separation of factory agents vs object agents (design specifies
   factory agents call object agents)
3. is-terminated.ts logic is separate but should be integrated into simulation
   core
4. run-simulation.ts is a separate file but should be handled by
   simulation.run() method

### Fix Suggestions

- [ ] Fix agent execution order in simulation.run() to match design:
  - Population agent (which calls passenger agents internally)
  - Fleet agent (which calls train agents internally)
  - Network agent (which calls track agents internally)
  - Area agent (which calls station agents internally)
- [ ] Remove simulation/run-simulation.ts after integrating into simulation.ts
- [ ] Remove simulation/is-terminated.ts - integrate termination logic into
      simulation.ts
- [ ] Remove simulation/agent.ts - Agent type should be defined in simulation.ts
- [ ] Add method to Simulation: validateStateConsistency(): boolean
- [ ] Add method to Simulation: pause() and resume() for pause/resume
      functionality
- [ ] Add method to Simulation: exportState(): string (for debugging)
- [ ] Add method to Simulation: importState(data: string): void (from save file)
- [ ] Add method to Simulation: generateReport(): {balance: number, stations:
      number, tracks: number, trains: number, passengers: number}

## Lifecycle Tasks

### Current State

Lifecycle base class in lifecycle/lifecycle.ts defines abstract spawn and
destroy methods. Concrete lifecycles (AreaLifecycle, NetworkLifecycle,
FleetLifecycle, PopulationLifecycle, TrainLifecycle) implement these. Design
doesn't mention lifecycle classes - agents are simple functions.

### Problems

1. Lifecycle abstraction adds unnecessary complexity (design specifies simple
   agent functions)
2. Inconsistent event journaling across lifecycle implementations
3. Balance handling is inconsistent (some lifecycles adjust balance, others
   don't)
4. TrainLifecycle has spawn/destroy/move/breakTrain/repairTrain methods but
   design doesn't specify lifecycle pattern

### Fix Suggestions

- [ ] Remove lifecycle/lifecycle.ts - integrate logic into agent functions
- [ ] Remove all lifecycle implementations after integrating:
  - lifecycle/area-lifecycle.ts
  - lifecycle/network-lifecycle.ts
  - lifecycle/fleet-lifecycle.ts
  - lifecycle/population-lifecycle.ts
  - lifecycle/train-lifecycle.ts
- [ ] Ensure all agent functions use game.event() for journaling
- [ ] Ensure all agent functions properly adjust game.balance
- [ ] Add validation helpers if needed: validateObjectRelationships(),
      cleanupOnDestruction()

## Utils Tasks

### Current State

Utils contains cost.ts, speed.ts, wear.ts with type definitions. There are also
cost-calculator.ts, limitset.ts, shuffle.ts, speed.ts, wear.ts. Design doesn't
specify separate utils - these should be part of object implementations.

### Problems

1. Cost, Speed, Wear types are separate but design integrates them into object
   properties
2. No cost calculation functions matching design specifications (track cost,
   train cost, repair cost, fare calculation)
3. Speed calculation for trains doesn't match design formula

### Fix Suggestions

- [ ] Remove utils/cost.ts - integrate Cost type into object implementations
- [ ] Remove utils/speed.ts - integrate Speed type into TrainType
- [ ] Remove utils/wear.ts - integrate Wear/WearRatio types into objects
- [ ] Verify/implement cost calculations:
  - trackBuildCost(track, game): number
  - trainPurchaseCost(type): number
  - trainRepairCost(type): number
  - trackRepairCost(track, game): number
  - passengerFare(origin, destination): number = distance * 0.05
- [ ] Add method to Utils: validateBalanceConstraints(game): boolean
- [ ] Add method to Utils: calculateEconomicIndicators(game): {revenue: number,
      costs: number, profit: number}

## Dashboard Tasks

### Current State

Dashboard contains visualization components: background-layer.ts,
braille-layer.ts, dashboard.ts, frame-layer.ts, inventory.ts, journal.ts,
layer.type.ts, map-agent.ts, map-utils.ts, station-layer.ts, track-layer.ts,
train-layer.ts. Map-agent.ts is listed in run-simulation.ts agents.

### Problems

1. map-agent.ts is included in simulation agents but should be separate from
   simulation logic
2. Dashboard visualization should accurately reflect simulation state
3. No display of network connectivity status
4. No display of passenger flow statistics
5. No display of economic indicators

### Fix Suggestions

- [ ] Remove dashboard/map-agent.ts - map visualization should not be a
      simulation agent
- [ ] Ensure dashboard reads simulation state directly (not via agent pattern)
- [ ] Add method to Dashboard: displayNetworkConnectivity(network: Network):
      void
- [ ] Add method to Dashboard: displayPassengerFlow(station: Station): void
- [ ] Add method to Dashboard: displayEconomicIndicators(game: Simulation): void
- [ ] Add method to Dashboard: displayFleetStatus(fleet: Fleet): void
