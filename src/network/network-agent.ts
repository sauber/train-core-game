import type { Agent, iSimulation, iStation } from "../types.ts";

/**
 * Network agent - repairs broken tracks and connects isolated stations
 */
export const networkAgent: Agent = (sim: iSimulation): void => {
  // Repair broken tracks first
  const brokenTracks = Array.from(sim.network.tracks).filter((track) =>
    track.isBroken
  );
  for (const track of brokenTracks) {
    if (sim.balance >= 100) { // Assume repair cost is 100
      track.repair();
    }
  }

  // Connect isolated stations
  const allStations = Array.from(sim.area.stations);
  const isolatedStations = allStations.filter((station) =>
    station.numTrack() === 0
  );
  const connectedStations = new Set<iStation>();

  for (const station of isolatedStations) {
    if (connectedStations.has(station)) continue;

    // Find nearest station that is not already connected
    let nearestStation = null;
    let minDist = Infinity;

    for (const other of allStations) {
      if (other === station) continue;
      if (connectedStations.has(other)) continue;
      const dist = Math.hypot(
        station.location.x - other.location.x,
        station.location.y - other.location.y,
      );
      if (dist < minDist) {
        minDist = dist;
        nearestStation = other;
      }
    }

    if (nearestStation && sim.balance >= 50) { // Assume track cost is 50
      sim.createTrack(station, nearestStation);
      connectedStations.add(station);
      connectedStations.add(nearestStation);
    }
  }
};
