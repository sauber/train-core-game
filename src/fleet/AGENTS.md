# Fleet

The Fleet manages all trains in the simulation and handles train lifecycle operations.

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

1. If there are broken trains and sufficient funds, repair the most cost-effective train
2. Otherwise, if capital and station capacity allow, insert a new train

## Train States

- **Operational**: Train is functional and can transport passengers
- **Broken**: Train has degraded ≥ 1.0 and cannot move or carry passengers

## Cost Considerations

- Train purchase cost: per-type fixed cost
- Train repair cost: proportional to degradation level
- Opportunity cost: lost revenue while trains are broken