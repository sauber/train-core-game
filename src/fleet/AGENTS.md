# Fleet

The Fleet manages all trains in the simulation and handles train lifecycle
operations through the Fleet Lifecycle class.

## Lifecycle Responsibilities

- **Add train**: Logged via `game.event()`, purchase cost deducted from Balance
- **Repair train**: Logged via `game.event()`, repair cost deducted from Balance
- **Delete train**: Logged via `game.event()`, revenue (if any) added to Balance
- Ensures train is properly linked to stations before deletion

## Responsibilities

### Train Insertion

- Adds new trains to the network when capital allows and capacity exists
- Selects initial station placement from unconnected or under-served stations
- Respects train capacity limits at stations

### Train Repair

- Repairs broken trains when cost-effective
- Prioritizes trains that can become operational quickly
- Considers repair cost vs. train value and network needs

## Decision Logic

The Fleet Agent executes each simulation tick and makes one decision per tick:

1. If there are broken trains and sufficient funds, repair the most
   cost-effective train
2. Otherwise, if capital and station capacity allow, insert a new train

## Train States

- **Idle**: Train not assigned to any route
- **Waiting for route**: Train at station waiting for route assignment
- **Waiting for passengers**: Train at station waiting for passengers to board
- **Departs**: Train leaves station onto track
- **Runs**: Train moving along track
- **Arrives**: Train reaches destination station
- **Broken**: Train has degraded ≥ 1.0 and cannot move or carry passengers

## Cost Considerations

- Train purchase cost: per-type fixed cost (deducted via Lifecycle)
- Train repair cost: proportional to degradation level (deducted via Lifecycle)
- Opportunity cost: lost revenue while trains are broken
