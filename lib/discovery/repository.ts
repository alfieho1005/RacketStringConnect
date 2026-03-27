import type { DiscoveryQueueRow, DiscoveryRunRow, DiscoveryStatus } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pool: any = null;

async function getPool() {
  if (!pool) {
    const { Pool } = await import("pg");
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

export async function listPendingCandidates(): Promise<DiscoveryQueueRow[]> {
  const db = await getPool();
  const { rows } = await db.query(
    `SELECT * FROM discovery_queue
     WHERE status = 'pending'
     ORDER BY confidence DESC, created_at DESC`
  );
  return rows as DiscoveryQueueRow[];
}

export async function listRuns(): Promise<DiscoveryRunRow[]> {
  const db = await getPool();
  const { rows } = await db.query(
    `SELECT * FROM discovery_runs ORDER BY started_at DESC LIMIT 50`
  );
  return rows as DiscoveryRunRow[];
}

export async function getCandidate(id: string): Promise<DiscoveryQueueRow | null> {
  const db = await getPool();
  const { rows } = await db.query(
    `SELECT * FROM discovery_queue WHERE id = $1`,
    [id]
  );
  return (rows[0] ?? null) as DiscoveryQueueRow | null;
}

export async function reviewCandidate(
  id: string,
  action: DiscoveryStatus,
  areaId?: string,
  adminNotes?: string
): Promise<void> {
  const db = await getPool();
  await db.query(
    `UPDATE discovery_queue
     SET status = $1, area_id = COALESCE($2, area_id),
         admin_notes = $3, reviewed_at = now()
     WHERE id = $4`,
    [action, areaId ?? null, adminNotes ?? null, id]
  );
}

export async function promoteToSubmissions(row: DiscoveryQueueRow): Promise<void> {
  const slug = row.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  const db = await getPool();
  await db.query(
    `INSERT INTO submissions
       (slug, name, description, pricing, country_id, area_id, sports, contact, visibility, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'active', 'approved')
     ON CONFLICT (slug) DO NOTHING`,
    [
      slug,
      row.name,
      row.description ?? "",
      row.pricing ?? null,
      row.country_id ?? null,
      row.area_id ?? null,
      row.sports,
      JSON.stringify(row.contact),
    ]
  );
}
