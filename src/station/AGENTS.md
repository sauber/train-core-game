# Station

Has a name.

Location is somewhere on Area.

Has 0 or more waiting passengers.

Has 0 or more tracks connecting to other stations.

Has a capacity for waiting trains. The capacity is determined by the number of
boardings and disembarkments at the station. Train capacity never decreases.

There is no capacity limit for the number of connecting tracks or the number of
waiting passengers at a station.

## Train capacity growth

The Station Agent maintains a cumulative count of boardings and disembarkments
at the station. When the cumulative count reaches predefined thresholds, the
train capacity is expanded.

Capacity thresholds are simulation parameters with the following defaults:

- 0 boardings/disembarkments → capacity 1 train
- 100 boardings/disembarkments → capacity 2 trains
- 250 boardings/disembarkments → capacity 3 trains
- 500 boardings/disembarkments → capacity 4 trains

Train capacity always increases monotonically and never decreases.

## Revenue collection

The Station Agent examines all passengers waiting at the station. For each
passenger whose destination matches the station, the agent:

1. Calculates the fare based on the shortest path distance from the passenger's
   origin station to the current station.
2. Adds the fare to the station's revenue.
3. Removes the passenger from the simulation.

Station revenue is transferred to the Simulation Balance each tick.

## Passenger spawning

The Station Agent is responsible for spawning new passengers at the station.
Newly spawned passengers have a random origin and destination within the
network. The frequency and volume of spawned passengers may vary based on
simulation phase or station characteristics.
