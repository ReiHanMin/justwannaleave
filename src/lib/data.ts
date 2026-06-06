export interface Country {
  code: string;
  name: string;
  hook: string;
  blurb: string;
  headline: string;
  catch: string;
  tier: string;
}

export interface Region {
  id: string;
  name: string;
  tier: 'green' | 'amber' | 'red';
  points: string;
  label: [number, number];
  stipend: string;
  isee: string;
  odds: string;
  note: string;
}

export interface TierMeta {
  label: string;
  color: string;
}

export interface Guide {
  tag: string;
  tone: string;
  title: string;
  read: string;
  updated: string;
}

export interface Story {
  quote: string;
  name: string;
  age: number;
  place: string;
}

export const countries: Country[] = [
  {
    code: "IT", name: "Italy", hook: "pays your rent",
    blurb: "Low-income students can get rent, meals and a cash stipend through the regional DSU scholarship.",
    headline: "Up to €6,600/yr stipend",
    catch: "Bureaucracy is real, and the amount depends on your region.",
    tier: "The famous one",
  },
  {
    code: "DE", name: "Germany", hook: "no tuition",
    blurb: "Public universities charge no tuition to international students — you only cover a small semester fee.",
    headline: "€0 tuition",
    catch: "You need to prove ~€11,900 of living funds for your visa.",
    tier: "The reliable one",
  },
  {
    code: "JP", name: "Japan", hook: "full stipend",
    blurb: "The MEXT government scholarship covers tuition, flights and a monthly living allowance.",
    headline: "Tuition + ¥117k/mo",
    catch: "Competitive, and the application is a marathon.",
    tier: "The big prize",
  },
  {
    code: "NO", name: "Norway", hook: "free for PhDs",
    blurb: "PhD positions are salaried jobs, and many public programmes are still tuition-free at master's level.",
    headline: "Paid PhD positions",
    catch: "Undergrad tuition fees returned in 2023 for non-EU students.",
    tier: "The sleeper",
  },
  {
    code: "FR", name: "France", hook: "€170/yr tuition",
    blurb: "Public university tuition is set nationally and stays absurdly low compared to the US.",
    headline: "~€170/yr (bachelor)",
    catch: "Some programmes charge non-EU students more — check first.",
    tier: "The cheap one",
  },
  {
    code: "TW", name: "Taiwan", hook: "gov. scholarships",
    blurb: "MOE and MOFA scholarships cover tuition plus a monthly stipend, often with a Mandarin study year.",
    headline: "Tuition + NT$15k/mo",
    catch: "Tied to specific universities and degree levels.",
    tier: "The underrated one",
  },
];

export const regions: Region[] = [
  { id:"VDA", name:"Valle d'Aosta", tier:"green", points:"95,120 125,105 140,131 116,150 96,140", label:[118,131],
    stipend:"€5,900", isee:"€24,300", odds:"~100%", note:"Tiny region, few applicants — nearly everyone eligible is funded." },
  { id:"PIE", name:"Piemonte", tier:"green", points:"94,150 152,131 176,176 160,236 110,226 90,182", label:[130,188],
    stipend:"€6,100", isee:"€26,000", odds:"~100%", note:"EDISU Piemonte funds all idonei. Turin has strong student housing." },
  { id:"LOM", name:"Lombardia", tier:"green", points:"176,121 262,110 276,170 230,210 180,186", label:[222,160],
    stipend:"€6,400", isee:"€27,900", odds:"~100%", note:"Wealthiest region; Milan is pricey but the stipend tracks higher." },
  { id:"TAA", name:"Trentino-Alto Adige", tier:"green", points:"250,76 322,76 332,131 270,136 256,106", label:[290,108],
    stipend:"€6,600", isee:"€29,000", odds:"~100%", note:"Highest stipends in Italy. Provincial funds top up the national floor." },
  { id:"VEN", name:"Veneto", tier:"green", points:"322,110 386,116 396,181 336,196 322,151", label:[358,156],
    stipend:"€6,000", isee:"€26,300", odds:"~100%", note:"Padua and Venice both fully fund eligible applicants." },
  { id:"FVG", name:"Friuli-Venezia Giulia", tier:"green", points:"386,95 432,96 442,151 401,161 388,126", label:[412,128],
    stipend:"€5,800", isee:"€25,500", odds:"~100%", note:"Small applicant pool, reliable funding, low cost of living." },
  { id:"LIG", name:"Liguria", tier:"green", points:"110,236 192,216 246,246 220,266 150,261", label:[178,247],
    stipend:"€5,700", isee:"€24,800", odds:"~100%", note:"Genoa funds all eligible; rent is the main expense to plan for." },
  { id:"EMR", name:"Emilia-Romagna", tier:"green", points:"200,211 336,201 372,236 320,271 230,266", label:[286,238],
    stipend:"€6,200", isee:"€27,200", odds:"~100%", note:"Bologna is the classic choice — ER.GO funds 100% of idonei." },
  { id:"TOS", name:"Toscana", tier:"green", points:"215,271 302,266 312,331 256,371 220,331", label:[262,308],
    stipend:"€6,000", isee:"€26,500", odds:"~100%", note:"Pisa, Florence, Siena. Fully funded and famously student-friendly." },
  { id:"MAR", name:"Marche", tier:"amber", points:"336,251 386,256 396,321 356,331 336,296", label:[366,290],
    stipend:"€5,500", isee:"€24,000", odds:"~85%", note:"Mostly funded, but a waitlist can apply in tight budget years." },
  { id:"UMB", name:"Umbria", tier:"amber", points:"300,301 346,301 351,356 311,361 298,331", label:[324,330],
    stipend:"€5,300", isee:"€23,500", odds:"~80%", note:"Perugia is affordable; funding occasionally lags applications." },
  { id:"LAZ", name:"Lazio", tier:"amber", points:"270,341 330,356 341,416 296,431 261,391", label:[300,388],
    stipend:"€5,600", isee:"€24,500", odds:"~75%", note:"Rome draws huge demand; apply early and watch the bando dates." },
  { id:"ABR", name:"Abruzzo", tier:"amber", points:"350,331 401,336 421,386 376,401 349,376", label:[382,366],
    stipend:"€5,200", isee:"€23,000", odds:"~80%", note:"L\'Aquila and Chieti — decent odds, low living costs." },
  { id:"MOL", name:"Molise", tier:"amber", points:"376,396 416,391 426,426 391,436 373,416", label:[400,414],
    stipend:"€5,000", isee:"€22,500", odds:"~78%", note:"Small region, modest budget, but competition is light." },
  { id:"CAM", name:"Campania", tier:"red", points:"300,421 361,416 381,476 336,506 300,471", label:[336,463],
    stipend:"€5,200", isee:"€23,500", odds:"~55%", note:"Naples has big demand and a chunk of idonei go unfunded yearly." },
  { id:"PUG", name:"Puglia", tier:"red", points:"416,401 481,431 516,491 470,511 420,461 400,431", label:[452,452],
    stipend:"€5,100", isee:"€23,000", odds:"~50%", note:"The heel. Eligible-but-unfunded ('idonei non beneficiari') is common." },
  { id:"BAS", name:"Basilicata", tier:"red", points:"370,471 421,466 441,521 396,536 368,506", label:[402,500],
    stipend:"€4,900", isee:"€22,000", odds:"~60%", note:"Smaller pool than Campania, but budgets are tight." },
  { id:"CAL", name:"Calabria", tier:"red", points:"395,521 441,521 451,566 421,616 401,601 395,561", label:[420,560],
    stipend:"€4,800", isee:"€21,800", odds:"~45%", note:"The toe. Lowest odds on the mainland — go in with a backup plan." },
  { id:"SAR", name:"Sardegna", tier:"red", points:"120,431 166,426 181,501 150,561 120,541 110,471", label:[145,490],
    stipend:"€5,000", isee:"€22,800", odds:"~58%", note:"Island life, Cagliari and Sassari. Funding varies year to year." },
  { id:"SIC", name:"Sicilia", tier:"red", points:"335,621 432,615 405,668 330,662", label:[378,642],
    stipend:"€5,000", isee:"€22,500", odds:"~50%", note:"Palermo and Catania. High demand, real chance of the waitlist." },
];

export const tierMeta: Record<string, TierMeta> = {
  green: { label: "Funds ~100% of eligible applicants", color: "var(--tier-green)" },
  amber: { label: "Partial funding — waitlist / lottery applies", color: "var(--tier-amber)" },
  red:   { label: "High competition — lower odds", color: "var(--tier-red)" },
};

export const guides: Guide[] = [
  { tag:"Italy", tone:"green", title:"How the DSU scholarship actually works — and why most guides get it wrong", read:"11 min", updated:"Updated May 2026" },
  { tag:"Italy", tone:"green", title:"Which Italian region gives you the best odds of getting the stipend", read:"8 min", updated:"Updated May 2026" },
  { tag:"Guide", tone:"terra", title:"Can you actually live on the DSU stipend in Pisa without working?", read:"7 min", updated:"Updated Apr 2026" },
  { tag:"Japan", tone:"ink", title:"The MEXT scholarship: what it covers, who qualifies, and how to apply", read:"14 min", updated:"Updated Apr 2026" },
  { tag:"Germany", tone:"amber", title:"No tuition, but what does Germany actually cost to live in as a student?", read:"9 min", updated:"Updated Mar 2026" },
];

export const stories: Story[] = [
  { quote:"I graduated from the University of Bologna with zero debt and €2,000 in savings. My friends back home owe $45,000.", name:"Marcus", age:24, place:"Ohio" },
  { quote:"The DSU covered my rent and meals. I worked 8 hours a week tutoring English and lived better than I did at home.", name:"Priya", age:22, place:"Texas" },
  { quote:"I didn't speak Italian when I decided to go. Two years later I'm fluent and my degree cost me nothing.", name:"Dani", age:26, place:"Florida" },
];
