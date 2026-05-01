import { Account } from "./account.ts";
import { Area } from "./area.ts";
import type { State } from "./state.ts";
import { addStation } from "./add-station.ts";

/** Shuffle an array */
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Create default start state */
export function init(): State {
  const stationNames = shuffle([
    "Vindballe",
    "Snotterup",
    "Hesselby",
    "Gladsenge",
    "Rønkilde",
    "Tornbjerg",
    "Skovsvig",
    "Bredstrup",
    "Lundager",
    "Grønholt",
    "Sønderlev",
    "Møllely",
    "Asserhøj",
    "Kappels",
    "Vesterbæk",
    "Ørumly",
    "Knudstrup",
    "Bjergmark",
    "Ållerslev",
    "Fuglhede",
    "Ravnsborg",
    "Tolkær",
    "Snogebæk",
    "Gejstrup",
    "Ullerhøj",
  ]);

  const state: State = {
    account: new Account(1000),
    area: new Area(100, 100, 10, 5),
    stationNames,
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
  };

  // Add initial stations
  for (let i = 0; i < 4; i++) addStation(state);

  return state;
}
