import { Account } from "../state/account.ts";
import { Area } from "../state/area.ts";
import type { State } from "../state/state.ts";
import { createStation } from "../factory/create-station.ts";

/** Create default start state */
export function init(): State {
  const state: State = {
    account: new Account(1000),
    area: new Area(100, 100, 10, 5),
    stations: new Set(),
    tracks: new Set(),
    trains: new Set(),
    trainTypes: new Set([
      {
        name: "Local",
        speed: 0.2,
        wear: 0.1,
        cost: 20,
        minimum: 1,
        maximum: 4,
      },
    ]),
    gameover: false,
    tick: 0,
  };

  // Add initial stations
  for (let i = 0; i < 4; i++) createStation(state);

  return state;
}
