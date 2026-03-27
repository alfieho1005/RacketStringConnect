import type { Metadata } from "next";
import Link from "next/link";
import { Disc, MapPin, ArrowRight, Zap, ExternalLink } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pickleball Courts Hong Kong · RacketStringConnect",
  description:
    "Find pickleball courts in Hong Kong. 26 indoor venues across Kowloon, Hong Kong Island and New Territories — locations, pricing, booking info.",
  keywords: [
    "pickleball courts hong kong",
    "pickleball hong kong",
    "pickleball venue hk",
    "pickleball court hk",
    "香港匹克球場",
    "匹克球 香港",
    "pickleball near me hk",
    "indoor pickleball hk",
  ],
  openGraph: {
    title: "Pickleball Courts Hong Kong · RacketStringConnect",
    description: "26 pickleball venues across Hong Kong — locations, pricing, booking info.",
    type: "website",
  },
};

interface Court {
  id: string;
  name: string;
  description: string | null;
  description_zh: string | null;
  city_hint: string | null;
  contact: Record<string, string>;
  pricing: string | null;
}

async function getCourts(): Promise<Court[]> {
  try {
    const { Pool } = await import("pg");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const { rows } = await pool.query(
      `SELECT id, name, description, description_zh, area_id, contact,
              admin_notes
       FROM submissions
       WHERE status = 'approved'
         AND sports @> ARRAY['pickleball']
         AND admin_notes LIKE '%Pickleball court%'
       ORDER BY name ASC`
    );
    await pool.end();
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      description_zh: r.description_zh ?? null,
      city_hint: r.area_id ?? null,
      contact: typeof r.contact === "string" ? JSON.parse(r.contact) : (r.contact ?? {}),
      pricing: null,
    }));
  } catch {
    return [];
  }
}

function ContactLinks({ contact }: { contact: Record<string, string> }) {
  const entries = Object.entries(contact).filter(([, v]) => v);
  if (entries.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {entries.map(([k, v]) => {
        let href = v;
        if (k === "instagram") href = `https://instagram.com/${v.replace(/^@/, "")}`;
        if (k === "phone") href = `tel:${v}`;
        if (k === "email") href = `mailto:${v}`;
        const label = k === "website" ? "Book" : k.charAt(0).toUpperCase() + k.slice(1);
        return (
          <a
            key={k}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition"
          >
            {label}
            <ExternalLink className="h-3 w-3" />
          </a>
        );
      })}
    </div>
  );
}

// Extract location from description (it's usually in city_hint from the import)
function getLocation(description: string | null): string | null {
  if (!description) return null;
  // descriptions start with location hint baked in
  return null;
}

const faqs = [
  {
    q: "Do pickleball paddles need stringing?",
    a: "Standard pickleball paddles are solid and don't require stringing. However, some advanced paddles benefit from professional grip reapplication and surface maintenance.",
  },
  {
    q: "How much do pickleball courts cost in HK?",
    a: "Court rental typically ranges from HK$100–$800/hr depending on venue and time slot. Many venues offer 24/7 access with self-booking apps.",
  },
  {
    q: "Are these courts indoor?",
    a: "All 26 courts listed here are indoor venues — climate controlled and playable year-round regardless of HK's weather.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pickleball Courts Hong Kong",
  description: "Directory of 26 indoor pickleball courts across Hong Kong.",
  url: "https://racketstringconnect.com/pickleball",
};

export default async function PickleballPage() {
  const courts = await getCourts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="rounded-2xl bg-slate-900 px-6 py-10 sm:px-10 sm:py-14">
        <div className="space-y-5 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-400/15 px-3 py-1.5">
            <Disc className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-violet-400">
              {courts.length} Venues · Hong Kong
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            Pickleball Courts<br />
            <span className="text-yellow-400">Hong Kong</span>
          </h1>

          <p className="text-base leading-relaxed text-slate-400">
            {courts.length} indoor pickleball venues across Kowloon, Hong Kong Island and
            New Territories. Find courts, check prices, and book directly.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/stringers/join"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-yellow-300"
            >
              <Zap className="h-4 w-4" />
              List Your Venue — Free
            </Link>
            <Link
              href="/?sport=pickleball"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Browse Stringers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Court listings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-violet-500" />
          <h2 className="text-lg font-bold text-slate-900">
            All Courts <span className="text-slate-400 font-normal">({courts.length})</span>
          </h2>
        </div>

        {courts.length === 0 ? (
          <p className="text-sm text-slate-400">Loading courts…</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {courts.map((court) => (
              <div
                key={court.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-violet-200 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{court.name}</h3>
                  <span className="flex-shrink-0 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700">
                    Indoor
                  </span>
                </div>

                {court.description && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">
                    {court.description}
                  </p>
                )}

                {court.description_zh && (
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {court.description_zh}
                  </p>
                )}

                <ContactLinks contact={court.contact} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">FAQ · 常見問題</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-slate-900 marker:hidden list-none">
                {faq.q}
                <span className="text-yellow-500 transition group-open:rotate-45 flex-shrink-0">+</span>
              </summary>
              <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-yellow-400 px-6 py-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Missing a venue?</h2>
        <p className="text-sm text-slate-700 max-w-md mx-auto">
          Know a pickleball court not listed here? Submit it and we&apos;ll add it to the directory.
        </p>
        <Link
          href="/stringers/join"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          Submit a Court — Free
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
