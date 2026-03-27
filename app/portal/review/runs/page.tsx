"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { DiscoveryRunRow } from "@/lib/discovery/types";

const STATUS_COLORS: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  running:   "bg-blue-100 text-blue-800",
  failed:    "bg-red-100 text-red-800",
};

export default function RunsPage() {
  const [runs, setRuns] = useState<DiscoveryRunRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/review?type=runs")
      .then((r) => r.json())
      .then((d: { runs: DiscoveryRunRow[] }) => { setRuns(d.runs); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/portal/review" className="text-sm text-slate-500 hover:text-slate-900">← Back</Link>
        <h1 className="text-3xl font-black text-slate-900">Run History</h1>
      </div>

      {loading && <p className="text-slate-400">Loading…</p>}

      {!loading && runs.length === 0 && (
        <p className="text-slate-400">No runs yet. The cron runs every Sunday at 4am.</p>
      )}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-widest text-slate-400">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Queries</th>
              <th className="px-4 py-3 text-right">New Candidates</th>
              <th className="px-4 py-3 text-right">Errors</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => {
              const errors = Array.isArray(run.errors) ? run.errors : [];
              return (
                <tr key={run.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                    {new Date(run.started_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[run.status] ?? ""}`}>
                      {run.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">{run.queries_run}</td>
                  <td className="px-4 py-3 text-right text-slate-700">{run.candidates_found}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${errors.length > 0 ? "text-red-600" : "text-slate-400"}`}>
                    {errors.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
