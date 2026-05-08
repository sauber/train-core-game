import { assertEquals } from "@std/assert";
import { Station } from "./station.ts";
import { Location } from "../area/mod.ts";

Deno.test("Station - platform growth state machine", () => {
  const location: Location = { x: 0, y: 0 };
  const station = new Station("Test Station", location, 1);

  // Initial state
  assertEquals(station.platforms, 1);
  assertEquals(station.activity, 0);

  // Activity 0-99: should remain at 1 platform
  for (let i = 0; i < 99; i++) {
    station.updateActivity();
  }
  assertEquals(station.activity, 99);
  assertEquals(station.platforms, 1);

  // Activity 100: should grow to 2 platforms
  station.updateActivity();
  assertEquals(station.activity, 100);
  assertEquals(station.platforms, 2);

  // Activity 101-249: should remain at 2 platforms
  for (let i = 0; i < 149; i++) {
    station.updateActivity();
  }
  assertEquals(station.activity, 249);
  assertEquals(station.platforms, 2);

  // Activity 250: should grow to 3 platforms
  station.updateActivity();
  assertEquals(station.activity, 250);
  assertEquals(station.platforms, 3);

  // Activity 251-499: should remain at 3 platforms
  for (let i = 0; i < 249; i++) {
    station.updateActivity();
  }
  assertEquals(station.activity, 499);
  assertEquals(station.platforms, 3);

  // Activity 500: should grow to 4 platforms
  station.updateActivity();
  assertEquals(station.activity, 500);
  assertEquals(station.platforms, 4);

  // Activity 501+: should remain at 4 platforms
  for (let i = 0; i < 100; i++) {
    station.updateActivity();
  }
  assertEquals(station.activity, 600);
  assertEquals(station.platforms, 4);
});

Deno.test("Station - platform growth generates revenue", () => {
  const location: Location = { x: 0, y: 0 };
  const station = new Station("Test Station", location, 1);

  // Initial revenue
  assertEquals(station.revenue, 0);

  // Grow to 2 platforms (should generate 50 revenue)
  for (let i = 0; i < 100; i++) {
    station.updateActivity();
  }
  assertEquals(station.revenue, 50);

  // Grow to 3 platforms (should generate another 50 revenue)
  for (let i = 0; i < 150; i++) {
    station.updateActivity();
  }
  assertEquals(station.revenue, 100);

  // Grow to 4 platforms (should generate another 50 revenue)
  for (let i = 0; i < 250; i++) {
    station.updateActivity();
  }
  assertEquals(station.revenue, 150);
});
