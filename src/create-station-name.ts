// Name bases
const names = [
  "Vind",
  "Snotte",
  "Hessel",
  "Glad",
  "Røn",
  "Torn",
  "Skovs",
  "Bred",
  "Lund",
  "Grøn",
  "Sønder",
  "Mølle",
  "Asser",
  "Kappel",
  "Vester",
  "Ørum",
  "Knud",
  "Hasse",
  "Ållers",
  "Fugl",
  "Ravns",
  "Tol",
  "Snoge",
  "Gej",
  "Uller",
  "Ål",
  "Es",
  "Skal",
  "Vod",
  "Sul",
  "Ros",
];

const places = [
  "balle",
  "rup",
  "drup",
  "by",
  "senge",
  "kilde",
  "bjerg",
  "vig",
  "strup",
  "ager",
  "holt",
  "lev",
  "ly",
  "høj",
  "bæk",
  "mark",
  "hede",
  "borg",
  "kær",
  "løse",
  "huse",
  "havn",
  "ring",
  "sø",
  "bro",
];

/** Already created names */
const uniq = new Set<string>();

/** Create a uniq station name */
export function createStationName() {
  while (true) {
    const name = names[Math.floor(Math.random() * names.length)] +
      places[Math.floor(Math.random() * places.length)];
    if (!uniq.has(name)) {
      uniq.add(name);
      return name;
    }
  }
}
