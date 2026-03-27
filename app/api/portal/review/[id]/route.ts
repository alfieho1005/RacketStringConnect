import { NextResponse } from "next/server";
import { getCandidate, reviewCandidate, promoteToSubmissions } from "@/lib/discovery/repository";
import type { DiscoveryStatus } from "@/lib/discovery/types";

interface ReviewBody {
  action: DiscoveryStatus;
  area_id?: string;
  admin_notes?: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json() as ReviewBody;
  const { action, area_id, admin_notes } = body;

  if (!["approved", "rejected", "duplicate"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const candidate = await getCandidate(id);
  if (!candidate) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (action === "approved" && candidate.record_type === "stringer" && !area_id) {
    return NextResponse.json(
      { error: "area_id is required when approving a stringer record" },
      { status: 400 }
    );
  }

  await reviewCandidate(id, action, area_id, admin_notes);

  if (action === "approved") {
    const updated = { ...candidate, area_id: area_id ?? candidate.area_id };
    await promoteToSubmissions(updated);
  }

  return NextResponse.json({ ok: true });
}
