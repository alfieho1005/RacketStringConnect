import * as fs from "fs";
import * as path from "path";
import { buildQueue } from "./queries";
import { search } from "./serper";
import { extract } from "./claude";
import { createRun, updateRun, isDuplicate, insertCandidate, closePool } from "./db";

const MAX_QUERIES = parseInt(process.env.MAX_QUERIES_PER_RUN ?? "15", 10);
const SLEEP_MS = 2000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function logFile(): string {
  const date = new Date().toISOString().slice(0, 10);
  const dir = path.resolve(__dirname, "../../logs");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, `discovery-${date}.log`);
}

function log(msg: string): void {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(logFile(), line + "\n");
}

async function main(): Promise<void> {
  const runId = new Date().toISOString();
  log(`=== Discovery run started: ${runId} ===`);
  log(`MAX_QUERIES_PER_RUN: ${MAX_QUERIES}`);

  await createRun(runId);

  const queue = buildQueue(MAX_QUERIES);
  log(`Queue built: ${queue.length} tasks`);

  let queriesRun = 0;
  let candidatesFound = 0;
  const errors: { query: string; error: string }[] = [];

  for (const task of queue) {
    log(`Searching: "${task.query}" [${task.country}]`);

    try {
      const results = await search(task.query, task.gl, task.hl);
      log(`  → ${results.length} results`);

      const candidates = await extract(results, task);
      log(`  → ${candidates.length} candidates extracted`);

      for (const candidate of candidates) {
        const dupId = await isDuplicate(candidate.name, candidate.country);
        await insertCandidate(candidate, task, runId, results, dupId ?? undefined);
        if (!dupId) candidatesFound++;
        log(`  + "${candidate.name}" [${candidate.record_type}] ${dupId ? "(duplicate)" : "(new)"}`);
      }

      queriesRun++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log(`  ERROR: ${msg}`);
      errors.push({ query: task.query, error: msg });
    }

    await sleep(SLEEP_MS);
  }

  await updateRun(runId, queriesRun, candidatesFound, errors, errors.length > 0 && queriesRun === 0 ? "failed" : "completed");
  await closePool();

  log(`=== Run complete. queries=${queriesRun} new_candidates=${candidatesFound} errors=${errors.length} ===`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
