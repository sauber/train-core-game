# Fleet

The Fleet manages all trains.

## Properties

- Set of trains

## Actions

The fleet agent can decide to take any of these actions

### Add

Conditions:

- Network Island has at least on track
- Network Island has no trains
- Balance is more than cost of cheapest train

Changes:

- Create a train of type with cost less than balance
- Inserts train at staion in Network with most passengers
- Set Train location to Station.
- Add Train to Fleet
- Subtract build cost from Balance
- Report Train addition to journal

### Repair

Conditions:

- Train status is Broken
- Sufficient funds for repair is available

Changes:

- Set degraded=0 for Train
- Subtract repair cost from Balance
- Report Train repair to journal
