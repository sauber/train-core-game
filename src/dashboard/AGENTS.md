# DASHBOARD

Visual representation of simulation state through layered rendering. Implements:

- Braille character mapping for terminal output
- ANSI escape sequences for terminal control
- Layered composition of map, inventory, and event sections

## Content

The dashboard is composed of three primary sections:

1. **Map (70% of screen)**
   - Rendered using Braille characters and frame layers
   - Implemented in: map-canvas.ts, braille-layer.ts, frame-layer.ts
   - Uses Bresenham algorithm for track rendering

2. **Inventory (15% of screen)**
   - Shows real-time game state metrics
   - Implemented in: inventory.ts
   - Displays: Tick count, Balance

3. **Events (15% of screen)**
   - Shows recent simulation events
   - Implemented in: journal.ts
   - Limited to last 3 events by default

## Structure

Modular architecture with dedicated layers:

- map-canvas.ts: Coordinates overall rendering
- background-layer.ts: Base canvas
- frame-layer.ts: Border framing
- braille-layer.ts: Character mapping
- track-layer.ts: Track rendering
- station-layer.ts: Station visualization
- train-layer.ts: Train positioning
- label-layer.ts: Text annotations
- map-utils.ts: Geometric calculations

The dashboard is assembled by dashboard.ts which combines layers in this order:

1. Background
2. Frame
3. Tracks
4. Stations
5. Trains
6. Labels
7. Inventory
8. Events

The mapAgent handles real-time updates by clearing previous output and redrawing
the map at each simulation step using ANSI escape sequences for in-place
updates.
