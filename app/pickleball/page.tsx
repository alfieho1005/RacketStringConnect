import type { Metadata } from "next";
import Link from "next/link";
import { Disc, MapPin, ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Pickleball Stringing & Paddle Shop Hong Kong · RacketStringConnect",
  description:
    "Find pickleball paddle stringing professionals in Hong Kong. Connect directly with local pickleball stringers — free directory, no fees. HK's first pickleball stringer finder.",
  keywords: [
    "pickleball hong kong",
    "pickleball paddle shop hk",
    "pickleball stringing hong kong",
    "pickleball hk",
    "香港匹克球",
    "匹克球穿線",
    "pickleball paddle restring",
    "pickleball near me hk",
  ],
  openGraph: {
    title: "Pickleball Stringing Hong Kong · RacketStringConnect",
    description:
      "HK's first free directory for pickleball paddle stringing. Find local professionals and connect directly.",
    type: "website",
  },
};

// JSON-LD for the pickleball category page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pickleball Stringing & Paddle Shop Hong Kong",
  description:
    "Directory of pickleball stringing professionals in Hong Kong. Find local stringers by district.",
  url: "https://racketstringconnect.com/pickleball",
  about: {
    "@type": "SportsActivityLocation",
    name: "Pickleball",
    description: "Pickleball racket stringing services in Hong Kong",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://racketstringconnect.com" },
      { "@type": "ListItem", position: 2, name: "Pickleball", item: "https://racketstringconnect.com/pickleball" },
    ],
  },
};

const faqs = [
  {
    q: "What is pickleball?",
    a: "Pickleball is a fast-growing paddle sport combining elements of tennis, badminton and ping pong. Played with a solid paddle and a plastic ball on a compact court, it's popular across all age groups in Hong Kong.",
  },
  {
    q: "Do pickleball paddles need stringing?",
    a: "Standard pickleball paddles are solid and don't require stringing. However, some advanced paddles with textured or composite surfaces benefit from professional edge tape, grip reapplication, and surface maintenance — services a specialist stringer can provide.",
  },
  {
    q: "Where can I find a pickleball stringer in Hong Kong?",
    a: "RacketStringConnect is building HK's first pickleball stringer directory. List yourself if you offer pickleball services, or browse our growing network of racket sports professionals.",
  },
  {
    q: "How much does pickleball stringing cost in HK?",
    a: "Pricing varies by service — grip replacements typically start around HK$40–80, while full paddle maintenance services range from HK$80–200. Contact stringers directly for exact quotes.",
  },
];

export default function PickleballPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="rounded-2xl bg-slate-900 px-6 py-10 sm:px-10 sm:py-14">
        <div className="space-y-5 max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-400/15 px-3 py-1.5">
            <Disc className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-violet-400">
              HK First Mover · 香港首選
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            Pickleball in<br />
            <span className="text-yellow-400">Hong Kong</span>
          </h1>

          <p className="text-base leading-relaxed text-slate-400">
            The fastest-growing racket sport in Hong Kong needs local specialists.
            RacketStringConnect is building HK&apos;s first free directory of pickleball
            paddle professionals — stringing, gripping, and maintenance.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/stringers/join"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-yellow-300"
            >
              <Zap className="h-4 w-4" />
              List Your Pickleball Services — Free
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

      {/* Why pickleball is growing */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Why Pickleball is Exploding in HK
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: "🏟️", title: "Indoor & Outdoor", body: "Playable year-round in HK's sports halls and outdoor courts." },
            { icon: "⚡", title: "Fast to Learn", body: "Beginners are competitive within weeks. Perfect for all fitness levels." },
            { icon: "📈", title: "500% Growth", body: "Pickleball is the world's fastest-growing sport — HK is catching up fast." },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-2 text-2xl">{card.icon}</div>
              <p className="font-bold text-slate-900 text-sm">{card.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Districts CTA */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-yellow-500" />
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400">
            Find Pickleball Professionals Near You
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Tsuen Wan · 荃灣", district: "tsuen-wan-district" },
            { label: "Mong Kok · 旺角", district: "yau-tsim-mong" },
            { label: "Yuen Long · 元朗", district: "yuen-long-district" },
            { label: "Sha Tin · 沙田", district: "sha-tin-district" },
            { label: "Kwun Tong · 觀塘", district: "kwun-tong-district" },
            { label: "Tuen Mun · 屯門", district: "tuen-mun-district" },
          ].map((area) => (
            <Link
              key={area.district}
              href={`/?country=hk&district=${area.district}&sport=pickleball`}
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-slate-900"
            >
              {area.label}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ — keyword-rich for SEO */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Pickleball FAQ · 常見問題
        </h2>
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
              <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-xl bg-yellow-400 px-6 py-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Are You a Pickleball Stringer?
        </h2>
        <p className="text-sm text-slate-700 max-w-md mx-auto">
          Be the first listed pickleball specialist in your district. It&apos;s free,
          takes 2 minutes, and puts you in front of Hong Kong&apos;s fastest-growing
          racket sport community.
        </p>
        <Link
          href="/stringers/join"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          List Yourself Now — Free
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
