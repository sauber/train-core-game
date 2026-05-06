import type { Simulation } from "../simulation/simulation.ts";
import type { Station } from "../station/mod.ts";
import type { GridPoint } from "./map-utils.ts";
import { pointKey, toPixelPoint } from "./map-utils.ts";
import {
  createBrailleLayer,
  createFrameLayer,
  createLabelLayer,
  createStationLayer,
  createTrackLayer,
  createTrainLayer,
} from "./map-layers.ts";

export function renderMapCanvas(
  game: Simulation,
  width: number,
  mapHeight: number,
  areaWidth: number,
  areaHeight: number,
): {
  rows: string[];
  stationCellMap: Map<string, Station[]>;
  trainCellMap: Map<string, string>;
} {
  const pixelWidth = width * 2;
  const pixelHeight = mapHeight * 4;

  const { stationPositions, stationCellMap } = createStationLayer(
    game,
    pixelWidth,
    pixelHeight,
    areaWidth,
    areaHeight,
  );
  const { pixels, trainCellMap } = createTrackLayer(
    game,
    stationPositions,
    pixelWidth,
    pixelHeight,
  );
  const brailleRows = createBrailleLayer(pixels, width, mapHeight);
  const { topFrame, bottomFrame, sideFrames } = createFrameLayer(
    width,
    mapHeight,
  );
  const framedRows = brailleRows.map((row, i) => {
    const chars = row.split("");
    chars[0] = sideFrames[i][0];
    chars[width - 1] = sideFrames[i][width - 1];
    return chars.join("");
  });
  const labelRows = createLabelLayer(game, stationPositions, width, mapHeight);
  const mergedRows = framedRows.map((row, i) => {
    const base = row.split("");
    const label = labelRows[i].split("");
    for (let x = 0; x < width; x++) {
      if (label[x] !== " ") base[x] = label[x];
    }
    return base.join("");
  });
  const trainRows = createTrainLayer(trainCellMap, width, mapHeight);
  const finalRows = mergedRows.map((row, i) => {
    const base = row.split("");
    const train = trainRows[i].split("");
    for (let x = 0; x < width; x++) {
      if (train[x] !== " ") base[x] = train[x];
    }
    return base.join("");
  });
  finalRows.unshift(topFrame);
  finalRows.push(bottomFrame);
  return { rows: finalRows, stationCellMap, trainCellMap };
}

// Preserve legend rendering for existing tests
export function renderLegend(game: Simulation): string[] {
  const stationLegend = (Array.from(game.stations) as Station[])
    .map((station) => `${station.name}(${station.trains.size})`);
  const trackLegend = (Array.from(game.tracks) as any[])
    .map((track) => {
      const ends = Array.from(track.stations) as Station[];
      return `${ends.map((s) => s.name).join("-")}(${track.trains.size})`;
    });
  return [
    `Stations: ${stationLegend.join(" ")}`,
    `Tracks: ${trackLegend.join(" ")}`,
  ];
}
