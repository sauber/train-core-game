# To Do

Steps to complete towards implementation

## Documentation Issues

- [x] Root AGENTS.md — clarified Current Agents (fleet, track, area, report) and Planned Agents (passenger, train, station, network), documented actual agent execution order
- [x] src/agent/AGENTS.md — expanded from 16 lines to comprehensive agent decision-making framework
- [x] src/fleet/AGENTS.md — expanded from 2 lines to cover train insertion, repair, states, and cost considerations
- [x] src/track/AGENTS.md — expanded from 24 lines to cover states, degradation, building, repairing, and capacity
- [x] src/network/AGENTS.md — clarified no Network Agent exists yet, added current implementation details
- [x] src/passenger/AGENTS.md — clarified current vs planned state, passenger lifecycle
- [x] src/station/AGENTS.md — clarified current vs planned state, revenue/spawning not yet implemented
- [x] src/train/AGENTS.md — clarified current vs planned state, route/departure/driving not yet implemented
- [x] src/simulation/AGENTS.md — corrected agent execution order, clarified lifecycle and phases

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

- [ ] area-agent.ts creates stations but doesn't generate random names as documented (uses createStationName utility)
- [ ] area-agent.ts creates only one station per tick but documentation doesn't mention this
- [ ] actualBalance property typo in Simulation constructor (should be initialBalance)
- [ ] stationLevels defaults in simulation.ts don't match documentation expectations
- [ ] track-agent builds tracks between unconnected stations but no cost calculation module used

## TODO Items from Existing File

- [ ] Ensure distance units, DU, are used throughout simulation for measuring distance.
- [ ] Ensure speed units, DUPS, are used for specifying train type maximum speed, and for moving trains along on tracks.
- [ ] Invent a central module for calculating costs of items, such as tracks, trains and repairs, instead of letting each agent decide cost by itself.
- [ ] Replace `assert()` methods in testcases, and use more specific `assert*()` functions.
