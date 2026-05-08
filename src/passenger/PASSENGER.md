# Passenger

Passengers are travellers from one station to another. Origin and destination
are static for each traveller. The objective for a traveller is to reach
destination as fast as possible.

## Properties

- Origin Station
- Destination Station
- Location (Station or Train)
- Route

## Actions

Passenger agent may take one of actions

### Add Route

Get a route

Conditions:

- Passenger has no route.
- Passenger is located at a Station

Changes:

- From Network request Fastest path from current Station to Destination Station.

### Board

Conditions

- Passenger is at a Station
- There are Trains at the station
- One of the trains at station has same next track and next track on passenger
  route.
- Train has free capacity
- Train Door status is Open

Changes:

- Delete Passenger from Station
- Add Passenger to Train
- Set Passenger Location to Train
- Delete Station from Route

## Disembark

Exit train when one of these conditions are met.

Condition #1:

- Passenger Location is a Train
- Train Door status is Exit

Condition #2:

- Passenger Location is a Train
- Train Door status is Open
- Train next Track is different from Passenger next Track

Changes:

- Delete passenger from Train
- Add Passenger to Station
- Delete previuos track from Passenger Route
- Set Passenger Location to Station
