import { Pool } from "pg";
import { seedStringers } from "../lib/stringers/stringer";

async function main() {
  const url = process.env.DATABASE_URL!;
  const p = new Pool({
    connectionString: url,
    ssl: /rds\.amazonaws\.com/.test(url) ? { rejectUnauthorized: false } : undefined,
  });
  const seedMap = new Map(seedStringers.map((s) => [s.slug, s]));
  const { rows } = await p.query(
    "SELECT slug, name, description, pricing, area_id, sort_id FROM submissions WHERE slug NOT LIKE '%-pb-court'"
  );
  let diffs = 0;
  for (const r of rows) {
    const s = seedMap.get(r.slug);
    if (!s) continue;
    const changes: string[] = [];
    if ((r.name ?? "") !== (s.name ?? "")) changes.push("name");
    if ((r.description ?? "") !== (s.description ?? "")) changes.push("desc");
    if ((r.pricing ?? "") !== (s.pricing ?? "")) changes.push("pricing");
    if ((r.area_id ?? "") !== ((s.area as string) ?? "")) changes.push("area");
    if ((r.sort_id ?? 999) !== (s.sortId ?? 999)) changes.push("sortId");
    if (changes.length > 0) {
      diffs++;
      if (diffs <= 8) console.log(r.slug + ": " + changes.join(","));
    }
  }
  console.log("---");
  console.log(`Rows where prod differs from seed: ${diffs} / ${rows.length}`);
  await p.end();
}
main().catch((e) => { console.error(e); process.exit(1); });
