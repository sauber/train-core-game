# Population

Manage set of passengers

## Properties

- Set of Passengers

## Actions

Population agent can autonumously take these actions

## Add

Create a new passenger

Conditions:

- A station with tracks exist

Changes:

- Pick random connected station as origin
- Pick random destination in same Island as origin, Destination is different
  from Origin
- Create passenger
- Set passenger location to Origin
- Add Passenger to Origin Station Set of Passengers
- Report passenger create to journal

## Remove

Remove a passenger

Conditions:

- All passengers each having current location same as destination (arrival)

Changes:

- For each station, calculate sum of fees, report sum of fees collected at
  station to journal.
- Delete all arrival passengers from Stations where they arrived
- Delete all arrival passengers from Population

## Fee

To calculate the fee, request shortest route from Origin to Destination. Fee is
a ratio of distance. The exact ratio, typically 5%, is Simulation configuration
parameter.
