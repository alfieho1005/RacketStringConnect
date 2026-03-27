import type { SerperResult } from "./types";

const SERPER_URL = "https://google.serper.dev/search";

export async function search(
  query: string,
  gl: string,
  hl: string
): Promise<SerperResult[]> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) throw new Error("SERPER_API_KEY is not set");

  const res = await fetch(SERPER_URL, {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: query, gl, hl, num: 10 }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Serper API error ${res.status}: ${text}`);
  }

  const data = await res.json() as { organic?: SerperResult[] };
  return data.organic ?? [];
}
