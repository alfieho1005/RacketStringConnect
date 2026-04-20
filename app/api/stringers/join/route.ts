import { NextResponse } from "next/server";

interface JoinBody {
  name: string;
  description: string;
  sports: string[];
  country: string;
  area: string;
  pricing?: string;
  contact: Record<string, string>;
  additionalNotes?: string;
}

export async function POST(req: Request) {
  const body = await req.json() as JoinBody;
  const { name, description, sports, country, area, pricing, contact, additionalNotes } = body;

  if (!name?.trim() || !description?.trim() || !sports?.length || !area) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const slug =
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) +
    "-" + Date.now().toString(36);

  const adminNotes = additionalNotes?.trim() ? `Submitter notes: ${additionalNotes.trim()}` : null;

  try {
    const { getPool } = await import("@/lib/db/pool");
    const pool = await getPool();
    if (!pool) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    await pool.query(
      `INSERT INTO submissions
         (slug, name, description, pricing, country_id, area_id, sports,
          contact, visibility, status, admin_notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'active','pending',$9)`,
      [
        slug,
        name.trim(),
        description.trim(),
        pricing?.trim() || null,
        country || "hong-kong",
        area,
        sports,
        JSON.stringify(contact),
        adminNotes,
      ]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[join] DB error:", err);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 });
  }
}
