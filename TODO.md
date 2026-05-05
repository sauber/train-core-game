# To Do

Steps to complete towards implementation

## Documentation Issues

- [x] Root AGENTS.md — clarified Current Agents (fleet, track, area, report) and
      Planned Agents (passenger, train, station, network), documented actual
      agent execution order
- [x] src/agent/AGENTS.md — expanded from 16 lines to comprehensive agent
      decision-making framework
- [x] src/fleet/AGENTS.md — expanded from 2 lines to cover train insertion,
      repair, states, and cost considerations
- [x] src/track/AGENTS.md — expanded from 24 lines to cover states, degradation,
      building, repairing, and capacity
- [x] src/network/AGENTS.md — clarified no Network Agent exists yet, added
      current implementation details
- [x] src/passenger/AGENTS.md — clarified current vs planned state, passenger
      lifecycle
- [x] src/station/AGENTS.md — clarified current vs planned state,
      revenue/spawning not yet implemented
- [x] src/train/AGENTS.md — clarified current vs planned state,
      route/departure/driving not yet implemented
- [x] src/simulation/AGENTS.md — corrected agent execution order, clarified
      lifecycle and phases

## Architecture Inconsistencies

- [x] Root AGENTS.md says agents don't directly mutate state but report to
      journal, yet area-agent creates stations without journal entry for
      creation — CLARIFIED: agents directly mutate state AND report to journal.
      Journal is for observation, not transaction replay.
- [x] Agents defined in documentation don't match actual implementation — FIXED:
      Network Agent was documented as non-existent but actually exists. Updated
      both root and simulation AGENTS.md to list Network Agent as current.
- [x] Feature structure says each feature has an agent, but station, passenger,
      train features lack agents — ACKNOWLEDGED: these agents are planned but
      not yet implemented per existing documentation. Will be added in future.
- [x] Invent a central module for calculating costs of items, such as tracks,
      trains and repairs, instead of letting each agent decide cost by itself. —
      DONE: Created src/utils/cost-calculator.ts with unified cost functions.
      Updated track/cost.ts to re-export, fleet agents to use centralized costs.

## Code to Documentation Mismatches

- [x] area-agent.ts creates stations but doesn't generate random names as
       documented (uses createStationName utility) — VERIFIED: It does use
       createStationName via create-station.ts.
- [x] area-agent.ts creates only one station per tick but documentation doesn't
       mention this — FIXED: Documented in area/AGENTS.md.
- [x] actualBalance property typo in Simulation constructor (should be
       initialBalance) — FIXED: Changed initalBalance to initialBalance.
- [x] stationLevels defaults in simulation.ts don't match documentation
       expectations — VERIFIED: No conflicting documentation found; behavior
       consistent with area-agent usage.
- [x] track-agent builds tracks between unconnected stations but no cost
       calculation module used — VERIFIED: Uses trackBuildCost from cost.ts which
       now re-exports from cost-calculator.ts.

## Implementation Gaps vs Documentation

- [ ] Station train capacity growth described but not implemented (no station
      agent exists to manage it)
- [ ] Passenger boarding logic described but not implemented (no passenger agent
      exists)
- [ ] Train departure logic described but not implemented (no train agent
      exists)
- [ ] Station revenue collection described but not implemented (no station agent
      exists)
- [ ] Track degradation on train pass mentioned but not implemented in track.ts
- [ ] Train degradation per distance traveled mentioned but not implemented in
      train.ts
- [ ] Passenger spawning mentioned as Station Agent responsibility but area
      agent creates stations
- [ ] Cost module (utils/cost.ts) exists but track build/repair costs are
      calculated directly in track-agent — FIXED: Now uses centralized
      cost-calculator.ts via re-exports.
