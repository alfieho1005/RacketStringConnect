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
