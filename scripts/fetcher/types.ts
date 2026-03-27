export type SportCategory =
  | "badminton"
  | "tennis"
  | "squash"
  | "pickleball-shop"
  | "pickleball-court";

export type RecordType = "stringer" | "pickleball-shop" | "pickleball-court";
export type Confidence = "high" | "low";

export interface SearchTask {
  country: string;       // CountryId e.g. "hong-kong"
  countryLabel: string;  // e.g. "Hong Kong"
  sport: SportCategory;
  city: string;
  query: string;
  gl: string;            // Google country code e.g. "hk"
  hl: string;            // Language e.g. "en"
}

export interface SerperResult {
  title: string;
  link: string;
  snippet: string;
  sitelinks?: { title: string; link: string }[];
}

export interface DiscoveryCandidate {
  name: string;
  description: string;
  sports: string[];
  country: string;
  city_hint: string;
  contact: Record<string, string>;
  pricing?: string;
  confidence: Confidence;
  source_url: string;
  record_type: RecordType;
}
