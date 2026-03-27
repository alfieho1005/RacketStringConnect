import type { SearchTask, SportCategory } from "./types";

interface CountryConfig {
  id: string;
  label: string;
  gl: string;
  hl: string;
  cities: string[];
  weight: number; // higher = sampled more often
}

const COUNTRIES: CountryConfig[] = [
  { id: "hong-kong",      label: "Hong Kong",      gl: "hk", hl: "en", cities: ["Hong Kong"],                              weight: 2 },
  { id: "singapore",      label: "Singapore",      gl: "sg", hl: "en", cities: ["Singapore"],                              weight: 2 },
  { id: "malaysia",       label: "Malaysia",       gl: "my", hl: "en", cities: ["Kuala Lumpur", "Penang", "Johor Bahru"],  weight: 1 },
  { id: "taiwan",         label: "Taiwan",         gl: "tw", hl: "zh-TW", cities: ["Taipei", "Taichung"],                 weight: 1 },
  { id: "thailand",       label: "Thailand",       gl: "th", hl: "en", cities: ["Bangkok", "Chiang Mai"],                 weight: 1 },
  { id: "indonesia",      label: "Indonesia",      gl: "id", hl: "en", cities: ["Jakarta", "Bali"],                       weight: 1 },
  { id: "united-kingdom", label: "United Kingdom", gl: "gb", hl: "en", cities: ["London", "Manchester"],                  weight: 1 },
  { id: "united-states",  label: "United States",  gl: "us", hl: "en", cities: ["New York", "Los Angeles"],              weight: 1 },
];

const STRINGER_TEMPLATES = [
  (city: string, sport: string) => `${city} ${sport} racket stringing service`,
  (city: string, sport: string) => `${city} ${sport} racket restring shop`,
  (city: string, sport: string) => `${sport} stringer ${city}`,
];

const PICKLEBALL_SHOP_TEMPLATES = [
  (city: string) => `${city} pickleball paddle shop`,
  (city: string) => `${city} pickleball equipment store buy`,
];

const PICKLEBALL_COURT_TEMPLATES = [
  (city: string) => `${city} pickleball court indoor`,
  (city: string) => `${city} pickleball club`,
];

function buildQueryForSport(sport: SportCategory, city: string): string[] {
  if (sport === "pickleball-shop") return PICKLEBALL_SHOP_TEMPLATES.map((t) => t(city));
  if (sport === "pickleball-court") return PICKLEBALL_COURT_TEMPLATES.map((t) => t(city));
  return STRINGER_TEMPLATES.map((t) => t(city, sport));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SPORTS: SportCategory[] = [
  "badminton", "tennis", "squash", "pickleball-shop", "pickleball-court",
];

export function buildQueue(maxQueries = 15): SearchTask[] {
  const all: SearchTask[] = [];

  for (const country of COUNTRIES) {
    for (const city of country.cities) {
      for (const sport of SPORTS) {
        const queries = buildQueryForSport(sport, city);
        for (const query of queries) {
          const task: SearchTask = {
            country: country.id,
            countryLabel: country.label,
            sport,
            city,
            query,
            gl: country.gl,
            hl: country.hl,
          };
          // Apply weight by duplicating before shuffle
          for (let w = 0; w < country.weight; w++) {
            all.push(task);
          }
        }
      }
    }
  }

  const shuffled = shuffle(all);

  // Deduplicate by query string after shuffle, then slice
  const seen = new Set<string>();
  const deduped: SearchTask[] = [];
  for (const task of shuffled) {
    if (!seen.has(task.query)) {
      seen.add(task.query);
      deduped.push(task);
    }
  }

  return deduped.slice(0, maxQueries);
}
