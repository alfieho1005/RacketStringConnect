import { stringerRepository } from "@/lib/stringers/memoryRepository";
import type { Stringer } from "@/lib/stringers/types";
import { getPool } from "@/lib/db/pool";

const SELECT_COLUMNS = `id, slug, name, description, pricing, country_id, area_id,
              sports, contact, visibility, sort_id, has_certified_stringers`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToStringer(r: any): Stringer {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description ?? "",
    sports: (r.sports ?? []) as Stringer["sports"],
    area: (r.area_id ?? "central") as Stringer["area"],
    country: (r.country_id ?? "hong-kong") as Stringer["country"],
    pricing: r.pricing ?? undefined,
    contact: r.contact ?? {},
    visibility: (r.visibility ?? "active") as Stringer["visibility"],
    hasCertifiedStringers: r.has_certified_stringers ?? false,
    sortId: r.sort_id ?? 999,
  };
}

async function fetchApprovedFromDb(): Promise<Stringer[]> {
  const pool = await getPool();
  if (!pool) return [];
  try {
    const { rows } = await pool.query(
      `SELECT ${SELECT_COLUMNS}
       FROM submissions
       WHERE status = 'approved' AND visibility = 'active'`,
    );
    return rows.map(rowToStringer);
  } catch {
    // DB unavailable — fall back to seed data only
    return [];
  }
}

async function fetchBySlugFromDb(slug: string): Promise<Stringer | undefined> {
  const pool = await getPool();
  if (!pool) return undefined;
  try {
    const { rows } = await pool.query(
      `SELECT ${SELECT_COLUMNS}
       FROM submissions
       WHERE slug = $1 AND status = 'approved'
       LIMIT 1`,
      [slug],
    );
    return rows[0] ? rowToStringer(rows[0]) : undefined;
  } catch {
    return undefined;
  }
}

export async function fetchActiveStringers(): Promise<Stringer[]> {
  const [seeded, fromDb] = await Promise.all([
    stringerRepository.list(),
    fetchApprovedFromDb(),
  ]);

  // Merge: DB records take precedence by slug, seeded fill the rest
  const seededSlugs = new Set(fromDb.map((s) => s.slug));
  const merged = [
    ...fromDb,
    ...seeded.filter((s) => !seededSlugs.has(s.slug)),
  ];

  return merged
    .filter((s) => s.visibility === "active")
    .sort((a, b) => (a.sortId ?? 0) - (b.sortId ?? 0));
}

export async function getStringerBySlug(slug: string): Promise<Stringer | undefined> {
  // DB is source of truth once Phase 1 migration has run; fall back to seed so
  // the site still resolves if the DB is temporarily unreachable.
  const fromDb = await fetchBySlugFromDb(slug);
  if (fromDb) return fromDb;
  return stringerRepository.getBySlug(slug);
}
