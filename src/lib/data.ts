// Static editorial content. All DSU figures now live in the database
// (see src/lib/dsu.ts) — nothing here should state a number we can't source.

export interface Country {
  code: string;
  name: string;
  hook: string;
  blurb: string;
  headline: string;
  catch: string;
  tier: string;
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
    headline: "€7,171/yr verified (Emilia-Romagna, 2026/27)",
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
    headline: "Tuition + monthly stipend",
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
    code: "FR", name: "France", hook: "low tuition",
    blurb: "Public university tuition is set nationally and stays absurdly low compared to the US.",
    headline: "Hundreds, not thousands, per year",
    catch: "Some programmes charge non-EU students more — check first.",
    tier: "The cheap one",
  },
  {
    code: "TW", name: "Taiwan", hook: "gov. scholarships",
    blurb: "MOE and MOFA scholarships cover tuition plus a monthly stipend, often with a Mandarin study year.",
    headline: "Tuition + monthly stipend",
    catch: "Tied to specific universities and degree levels.",
    tier: "The underrated one",
  },
];

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
