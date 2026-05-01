# Bane Boss – Game Design Document

## Game Overview

Create a logistics strategy game titled **“Rail Boss”**. The player manages a
railway network, which transports passengers, and earns profit while maintaining
tracks and rolling stock.

---

## Core Game Elements

### Game

- Initializes game
- Expose all the objects enabled in the game
- Expose all the user actions of the game, such as createRandomStation() or
  addTrack().
- Confirm if game is over.

### Account

- The player begins with an initial balance.
- Purchases are paid for by the balance.
- Balance cannot go below 0.
- If not funds are available, then purchases cannot be made.
- Income is added to balance.
- A journal keeps track of all transactions.

### Stations

- Each station has a uniq name chosen from static list of 25 biggest Danish
  cities.
- Has a max number of tracks attached. The number increases as the station
  grows.
- Stations earn revenue. As revenue increases the station grows.
- Stations generate passengers. The rate depends on size of station.
- Passengers can only generated with destinations at other stations reachable
  through the network.
- Newly generated passengers wait at the station where they are generated, until
  they board a train.
- Waiting passengers can be newly generated, or transit from arriving trains.
- Stations announce arriving trans to waiting passengers.

### Ticket

- Passengers pay for fare when reaching destination station.
- The fare is added to station revenue and to player account.
- The fare is calculated based on the geometric distance between original
  station and destination station, and upon the travel time. Further and faster
  is more expensive.

### Passenger

- A passenger have orignal station and destination station.
- A passenger's travel time starts when the passenger is crearted.
- A passenger is deleted from the game after paying travel fare upon arrival.
- A passenger can choose to board the next arriving train, or skip.
- A passenger can choose to disembark at any station.

### Network

- A graph of node (stations) and links (tracks)
- Generates new stations at random locations
- Ensures minimum distance between stations
- Contains all tracks.
- Find shortest path from one station to any other. Destination station may not
  be reachable through existing usable tracks.
- There can only be one track between same two stations.

### Store

- List all items available for purchase

### Track

- Directly links two stations.
- Purchase price depends on distance between stations.
- Tracks degrade with each passing train; when fully worn they become unusable.
  Tracks degrade faster they older they are.
- Degraded tracks must be repaired before trains can use them again. Repair has
  a cost, which will be deducted form players account. When repaired, wear level
  resets to zero, but age remains the same, so the time to next repair
  decreases.
- Repair cost appear in shop.
- Only one train may occupy a track at a time.
- Train speed decreases as track wear increases.
- A track can be removed if no train occupies it.

### Train Type

- Train types vary by name, minimum and maximum passenger capacity, speed, wear
  factor and cost.
- Trains of each type is available in Store.

### Train

- Player can purchase trains and place them on stations.
- Trains travel between stations, carrying passengers.
- A train occupies one or two tracks at any time; the one it's currently running
  on and a reservation of the next track.
- When a train arrives at a station, it changes to the next track, and release
  the previous.
- After changing track, the train needs to reserve the next track after the next
  station.
- It previous to continue by a different track than where it comes from, but
  will go back same track, if there are no other options.
- If multiple next tracks are available, it will pick the station with the
  highest estimated revenue.
- When next track is decided, the track will be reserved. Station at end of
  track will be announced to passengers aboard and to next station.
- Trains will not depart until minimum capacity is met and until next track is
  reserved.
- Trains wear by distance traveled. As wear increases, speed decreases. When
  worn out, the train stops running until repaired. Repair has a cost, which
  appears in shop.
- Travel speed depends on track wear and train wear.
- Trains can be deleted from game. Tracks are released and passengers are
  returned to previuos station.

---

## Development

- **Test‑first development (TDD) is mandatory**: Write the test **before** any
  production code. The test must fail initially, proving that the behavior is
  not yet implemented.
- **Workflow for each new feature**
  1. Create a failing test in `src/<module>.test.ts` describing the desired
     behavior.
  2. Execute `deno test src/<module>.test.ts` and verify the test fails.
  3. Implement the feature in `src/<module>.ts` until the test passes.
  4. Run `deno test` to ensure the entire test suite passes and no regressions
     appear.
- Test files are placed side‑by‑side with their implementation files, e.g.
  `src/ticket.ts` and `src/ticket.test.ts`.
- While implementing, run the module‑specific test:
  `deno test src/<module>.test.ts`.
- After the feature is validated, run the full suite: `deno test`.
- Follow SOLID principles and appropriate design patterns throughout the
  codebase.
