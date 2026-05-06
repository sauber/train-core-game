# Dashboard TODO

- [ ] Ensure each layer implemented in seperate files and with seperate files of
      test cases.
- [ ] Implement a background layer (e.g., terrain or grid) as described in
      `AGENTS.md` (currently missing).
- [ ] Align line allocation with the percentages specified in `AGENTS.md` (15%
      for events, 15% for inventory). The current implementation uses fixed line
      counts (legend 2, footer 4). Refactor `renderMap` to calculate these
      dynamically based on total height.
- [ ] Add unit tests for the new dynamic line allocation logic to ensure correct
      sizing on different terminal dimensions.
- [ ] Correct typo "alrorithm" to "algorithm" in `src/dashboard/AGENTS.md`.
- [ ] Verify that the map legend and inventory rendering match the intended
      sections (map top, inventory middle, events bottom) and update
      documentation if needed.
- [ ] Ensure `map-agent` correctly clears previous output for all terminal sizes
      (currently assumes previous line count matches output lines).
- [ ] Tighten Station inventory label in map from (example) "P: 4 T: 1" to "P4
      T1".
