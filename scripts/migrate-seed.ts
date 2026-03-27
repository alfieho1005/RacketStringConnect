/**
 * Migrates all hardcoded seed stringers into the local PostgreSQL submissions table.
 * Run once: cd scripts && npx ts-node --project tsconfig.json migrate-seed.ts
 */

import { Pool } from "pg";
import * as path from "path";
import * as fs from "fs";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://rsc_user:rsc_str1ng2026@localhost:5432/racketstringconnect";

function loadStringersFromSource(): { slug: string; name: string; [k: string]: unknown }[] {
  // We use the compiled scripts/dist version if available, else read from chunk directly
  // This is a best-effort fallback
  const chunkPath = path.resolve(__dirname, "../.next/server/edge-chunks/991.js");
  const source = fs.readFileSync(chunkPath, "utf8");

  // Extract full serialized objects using a broader match
  // Pattern: array contents between the opening `[...` and `].map`
  const startMarker = "f=[...[";
  const endMarker = "].map(a=>";
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start === -1 || end === -1) throw new Error("Markers not found in chunk");

  const arrayText = source.slice(start + "f=[...[".length, end);
  // eslint-disable-next-line no-eval
  return eval(`[${arrayText}]`) as { slug: string; name: string; [k: string]: unknown }[];
}

async function migrate() {
  const pool = new Pool({ connectionString: DATABASE_URL });

  console.log("Loading seed stringers...");
  let raw: { slug?: string; name?: string; [k: string]: unknown }[];
  try {
    raw = loadStringersFromSource();
  } catch (e) {
    console.error("Chunk extraction failed:", (e as Error).message);
    process.exit(1);
  }

  console.log(`Found ${raw.length} records`);

  let inserted = 0;
  let skipped = 0;

  for (const s of raw) {
    const slug = (s.slug as string) ?? (s.name as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
    try {
      const result = await pool.query(
        `INSERT INTO submissions
           (slug, name, description, pricing, country_id, area_id, sports,
            contact, visibility, status, sort_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'approved',$10)
         ON CONFLICT (slug) DO NOTHING`,
        [
          slug,
          s.name as string,
          (s.description as string) ?? "",
          (s.pricing as string) ?? null,
          (s.country as string) ?? "hong-kong",
          (s.area as string) ?? null,
          s.sports as string[],
          JSON.stringify(s.contact ?? {}),
          (s.visibility as string) ?? "active",
          (s.sortId as number) ?? 999,
        ]
      );
      if ((result.rowCount ?? 0) > 0) {
        inserted++;
        process.stdout.write(`  ✓ ${slug}\n`);
      } else {
        skipped++;
        process.stdout.write(`  ~ ${slug} (already exists)\n`);
      }
    } catch (err) {
      console.error(`  ✗ ${slug}: ${(err as Error).message}`);
    }
  }

  await pool.end();
  console.log(`\nDone. inserted=${inserted} skipped=${skipped}`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
