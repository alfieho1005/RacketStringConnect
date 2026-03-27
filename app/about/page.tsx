import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於平台 · RacketStringConnect",
  description:
    "香港人做，為香港球手而設。一個清晰的穿線師目錄，連繫球手與穿線師，毋需中間人。Built for HK racket sports — badminton, tennis and squash.",
};

const adminInstagram = "racketstringconnect";
const stringlabInstagram = "racketstringconnect";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">

      {/* Top positioning statement */}
      <section className="space-y-4 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur">
        <div className="space-y-2 text-base leading-relaxed text-slate-700">
          <span>
            香港有數百位技術精湛的穿線師。但大多數人根本不知道他們的存在
            — 藏在 WhatsApp 群組、口耳相傳，或一個 Instagram 帳號裡。
          </span>
          <span className="block mt-2">
            RacketStringConnect 讓穿線師被看見。毋需中間人，毋需抽佣。
          </span>
        </div>
      </section>

      {/* Main about block */}
      <section className="space-y-6 rounded-3xl border border-white/60 bg-white/70 p-5 sm:p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            關於平台 About
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            為香港球拍運動而設的穿線師目錄
          </h1>
          <div className="space-y-3 text-base leading-relaxed text-slate-700">
            <p>
              香港有數百位技術精湛的穿線師。但大多數人根本不知道他們的存在
              — 藏在 WhatsApp 群組、口耳相傳，或一個 Instagram 帳號裡。
            </p>
            <p>
              RacketStringConnect 讓穿線師被看見。在你的球場附近搵穿線師，
              了解服務詳情，直接聯絡。
            </p>
            <p>
              毋需抽佣。毋需登記帳號。一個清晰的目錄，方便球手，也尊重穿線師的專業。
            </p>
            <p className="text-slate-500 text-sm">
              Hong Kong has hundreds of skilled stringers — this is where you find them.
              No commissions. No accounts. Just a clean directory that keeps both sides in control.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>平台管理</span>
          <Link
            className="font-semibold text-slate-900 underline-offset-4 hover:underline"
            href={`https://instagram.com/${adminInstagram}`}
            target="_blank"
            rel="noreferrer"
          >
            @{adminInstagram}
          </Link>
        </div>
      </section>

      {/* Trust strip */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { zh: "實名穿線師", en: "Vetted listings" },
          { zh: "直接聯絡", en: "Direct contact" },
          { zh: "免費登記", en: "Free forever" },
          { zh: "香港專屬", en: "HK only" },
        ].map((item) => (
          <div
            key={item.en}
            className="rounded-2xl border border-white/60 bg-white/70 p-4 text-center shadow-sm backdrop-blur"
          >
            <p className="text-base font-bold text-slate-900">{item.zh}</p>
            <p className="text-xs text-slate-400 mt-0.5">{item.en}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2">

        {/* For stringers */}
        <article className="space-y-4 rounded-3xl border border-white/60 bg-white/70 p-5 sm:p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            穿線師登記
          </p>
          <h2 className="text-xl font-semibold text-slate-900">讓附近球手搵到你</h2>
          <div className="flex">
            <a
              href="/stringers/join"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              立即登記
            </a>
          </div>
          <div className="space-y-3 text-base leading-relaxed text-slate-700">
            <p>
              你所在地區的球手已在搜尋穿線師。登記你的店舖，只需 5 分鐘。
            </p>
            <p className="text-base font-semibold text-slate-700 leading-relaxed">
              永久免費登記 — 毋需抽佣，毋需月費，直接上架。
            </p>
          </div>
          <ul className="space-y-2 text-base text-slate-700 list-inside list-disc">
            <li>
              <strong>姓名 / 店舖名稱</strong> — 你的專業名稱或代表品牌。
            </li>
            <li>
              <strong>服務簡介</strong> — 你的穿線技術、使用器材或專項。
            </li>
            <li>
              <strong>收費參考</strong> — 讓球手聯絡前有基本了解。
            </li>
          </ul>
          <div className="space-y-2">
            <p className="text-base font-semibold text-slate-900">聯絡方式</p>
            <ul className="space-y-1 text-base text-slate-700 list-inside list-disc">
              <li><strong>WhatsApp</strong> — 球手最常用的聯絡渠道。</li>
              <li><strong>電話</strong> — 接聽查詢或確認預約。</li>
              <li><strong>Instagram</strong> — 展示作品或接收 DM。</li>
              <li><strong>電郵</strong> — 適合詳細查詢。</li>
            </ul>
          </div>
          <p className="text-base leading-relaxed text-slate-700">
            DM{" "}
            <Link
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
              href={`https://instagram.com/${stringlabInstagram}`}
              target="_blank"
              rel="noreferrer"
            >
              @{stringlabInstagram}
            </Link>{" "}
            或直接填寫登記表格，我們審核後上架。
          </p>
        </article>

        {/* How it works */}
        <article className="space-y-4 rounded-3xl border border-white/60 bg-white/70 p-5 sm:p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            平台運作方式
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            我們不站在你們中間
          </h2>
          <div className="space-y-3 text-base leading-relaxed text-slate-700">
            <p>
              無預約系統、無評分系統、無內部訊息。球手直接透過
              WhatsApp、電話或 Instagram 聯絡穿線師。
            </p>
            <p>
              你的檔案由你主導。資料、收費、聯絡方式 — 隨時更新，無需經過我們。
            </p>
            <p className="text-slate-500 text-sm">
              We don&apos;t sit between player and stringer. No booking system,
              no review system. The listing belongs to you.
            </p>
          </div>
          <p className="text-base leading-relaxed text-slate-700">
            如需新增或更新穿線師資料，請聯絡{" "}
            <Link
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
              href={`https://instagram.com/${adminInstagram}`}
              target="_blank"
              rel="noreferrer"
            >
              @{adminInstagram}
            </Link>{" "}
            或 DM{" "}
            <Link
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
              href={`https://instagram.com/${stringlabInstagram}`}
              target="_blank"
              rel="noreferrer"
            >
              @{stringlabInstagram}
            </Link>
            。
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            電郵查詢：{" "}
            <a
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
              href="mailto:racketstringconnect@gmail.com"
            >
              racketstringconnect@gmail.com
            </a>
          </p>
        </article>
      </section>

      {/* Community positioning */}
      <section className="rounded-3xl border border-white/60 bg-white/70 p-5 sm:p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
        <div className="grid gap-6 sm:grid-cols-3 text-center">
          {[
            {
              zh: "香港球拍運動圈一直欠缺的穿線師目錄",
              en: "The directory HK's racket community was missing.",
            },
            {
              zh: "連繫球手與穿線師。如此而已。",
              en: "We keep the stringer and player connected. Nothing else.",
            },
            {
              zh: "一個目錄，覆蓋全港各區，跨越所有球拍運動。",
              en: "One directory. Every district. All sports.",
            },
          ].map((item) => (
            <div key={item.en} className="space-y-2">
              <p className="text-base font-semibold text-slate-800">{item.zh}</p>
              <p className="text-sm text-slate-400">{item.en}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
