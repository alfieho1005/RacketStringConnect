import { NextResponse } from "next/server";
import { listPendingCandidates, listRuns } from "@/lib/discovery/repository";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // "runs" | null

  if (type === "runs") {
    const runs = await listRuns();
    return NextResponse.json({ runs });
  }

  const items = await listPendingCandidates();
  return NextResponse.json({ items, totalPending: items.length });
}
