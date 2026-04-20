import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { action } = await req.json() as { action: "approved" | "rejected" };

  if (!["approved", "rejected"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  try {
    const { getPool } = await import("@/lib/db/pool");
    const pool = await getPool();
    if (!pool) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    await pool.query(
      `UPDATE submissions SET status = $1, updated_at = now() WHERE id = $2`,
      [action, id]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin submissions] DB error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
