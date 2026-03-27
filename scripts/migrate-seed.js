/**
 * Migrates all hardcoded seed stringers from the compiled Next.js bundle
 * into the local PostgreSQL submissions table.
 *
 * Run once: node scripts/migrate-seed.js
 */

const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://rsc_user:rsc_str1ng2026@localhost:5432/racketstringconnect";

// ── Extract stringer data from compiled Next.js chunk ────────────────────────
function loadStringers() {
  const chunkPath = path.resolve(__dirname, "../.next/server/edge-chunks/991.js");
  if (!fs.existsSync(chunkPath)) {
    throw new Error(".next chunk not found — run `npm run build` first");
  }

  const source = fs.readFileSync(chunkPath, "utf8");

  // Patch the chunk to run in Node.js (it expects a browser `self` global)
  const captured = {};
  const fakeSelf = {
    webpackChunk_N_E: {
      push([, mods]) {
        Object.assign(captured, mods);
      },
    },
  };

  const fn = new Function("self", source);
  fn(fakeSelf);

  // Module 8991 exports the stringer repository as { L: repository }
  // The repository has a list() method that returns the seed array
  const mod = captured[8991];
  if (!mod) throw new Error("Stringer module 8991 not found in chunk");

  const exports = {};
  const require = () => ({ d: () => {} }); // stub
  // The module uses c.d(b, ...) to export — patch it
  const fakeModule = {
    d(target, defs) {
      Object.entries(defs).forEach(([k, v]) => {
        target[k] = v();
      });
    },
  };
  mod(null, exports, fakeModule);

  // exports.L is the repository; we need the internal `f` array.
  // Since list() returns a copy, call it synchronously (it's sync under the hood).
  // However list() returns a Promise — resolve it.
  return exports.L.list();
}

async function migrate() {
  const pool = new Pool({ connectionString: DATABASE_URL });

  console.log("Loading seed stringers from compiled bundle...");
  const stringers = await loadStringers();
  console.log(`Found ${stringers.length} stringers`);

  let inserted = 0;
  let skipped = 0;

  for (const s of stringers) {
    try {
      const result = await pool.query(
        `INSERT INTO submissions
           (slug, name, description, pricing, country_id, area_id, sports,
            contact, visibility, status, sort_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'approved', $10)
         ON CONFLICT (slug) DO NOTHING`,
        [
          s.slug,
          s.name,
          s.description ?? "",
          s.pricing ?? null,
          s.country ?? "hong-kong",
          s.area ?? null,
          s.sports,
          JSON.stringify(s.contact ?? {}),
          s.visibility ?? "active",
          s.sortId ?? 999,
        ]
      );
      if (result.rowCount > 0) {
        inserted++;
        console.log(`  ✓ ${s.slug}`);
      } else {
        skipped++;
        console.log(`  ~ ${s.slug} (already exists)`);
      }
    } catch (err) {
      console.error(`  ✗ ${s.slug}: ${err.message}`);
    }
  }

  await pool.end();
  console.log(`\nDone. inserted=${inserted} skipped=${skipped}`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
