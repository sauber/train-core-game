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
  "Jer",
  "Kappel",
  "Kol",
  "Knud",
  "Ravns",
  "Ri",
  "Ros",
  "Røn",
  "Senge",
  "Skal",
  "Smør",
  "Skovs",
  "Skør",
  "Snoge",
  "Snotte",
  "Støv",
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
  "bild",
  "bjerg",
  "bo",
  "borg",
  "bro",
  "by",
  "bæk",
  "bølle",
  "drup",
  "enge",
  "havn",
  "hede",
  "holm",
  "holt",
  "huse",
  "høj",
  "kilde",
  "kær",
  "lev",
  "ling",
  "lum",
  "lund",
  "ly",
  "løse",
  "mark",
  "mølle",
  "ne",
  "ning",
  "odde",
  "ring",
  "ris",
  "rup",
  "sild",
  "sted",
  "strup",
  "sø",
  "um",
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
