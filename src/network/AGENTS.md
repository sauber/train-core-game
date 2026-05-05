# AGENTS.md

## Network

A Network is a collection of Stations connected by tracks. There might be
multiple Networks in the Simultion, which cannot reach each other. A Network
might be as small as a single Station without any Tracks.

The Network Agent decides to add, repair or remove tracks across all networks.

## Route

A Route is a chain of stations and tracks to get from one Station to another.
The Shortest Route is the smallest distance, and the Fastest Route is smallest
distance but where each track is divided by track degradation.
