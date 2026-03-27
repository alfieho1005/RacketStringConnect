import type { SearchTask, SerperResult } from "./types";

export const SYSTEM_PROMPT = `You are a data extraction assistant for RacketStringConnect, a directory of racket sports stringing services and pickleball venues.

You receive Google search result snippets and extract real business records from them.

Rules:
- Only extract real, specific businesses — not blog posts, news articles, governing bodies, or tournament pages.
- Generic directory pages (Yelp, Google Maps listing pages) are OK sources — extract the named business, not the directory.
- Each search result can yield zero, one, or multiple business records.
- For stringer records: the business must offer racket stringing as a service.
- For pickleball-shop: the business sells pickleball equipment/paddles.
- For pickleball-court: the venue has pickleball courts available to play on.
- Assign confidence "high" if the snippet clearly states the service/product. "low" if inferred.
- Extract contact info carefully: WhatsApp numbers (include country code), Instagram handles (without @), websites, emails, phone numbers.
- Return ONLY valid JSON. No prose, no markdown, no explanation.

JSON schema:
{
  "candidates": [
    {
      "name": string,
      "description": string (1-2 sentences about the business),
      "sports": string[] (subset of: ["badminton","tennis","squash","pickleball"]),
      "country": string (the country_id, e.g. "hong-kong"),
      "city_hint": string (city or district name from the snippet),
      "contact": {
        "whatsapp"?: string,
        "instagram"?: string,
        "email"?: string,
        "phone"?: string,
        "website"?: string,
        "facebook"?: string
      },
      "pricing"?: string,
      "confidence": "high" | "low",
      "source_url": string,
      "record_type": "stringer" | "pickleball-shop" | "pickleball-court"
    }
  ]
}`;

export function buildUserMessage(
  results: SerperResult[],
  task: SearchTask
): string {
  const lines: string[] = [
    `Country: ${task.countryLabel} (id: ${task.country})`,
    `City: ${task.city}`,
    `Category: ${task.sport}`,
    `Query used: "${task.query}"`,
    "",
    "Search results:",
  ];

  results.forEach((r, i) => {
    lines.push(`[${i + 1}] Title: ${r.title}`);
    lines.push(`    URL: ${r.link}`);
    lines.push(`    Snippet: ${r.snippet}`);
    if (r.sitelinks?.length) {
      lines.push(`    Sitelinks: ${r.sitelinks.map((s) => s.title).join(", ")}`);
    }
    lines.push("");
  });

  return lines.join("\n");
}
