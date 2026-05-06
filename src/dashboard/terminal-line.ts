/**
 * Braille Unicode tegn (U+2800 - U+28FF) repræsenterer et 2x4 gitter.
 * Prikkerne er mappet til specifikke bits i tegn-koden:
 * 1 4
 * 2 5
 * 3 6
 * 7 8
 */
const BRAILLE_DOTS: number[][] = [
  [0x01, 0x08],
  [0x02, 0x10],
  [0x04, 0x20],
  [0x40, 0x80],
];

class BrailleCanvas {
  private widthChars: number;
  private heightChars: number;
  private grid: Uint8Array;

  constructor(widthChars: number, heightChars: number) {
    this.widthChars = widthChars;
    this.heightChars = heightChars;
    // Vi gemmer rå bit-værdier i et fladt array for ydeevne
    this.grid = new Uint8Array(widthChars * heightChars);
  }

  /**
   * Tænder en sub-pixel på lærredet.
   * @param x Den horisontale sub-pixel position (0 til bredde * 2)
   * @param y Den vertikale sub-pixel position (0 til højde * 4)
   */
  public setPixel(x: number, y: number): void {
    const charX = Math.floor(x / 2);
    const charY = Math.floor(y / 4);
    const dotX = Math.floor(x % 2);
    const dotY = Math.floor(y % 4);

    if (
      charX >= 0 && charX < this.widthChars && charY >= 0 &&
      charY < this.heightChars
    ) {
      const index = charY * this.widthChars + charX;
      this.grid[index] |= BRAILLE_DOTS[dotY][dotX];
    }
  }

  /**
   * Tegner en direkte linje mellem to punkter ved hjælp af Bresenham.
   */
  public drawLine(x1: number, y1: number, x2: number, y2: number): void {
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    x2 = Math.round(x2);
    y2 = Math.round(y2);

    const dx = Math.abs(x2 - x1);
    const dy = -Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx + dy;

    while (true) {
      this.setPixel(x1, y1);
      if (x1 === x2 && y1 === y2) break;

      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x1 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y1 += sy;
      }
    }
  }

  /**
   * Konverterer lærredet til en streng med Unicode Braille tegn.
   */
  public render(): string {
    let output = "";
    for (let y = 0; y < this.heightChars; y++) {
      for (let x = 0; x < this.widthChars; x++) {
        const val = this.grid[y * this.widthChars + x];
        // Basis for Braille Unicode er 0x2800 (tomt tegn)
        output += String.fromCharCode(0x2800 + val);
      }
      output += "\n";
    }
    return output;
  }
}

/**
 * Tegner en streg i terminalen mellem to punkt-koordinater.
 * @param col1 Start kolonne (tegn-position)
 * @param lin1 Start linje (tegn-position)
 * @param col2 Slut kolonne
 * @param lin2 Slut linje
 */
function tegnStreg(
  col1: number,
  lin1: number,
  col2: number,
  lin2: number,
): void {
  // Bestem størrelsen på lærredet baseret på de største koordinater
  const w = Math.max(col1, col2) + 5;
  const h = Math.max(lin1, lin2) + 5;

  const canvas = new BrailleCanvas(w, h);

  // Vi ganger terminal-koordinaterne op for at ramme sub-pixel gitteret
  // (Midten af en tegn-celle er ca. 1.0 i x og 2.0 i y sub-pixels)
  canvas.drawLine(col1 * 2, lin1 * 4, col2 * 2, lin2 * 4);

  console.log(canvas.render());
}

// Eksempel: Tegn en stjerne-agtig form
console.log("Genererer linjer i forskellige vinkler:");
const centerCol = 20;
const centerLin = 10;
const exampleCanvas = new BrailleCanvas(50, 20);

for (let i = 0; i < 360; i += 15) {
  const angle = (i * Math.PI) / 180;
  const radius = 15;
  const x2 = (centerCol * 2) + Math.cos(angle) * radius * 2.5;
  const y2 = (centerLin * 4) + Math.sin(angle) * radius * 4;

  exampleCanvas.drawLine(centerCol * 2, centerLin * 4, x2, y2);
}

console.log(exampleCanvas.render());

// Simpel brug af den forespurgte funktion:
console.log("Direkte streg fra (5, 2) til (45, 18):");
tegnStreg(5, 2, 45, 18);
