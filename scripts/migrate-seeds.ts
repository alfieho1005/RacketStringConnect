/**
 * Phase 1: migrate every hardcoded seed Stringer into the Postgres submissions
 * table. Idempotent — safe to re-run. Re-running will UPDATE existing rows by
 * slug so edits made to the seed file propagate to the DB.
 *
 * Usage:
 *   DATABASE_URL=postgresql://... npx tsx scripts/migrate-seeds.ts
 *   DATABASE_URL=postgresql://... npx tsx scripts/migrate-seeds.ts --dry-run
 */

import { Pool } from "pg";
import { seedStringers } from "../lib/stringers/stringer";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const DRY_RUN = process.argv.includes("--dry-run");

async function migrate() {
  const pool = new Pool({ connectionString: DATABASE_URL });

  console.log(`Loaded ${seedStringers.length} seed stringers`);
  if (DRY_RUN) console.log("DRY RUN — no writes will happen");

  let inserted = 0;
  let updated = 0;
  let failed = 0;

  for (const s of seedStringers) {
    try {
      if (DRY_RUN) {
        console.log(`  · ${s.slug}`);
        continue;
      }

      const result = await pool.query<{ op: "insert" | "update" }>(
        `INSERT INTO submissions
           (slug, name, description, pricing, country_id, area_id, sports,
            contact, visibility, status, sort_id, has_certified_stringers)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'approved',$10,$11)
         ON CONFLICT (slug) DO UPDATE SET
           name                    = EXCLUDED.name,
           description             = EXCLUDED.description,
           pricing                 = EXCLUDED.pricing,
           country_id              = EXCLUDED.country_id,
           area_id                 = EXCLUDED.area_id,
           sports                  = EXCLUDED.sports,
           contact                 = EXCLUDED.contact,
           visibility              = EXCLUDED.visibility,
           sort_id                 = EXCLUDED.sort_id,
           has_certified_stringers = EXCLUDED.has_certified_stringers,
           updated_at              = now()
         RETURNING (xmax = 0) AS inserted`,
        [
          s.slug,
          s.name,
          s.description ?? "",
          s.pricing ?? null,
          s.country ?? "hong-kong",
          s.area,
          s.sports,
          JSON.stringify(s.contact ?? {}),
          s.visibility,
          s.sortId ?? 999,
          s.hasCertifiedStringers ?? false,
        ],
      );

      const wasInsert = (result.rows[0] as unknown as { inserted: boolean })?.inserted;
      if (wasInsert) {
        inserted++;
        process.stdout.write(`  + ${s.slug}\n`);
      } else {
        updated++;
        process.stdout.write(`  ~ ${s.slug}\n`);
      }
    } catch (err) {
      failed++;
      console.error(`  ! ${s.slug}: ${(err as Error).message}`);
    }
  }

  await pool.end();
  console.log(`\nDone. inserted=${inserted} updated=${updated} failed=${failed}`);
  if (failed > 0) process.exit(1);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
