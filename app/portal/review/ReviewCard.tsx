"use client";

import { useState } from "react";
import { areaOptions } from "@/config/areas";
import type { DiscoveryQueueRow } from "@/lib/discovery/types";

const TYPE_LABELS: Record<string, string> = {
  "stringer": "Stringer",
  "pickleball-shop": "Pickleball Shop",
  "pickleball-court": "Pickleball Court",
};

const TYPE_COLORS: Record<string, string> = {
  "stringer": "bg-yellow-100 text-yellow-800",
  "pickleball-shop": "bg-violet-100 text-violet-800",
  "pickleball-court": "bg-sky-100 text-sky-800",
};

export default function ReviewCard({
  item,
  onDone,
}: {
  item: DiscoveryQueueRow;
  onDone: (id: string) => void;
}) {
  const [areaId, setAreaId] = useState(item.area_id ?? "");
  const [notes, setNotes] = useState(item.admin_notes ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function act(action: "approved" | "rejected" | "duplicate") {
    if (action === "approved" && item.record_type === "stringer" && !areaId) {
      setError("Select an area before approving a stringer.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch(`/api/portal/review/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, area_id: areaId || undefined, admin_notes: notes || undefined }),
    });
    setLoading(false);
    if (res.ok) {
      onDone(item.id);
    } else {
      const data = await res.json() as { error?: string };
      setError(data.error ?? "Something went wrong.");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-start gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_COLORS[item.record_type]}`}>
          {TYPE_LABELS[item.record_type]}
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          item.confidence === "high" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-700"
        }`}>
          {item.confidence} confidence
        </span>
        <span className="ml-auto text-xs text-slate-400">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      </div>

      {/* Name + location */}
      <h2 className="text-lg font-bold text-slate-900">{item.name}</h2>
      <p className="mt-0.5 text-sm text-slate-500">
        {[item.city_hint, item.country_id].filter(Boolean).join(" · ")}
      </p>

      {/* Sports */}
      {item.sports.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.sports.map((s) => (
            <span key={s} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      {item.description && (
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.description}</p>
      )}

      {/* Contact */}
      {Object.keys(item.contact).length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(item.contact).map(([k, v]) => (
            <span key={k} className="rounded-lg bg-slate-50 border border-slate-200 px-2 py-1 text-xs text-slate-600">
              <span className="font-semibold">{k}:</span> {v}
            </span>
          ))}
        </div>
      )}

      {/* Source URL */}
      {item.source_url && (
        <a
          href={item.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block truncate text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800"
        >
          {item.source_url}
        </a>
      )}

      {/* Query used */}
      {item.query_used && (
        <p className="mt-1 text-xs text-slate-400">Found via: "{item.query_used}"</p>
      )}

      {/* Area selector (required for stringers) */}
      {item.record_type === "stringer" && (
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Area <span className="text-red-500">*</span>
          </label>
          <select
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">— Select area —</option>
            {areaOptions.map((a) => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Admin notes */}
      <div className="mt-3">
        <label className="block text-xs font-semibold text-slate-600 mb-1">Notes (optional)</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. verified on Instagram"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Error */}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

      {/* Pickleball note */}
      {item.record_type !== "stringer" && (
        <p className="mt-2 text-xs text-slate-400 italic">
          This will be listed in the Pickleball section, not the main stringer directory.
        </p>
      )}

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => act("approved")}
          disabled={loading}
          className="flex-1 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-300 disabled:opacity-50"
        >
          Approve
        </button>
        <button
          onClick={() => act("rejected")}
          disabled={loading}
          className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Reject
        </button>
        <button
          onClick={() => act("duplicate")}
          disabled={loading}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Dup
        </button>
      </div>
    </div>
  );
}
