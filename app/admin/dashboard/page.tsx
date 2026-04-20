import { isAdminAuthenticated } from "@/lib/admin/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import PendingSubmissions from "./PendingSubmissions";
import LogoutButton from "./LogoutButton";

async function getPendingSubmissions() {
  try {
    const { getPool } = await import("@/lib/db/pool");
    const pool = await getPool();
    if (!pool) return [];
    const { rows } = await pool.query(
      `SELECT id, slug, name, description, country_id, area_id, sports,
              contact, pricing, admin_notes, created_at
       FROM submissions
       WHERE status = 'pending'
       ORDER BY created_at DESC`
    );
    return rows;
  } catch {
    return [];
  }
}

async function getCounts() {
  try {
    const { getPool } = await import("@/lib/db/pool");
    const pool = await getPool();
    if (!pool) return { approved: 0, pending: 0, rejected: 0, discovery_pending: 0 };
    const { rows } = await pool.query(
      `SELECT
         COUNT(*) FILTER (WHERE status = 'approved') AS approved,
         COUNT(*) FILTER (WHERE status = 'pending')  AS pending,
         COUNT(*) FILTER (WHERE status = 'rejected') AS rejected
       FROM submissions`
    );
    const { rows: dqRows } = await pool.query(
      `SELECT COUNT(*) FILTER (WHERE status = 'pending') AS discovery_pending FROM discovery_queue`
    );
    return { ...rows[0], ...dqRows[0] };
  } catch {
    return { approved: 0, pending: 0, rejected: 0, discovery_pending: 0 };
  }
}

export default async function AdminDashboard() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  const [submissions, counts] = await Promise.all([getPendingSubmissions(), getCounts()]);

  const stats = [
    { label: "Live stringers",     value: counts.approved,          color: "text-green-600" },
    { label: "Pending review",     value: counts.pending,           color: "text-amber-600" },
    { label: "Discovery queue",    value: counts.discovery_pending, color: "text-violet-600" },
    { label: "Rejected",           value: counts.rejected,          color: "text-slate-400" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Admin Dashboard</h1>
          <p className="text-xs text-slate-400">RacketStringConnect</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/portal/review"
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Discovery queue →
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            View site →
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center">
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pending join-form submissions */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Pending submissions <span className="text-slate-400 font-normal">({submissions.length})</span>
          </h2>
        </div>

        <PendingSubmissions initial={submissions} />
      </main>
    </div>
  );
}
