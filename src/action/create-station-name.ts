// Name bases
const names = [
  "Asser",
  "Bred",
  "Es",
  "Fugl",
  "Gej",
  "Glad",
  "Grøn",
  "Hasse",
  "Her",
  "Hessel",
  "Hør",
  "Kappel",
  "Kol",
  "Knud",
  "Ravns",
  "Ri",
  "Ros",
  "Røn",
  "Skal",
  "Skovs",
  "Snoge",
  "Snotte",
  "Sul",
  "Sønder",
  "Tol",
  "Torn",
  "Uller",
  "Vester",
  "Vind",
  "Vol",
  "Ørum",
  "Ål",
  "Ållers",
];

const places = [
  "ager",
  "balle",
  "be",
  "bjerg",
  "borg",
  "bro",
  "by",
  "bæk",
  "drup",
  "havn",
  "hede",
  "holt",
  "huse",
  "høj",
  "kilde",
  "kær",
  "lev",
  "lund",
  "ly",
  "løse",
  "mark",
  "mølle",
  "ning",
  "odde",
  "ring",
  "rup",
  "senge",
  "strup",
  "sø",
  "vig",
  "vilde",
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
