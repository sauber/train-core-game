# DASHBOARD

Give user a visual representation of current simulation status.

Create a fixed sized string (such as 24 lines of 80 chars) for displaying on
terminal.

Use Unicode, Braille chars, and ANSI codes creatively.

## Content

The screen is divided into sections. Map (top), Inventory (middle) and Events
(bottom).

### Events

Use 15% of available lines for displaying most recent events

### Inventory

Use 15% of available lines for displaying Stations, Trains, Balance, Tick

### Map

Use remaining number of lines.

Generates output by merging layers. The layers are from lowest to highest:

- Background
- Frame at edge within canvas size
- Tracks drawn as lines by Braille chars using Bresenham alrorithm
- Stations with names, count of trains and passenger in station
- Trains

## Structure

Each section or layer is in seperate files, and a entrypoint file for dividing
and assembling the parts.
