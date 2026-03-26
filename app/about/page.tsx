import Link from "next/link";

const adminInstagram = "racketstringconnect";
const stringlabInstagram = "stringlabhk";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      <section className="space-y-6 rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            About RacketStringConnect
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Discovery only, no frictions
          </h1>
          <p className="text-base leading-relaxed text-slate-700 space-y-2">
            <span>
              RacketStringConnect keeps discovery simple: we surface trusted badminton
              and tennis stringers, celebrate the craft, and point every follow-up
              directly to the pro.
            </span>
            <span>
              No reviews, no bookings, just a tasteful directory that keeps you in control.
            </span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>Admin</span>
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

      <section className="grid gap-6 md:grid-cols-2">
        <article className="space-y-4 rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            For new stringers
          </p>
          <h2 className="text-xl font-semibold text-slate-900">Welcome enquiry</h2>
          <div className="space-y-3 text-base leading-relaxed text-slate-700">
            <p>
              Ready to join RacketStringConnect? Introduce yourself with the essentials
              so players can connect right away.
            </p>
            <p className="text-base font-semibold text-slate-700 leading-relaxed">
              FREE to join — adding new stringers is charge-free for now; just send the
              details below to be featured.
            </p>
          </div>
          <div className="space-y-3 text-base leading-relaxed text-slate-700">
            <p className="text-lg font-semibold text-slate-900">
              歡迎查詢｜加入 RacketStringConnect
            </p>
            <p>
              準備好加入 RacketStringConnect，只要提供以下基本資料，球友就可以即刻聯絡到你。
            </p>
            <p className="text-base font-semibold text-slate-700 leading-relaxed">
              🎾 免費加入<br />
              目前新增穿線師／穿線店完全不收費，只需提交以下資料即可刊登。
            </p>
            <p className="font-semibold text-slate-900">請提供以下內容：</p>
            <ul className="space-y-2 text-base text-slate-700 list-inside list-disc">
              <li>你對外使用嘅名稱（個人／品牌）</li>
              <li>你嘅服務簡介（穿線技術、使用器材、專長等）</li>
              <li>你平時最常用、會即時回覆嘅聯絡方式（Instagram／WhatsApp／電郵／電話）</li>
              <li>收費簡介（幫助球友 DM 前有基本期望） - Optional</li>
            </ul>
            <p className="text-base leading-relaxed text-slate-700">
              📩 請將以上資料 DM 到{" "}
              <Link
                className="font-semibold text-slate-900 underline-offset-4 hover:underline"
                href={`https://instagram.com/${stringlabInstagram}`}
                target="_blank"
                rel="noreferrer"
              >
                @{stringlabInstagram}
              </Link>{" "}
              ，我哋會一步步協助你，確保你嘅頁面喺 RacketStringConnect 上呈現得專業又清晰。
            </p>
          </div>
          <ul className="space-y-2 text-base text-slate-700 list-inside list-disc">
            <li>
              <strong>Name</strong> you go by professionally or the brand you represent.
            </li>
            <li>
              <strong>Description</strong> of your craft, equipment, or specialties.
            </li>
            <li>
              <strong>Contact method</strong> (Instagram, WhatsApp, email, or phone) that you monitor regularly.
            </li>
            <li>
              <strong>Pricing</strong> notes to set expectations before players DM you.
            </li>
          </ul>
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
            with your details and we’ll walk you through getting a listing that feels polished on RacketStringConnect.
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Need to add or update stringers? Connect me with{" "}
            <Link
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
              href={`https://instagram.com/${stringlabInstagram}`}
              target="_blank"
              rel="noreferrer"
            >
              @{stringlabInstagram}
            </Link>
          </p>
        </article>

        <article className="space-y-4 rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            Stay in touch
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Open directory philosophy
          </h2>
          <p className="text-base leading-relaxed text-slate-700 space-y-2">
            <span>
              This project stays true to discovery-only: no internal messaging,
              no bookings, no reviews. Every update to stringers, contacts, or
              pricing lives with the pros themselves.
            </span>
            <span>
              If you spot a stringer worth adding or anything that needs care,
              reach out and we’ll keep the listings fresh.
            </span>
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            Connect with the admin at{" "}
            <Link
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
              href={`https://instagram.com/${adminInstagram}`}
              target="_blank"
              rel="noreferrer"
            >
              @{adminInstagram}
            </Link>{" "}
            whenever you need to add stringers or share updates, or DM{" "}
            <Link
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
              href={`https://instagram.com/${stringlabInstagram}`}
              target="_blank"
              rel="noreferrer"
            >
              @{stringlabInstagram}
            </Link>{" "}
            for hands-on additions.
          </p>
        </article>
      </section>
    </main>
  );
}
