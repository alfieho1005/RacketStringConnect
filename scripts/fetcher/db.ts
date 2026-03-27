import { Pool } from "pg";
import type { DiscoveryCandidate, SearchTask } from "./types";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

export async function createRun(runId: string): Promise<void> {
  await getPool().query(
    `INSERT INTO discovery_runs (id, status) VALUES ($1, 'running')`,
    [runId]
  );
}

export async function updateRun(
  runId: string,
  queriesRun: number,
  candidatesFound: number,
  errors: unknown[],
  status: "completed" | "failed"
): Promise<void> {
  await getPool().query(
    `UPDATE discovery_runs
     SET finished_at = now(), queries_run = $1, candidates_found = $2,
         errors = $3, status = $4
     WHERE id = $5`,
    [queriesRun, candidatesFound, JSON.stringify(errors), status, runId]
  );
}

export async function isDuplicate(
  name: string,
  countryId: string
): Promise<string | null> {
  const { rows } = await getPool().query<{ id: string }>(
    `SELECT id FROM discovery_queue
     WHERE lower(name) = lower($1) AND country_id = $2 AND status != 'rejected'
     LIMIT 1`,
    [name, countryId]
  );
  return rows[0]?.id ?? null;
}

export async function insertCandidate(
  candidate: DiscoveryCandidate,
  task: SearchTask,
  runId: string,
  rawSnippets: unknown[],
  duplicateOf?: string
): Promise<void> {
  const status = duplicateOf ? "duplicate" : "pending";
  const adminNotes = duplicateOf ? `Duplicate of ${duplicateOf}` : null;

  await getPool().query(
    `INSERT INTO discovery_queue
       (record_type, name, description, sports, country_id, city_hint,
        pricing, contact, source_url, query_used, run_id, confidence,
        status, admin_notes, raw_snippets)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
    [
      candidate.record_type,
      candidate.name,
      candidate.description,
      candidate.sports,
      candidate.country,
      candidate.city_hint,
      candidate.pricing ?? null,
      JSON.stringify(candidate.contact),
      candidate.source_url,
      task.query,
      runId,
      candidate.confidence,
      status,
      adminNotes,
      JSON.stringify(rawSnippets),
    ]
  );
}

export async function closePool(): Promise<void> {
  await pool?.end();
  pool = null;
}
