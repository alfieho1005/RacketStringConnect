"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Link from "next/link";
import type { DiscoveryQueueRow } from "@/lib/discovery/types";

export default function ReviewPage() {
  const [items, setItems] = useState<DiscoveryQueueRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Simple secret check via URL hash (no server involved — lightweight protection)
  const [authed, setAuthed] = useState(false);
  const [secret, setSecret] = useState("");
  const [secretInput, setSecretInput] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("review_secret");
    if (stored) { setSecret(stored); setAuthed(true); }
  }, []);

  function login() {
    sessionStorage.setItem("review_secret", secretInput);
    setSecret(secretInput);
    setAuthed(true);
  }

  useEffect(() => {
    if (!authed) return;
    fetch(`/api/portal/review`)
      .then((r) => r.json())
      .then((d: { items: DiscoveryQueueRow[] }) => { setItems(d.items); setLoading(false); })
      .catch(() => setLoading(false));
  }, [authed]);

  function onDone(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm pt-24 px-4">
        <h1 className="text-2xl font-black text-slate-900 mb-6">Review Portal</h1>
        <input
          type="password"
          placeholder="Enter secret"
          value={secretInput}
          onChange={(e) => setSecretInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={login}
          className="w-full rounded-lg bg-yellow-400 px-4 py-3 text-sm font-bold text-slate-900 hover:bg-yellow-300"
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Discovery Queue</h1>
          <p className="mt-1 text-sm text-slate-500">
            {loading ? "Loading…" : `${items.length} pending`}
          </p>
        </div>
        <Link
          href="/portal/review/runs"
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          Run history →
        </Link>
      </div>

      {!loading && items.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-16 text-center text-slate-400">
          <p className="text-4xl mb-4">🎾</p>
          <p className="font-semibold">No pending candidates</p>
          <p className="text-sm mt-1">The fetcher runs every Sunday at 4am.</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <ReviewCard key={item.id} item={item} onDone={onDone} />
        ))}
      </div>
    </div>
  );
}
