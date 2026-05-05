# Agent Decision Making

Agents make discrete decisions about object transitions in the simulation. Given a number of available transitions for an object, the relevant agent picks the best one according to defined rules and objectives.

## Decision Domains

Examples of agent decisions:

- **Passenger boarding**: Whether a waiting passenger boards an arriving train
- **Train routing**: Which track a departing train takes from a station
- **Train departure**: Whether a train leaves a station
- **Station placement**: Where to build a new station
- **Route generation**: Path planning for trains or passengers
- **Track construction**: Whether to build a new track between stations
- **Vehicle repair**: Whether to repair a broken train or track
- **Spawning**: When and where to spawn new passengers or trains

## Execution Model

In a simulation, all transitions are performed by agents. In a game, some transitions are performed by the player, the rest by agents.

Agents report actions to the simulation journal. They do not directly mutate the simulation state — instead, actions are recorded in the journal and applied in a controlled manner.

## Current Agents

### Fleet Agent
Decides train insertion and repair operations:
- Inserts new trains when capital allows and network capacity exists
- Repairs broken trains when cost-effective

### Track Agent
Decides track construction and repair:
- Builds tracks to connect unconnected stations
- Repairs broken tracks when affordable
- Prioritizes network connectivity

### Area Agent
Decides station creation:
- Builds new stations when capital milestones are reached
- Places stations at valid locations respecting minimum distance constraints
- Names new stations

### Report Agent
Reports state changes for monitoring and debugging:
- Logs significant events
- Tracks simulation progress

## Planned Agents (Not Yet Implemented)

### Passenger Agent
Would control passenger movement decisions:
- Boarding/disembarkment at stations
- Route selection based on destination
- Waiting vs. taking available transport

### Train Agent
Would control train operations:
- Route generation and updates
- Departure timing
- Speed management
- Arrival handling

### Station Agent
Would control station-level operations:
- Passenger spawning
- Revenue collection
- Train capacity management
- Boarding coordination

### Network Agent
Would control network-level planning:
- Route planning between stations
- Network connectivity analysis
- Build decision support