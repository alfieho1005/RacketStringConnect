import { stringerRepository } from "@/lib/stringers/memoryRepository";
import type { Stringer } from "@/lib/stringers/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pgPool: any = null;

async function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pgPool) {
    const { Pool } = await import("pg");
    pgPool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pgPool;
}

async function fetchApprovedFromDb(): Promise<Stringer[]> {
  const pool = await getPool();
  if (!pool) return [];
  try {
    const { rows } = await pool.query(
      `SELECT id, slug, name, description, pricing, country_id, area_id,
              sports, contact, sort_id
       FROM submissions
       WHERE status = 'approved' AND visibility = 'active'`
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rows.map((r: any) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      description: r.description ?? "",
      sports: (r.sports ?? []) as Stringer["sports"],
      area: (r.area_id ?? "central") as Stringer["area"],
      country: (r.country_id ?? "hong-kong") as Stringer["country"],
      pricing: r.pricing ?? undefined,
      contact: r.contact ?? {},
      visibility: "active" as const,
      sortId: r.sort_id ?? 999,
    }));
  } catch {
    // DB unavailable — fall back to seed data only
    return [];
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
  return stringerRepository.getBySlug(slug);
}
