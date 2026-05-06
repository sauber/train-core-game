import { assertEquals, assertStringIncludes } from "@std/assert";
import { stationAgent } from "./station-agent.ts";
import { Simulation } from "../simulation/simulation.ts";
import { createStation } from "./create-station.ts";
import { Passenger } from "../passenger/passenger.ts";
import { Track } from "../track/mod.ts";

Deno.test("Station agent spawns passengers", () => {
  const game = new Simulation({ balance: 1000 });

  // Create two stations
  const station1 = createStation(game);
  const station2 = createStation(game);

  // Connect stations with a track to form a network
  const track = new Track(station1, station2);
  track.add(game);

  assertEquals(game.passengers.size, 0);
  stationAgent(game);

  // Should spawn a passenger
  assertEquals(game.passengers.size, 1);
  assertEquals(game.journal.length, 1);
  assertStringIncludes(game.journal[0].message, "Passenger spawned");
});

Deno.test("Station agent collects revenue from arrived passengers", () => {
  const game = new Simulation({ balance: 1000 });

  // Create two stations
  const station1 = createStation(game);
  const station2 = createStation(game);

  // Manually add a passenger at station1 going to station1 (arrived)
  const passenger = new Passenger(station2, station1);
  station1.passengers.add(passenger);
  game.passengers.add(passenger);

  assertEquals(station1.revenue, 0);
  stationAgent(game);

  // Passenger should be removed and revenue collected
  assertEquals(game.passengers.size, 0);
  assertEquals(station1.passengers.size, 0);
  assertEquals(station1.revenue > 0, true);
  assertStringIncludes(game.journal[0].message, "Passenger arrived");
});

Deno.test("Station agent grows capacity with activity", () => {
  const game = new Simulation({ balance: 1000 });

  const station = createStation(game);
  station.activity = 250; // Should trigger capacity increase to 3
  stationAgent(game);

  assertEquals(station.platforms, 3);
  assertStringIncludes(game.journal[0].message, "capacity increased");
});
