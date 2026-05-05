# To Do

Steps to complete towards implementation

## Documentation Issues

- [ ] Root AGENTS.md lists 5 agent types (Passenger, Train, Station, Network, Area) but implementation has fleet, track, area, report agents only
- [ ] Root AGENTS.md describes Network Agent as generating routes for trains, but network-agent.ts only handles track add/repair/remove
- [ ] Root AGENTS.md describes Passenger Agent making boarding/disembark decisions, but no passenger-agent exists
- [ ] Root AGENTS.md describes Train Agent handling routing/departure/arrival, but no train-agent exists
- [ ] Root AGENTS.md describes Station Agent handling revenue/spawning, but no station-agent exists
- [ ] src/agent/AGENTS.md is minimal (16 lines) and doesn't describe actual agents (fleet, track, area, report)
- [ ] src/fleet/AGENTS.md is essentially empty (2 lines) - needs details on fleet agent operations
- [ ] src/track/AGENTS.md needs expansion on degradation mechanics and build/repair costs
- [ ] Simulation step order in root AGENTS.md says "passenger first, area last" but actual order is fleet→track→area→report
- [ ] Actual agent execution order needs to be documented in root AGENTS.md

## Implementation Gaps vs Documentation

- [ ] Station train capacity growth described but not implemented (no station agent exists to manage it)
- [ ] Passenger boarding logic described but not implemented (no passenger agent exists)
- [ ] Train departure logic described but not implemented (no train agent exists)
- [ ] Station revenue collection described but not implemented (no station agent exists)
- [ ] Track degradation on train pass mentioned but not implemented in track.ts
- [ ] Train degradation per distance traveled mentioned but not implemented in train.ts
- [ ] Passenger spawning mentioned as Station Agent responsibility but area agent creates stations
- [ ] Cost module (utils/cost.ts) exists but track build/repair costs are calculated directly in track-agent

## Architecture Inconsistencies

- [ ] Root AGENTS.md says agents don't directly mutate state but report to journal, yet area-agent creates stations without journal entry for creation
- [ ] Agents defined in documentation don't match actual implementation
- [ ] Feature structure says each feature has an agent, but station, passenger, train features lack agents

## Code to Documentation Mismatches

- [ ] area-agent.ts creates stations but doesn't generate random names as documented
- [ ] area-agent.ts creates only one station per tick but documentation doesn't mention this
- [ ] actualBalance property doesn't exist in Simulation (only initalBalance typo in constructor)
- [ ] stationLevels defaults in simulation.ts don't match documentation expectations
- [ ] track-agent builds tracks between unconnected stations but no cost calculation module used

## TODO Items from Existing File

- [ ] Ensure distance units, DU, are used throughout simulation for measuring distance.
- [ ] Ensure speed units, DUPS, are used for specifying train type maximum speed, and for moving trains along on tracks.
- [ ] Invent a central module for calculating costs of items, such as tracks, trains and repairs, instead of letting each agent decide cost by itself.
- [ ] Replace `assert()` methods in testcases, and use more specific `assert*()` functions.
