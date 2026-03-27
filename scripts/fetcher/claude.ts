import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, buildUserMessage } from "./prompts";
import type { SearchTask, SerperResult, DiscoveryCandidate } from "./types";

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export async function extract(
  results: SerperResult[],
  task: SearchTask
): Promise<DiscoveryCandidate[]> {
  if (results.length === 0) return [];

  const message = await getClient().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    temperature: 0,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserMessage(results, task) }],
  });

  const text = message.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("");

  try {
    const parsed = JSON.parse(text) as { candidates?: unknown[] };
    if (!Array.isArray(parsed.candidates)) return [];
    return parsed.candidates as DiscoveryCandidate[];
  } catch {
    console.error("[claude] JSON parse failed. Raw response:", text.slice(0, 300));
    return [];
  }
}
