import type { Metadata } from "next";
import Link from "next/link";
import StringerJoinForm from "@/components/StringerJoinForm";

export const metadata: Metadata = {
  title: "穿線師免費登記 · RacketStringConnect",
  description:
    "香港穿線師免費登記。填寫資料，我們審核後上架。球手直接聯絡你，毋需抽佣。Free listing for HK racket stringers — reviewed and published within 1–2 working days.",
};

export default function StringerJoinPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          ← 返回目錄 Back
        </Link>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          審核中 · 1–2 個工作天
        </p>
      </div>

      <section className="space-y-6 rounded-[32px] border border-white/60 bg-white/80 p-5 sm:p-8 shadow-xl shadow-slate-900/5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            香港穿線師免費登記
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            讓附近球手搵到你
          </h1>
          <div className="h-3" aria-hidden />
          <p className="text-lg text-slate-600">
            填寫一次資料，我們審核後上架。球手直接聯絡你 — 永久免費，毋需抽佣。
          </p>
        </div>

        <StringerJoinForm />
      </section>
    </main>
  );
}
