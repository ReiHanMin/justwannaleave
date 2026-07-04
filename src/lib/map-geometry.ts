// Stylised cut-paper geometry for the Italy map (SVG polygon points).
// Purely presentational — all data comes from the database.

export interface RegionShape {
  code: string;
  points: string;
  label: [number, number];
}

export const MAP_VIEWBOX = "80 64 462 620";

export const MAP_GEOMETRY: RegionShape[] = [
  { code: "VDA", points: "95,120 125,105 140,131 116,150 96,140", label: [118, 131] },
  { code: "PIE", points: "94,150 152,131 176,176 160,236 110,226 90,182", label: [130, 188] },
  { code: "LOM", points: "176,121 262,110 276,170 230,210 180,186", label: [222, 160] },
  { code: "TAA", points: "250,76 322,76 332,131 270,136 256,106", label: [290, 108] },
  { code: "VEN", points: "322,110 386,116 396,181 336,196 322,151", label: [358, 156] },
  { code: "FVG", points: "386,95 432,96 442,151 401,161 388,126", label: [412, 128] },
  { code: "LIG", points: "110,236 192,216 246,246 220,266 150,261", label: [178, 247] },
  { code: "EMR", points: "200,211 336,201 372,236 320,271 230,266", label: [286, 238] },
  { code: "TOS", points: "215,271 302,266 312,331 256,371 220,331", label: [262, 308] },
  { code: "MAR", points: "336,251 386,256 396,321 356,331 336,296", label: [366, 290] },
  { code: "UMB", points: "300,301 346,301 351,356 311,361 298,331", label: [324, 330] },
  { code: "LAZ", points: "270,341 330,356 341,416 296,431 261,391", label: [300, 388] },
  { code: "ABR", points: "350,331 401,336 421,386 376,401 349,376", label: [382, 366] },
  { code: "MOL", points: "376,396 416,391 426,426 391,436 373,416", label: [400, 414] },
  { code: "CAM", points: "300,421 361,416 381,476 336,506 300,471", label: [336, 463] },
  { code: "PUG", points: "416,401 481,431 516,491 470,511 420,461 400,431", label: [452, 452] },
  { code: "BAS", points: "370,471 421,466 441,521 396,536 368,506", label: [402, 500] },
  { code: "CAL", points: "395,521 441,521 451,566 421,616 401,601 395,561", label: [420, 560] },
  { code: "SAR", points: "120,431 166,426 181,501 150,561 120,541 110,471", label: [145, 490] },
  { code: "SIC", points: "335,621 432,615 405,668 330,662", label: [378, 642] },
];
