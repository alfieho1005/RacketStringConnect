"use client";

import { useState } from "react";

interface Submission {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  country_id: string | null;
  area_id: string | null;
  sports: string[];
  contact: Record<string, string>;
  pricing: string | null;
  admin_notes: string | null;
  created_at: string;
}

export default function PendingSubmissions({ initial }: { initial: Submission[] }) {
  const [items, setItems] = useState(initial);
  const [loading, setLoading] = useState<string | null>(null);

  async function act(id: string, action: "approved" | "rejected") {
    setLoading(id);
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setLoading(null);
    setItems((prev) => prev.filter((s) => s.id !== id));
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white px-8 py-12 text-center text-slate-400">
        <p className="text-3xl mb-3">🎾</p>
        <p className="font-semibold">No pending submissions</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((s) => (
        <div key={s.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-slate-900 text-lg">{s.name}</h3>
            <span className="text-xs text-slate-400 whitespace-nowrap">
              {new Date(s.created_at).toLocaleDateString()}
            </span>
          </div>

          <p className="text-sm text-slate-500 mb-2">
            {[s.area_id, s.country_id].filter(Boolean).join(" · ")}
          </p>

          {s.sports.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {s.sports.map((sp) => (
                <span key={sp} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {sp}
                </span>
              ))}
            </div>
          )}

          {s.description && (
            <p className="text-sm text-slate-600 mb-3 leading-relaxed">{s.description}</p>
          )}

          {Object.keys(s.contact).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(s.contact).map(([k, v]) => (
                <span key={k} className="rounded-lg bg-slate-50 border border-slate-200 px-2 py-1 text-xs text-slate-600">
                  <span className="font-semibold">{k}:</span> {v}
                </span>
              ))}
            </div>
          )}

          {s.admin_notes && (
            <p className="text-xs text-slate-400 italic mb-3">{s.admin_notes}</p>
          )}

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => act(s.id, "approved")}
              disabled={loading === s.id}
              className="flex-1 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-yellow-300 disabled:opacity-50 transition"
            >
              Approve
            </button>
            <button
              onClick={() => act(s.id, "rejected")}
              disabled={loading === s.id}
              className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
