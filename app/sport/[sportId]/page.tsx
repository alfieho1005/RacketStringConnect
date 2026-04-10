import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { sportDefinitions, getSportDefinition } from "@/config/sports";
import type { SportId } from "@/config/sports";
import { getAreaLabel } from "@/config/areas";
import { fetchActiveStringers } from "@/features/stringers/service";
import StringerCard from "@/components/StringerCard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE_URL = "https://racketstringconnect.com";

const sportChinese: Record<string, string> = {
  badminton: "羽毛球",
  tennis: "網球",
  squash: "壁球",
  pickleball: "匹克球",
};

const sportDescriptions: Record<string, { zh: string; en: string }> = {
  badminton: {
    zh: "全港羽毛球穿線師，WhatsApp 直接傾，由師傅幫你揀線、調磅數。",
    en: "Find badminton stringers across Hong Kong. Contact via WhatsApp — get help choosing strings and tension.",
  },
  tennis: {
    zh: "全港網球穿線師，WhatsApp 直接傾，唔使再排隊等穿線。",
    en: "Find tennis stringers across Hong Kong. Contact via WhatsApp — skip the queue, book directly.",
  },
  squash: {
    zh: "全港壁球穿線師，WhatsApp 直接傾，專業穿線服務。",
    en: "Find squash stringers across Hong Kong. Contact via WhatsApp for professional stringing.",
  },
  pickleball: {
    zh: "匹克球喺香港愈來愈受歡迎。搵匹克球穿線師同場地，WhatsApp 直接聯絡。",
    en: "Pickleball is booming in Hong Kong. Find pickleball stringers and venues — contact via WhatsApp.",
  },
};

const validSportIds = sportDefinitions.map((s) => s.id);

function isValidSport(id: string): id is SportId {
  return validSportIds.includes(id as SportId);
}

export async function generateStaticParams() {
  return sportDefinitions.map((s) => ({ sportId: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sportId: string }>;
}): Promise<Metadata> {
  const { sportId } = await params;
  if (!isValidSport(sportId)) return { title: "RacketStringConnect" };

  const sport = getSportDefinition(sportId)!;
  const zhLabel = sportChinese[sportId] ?? sport.label;
  const desc = sportDescriptions[sportId];

  return {
    title: `${zhLabel}穿線師香港 ${sport.label} Stringers HK — WhatsApp 直接聯絡 · RacketStringConnect`,
    description: `${desc.zh} ${desc.en}`,
    keywords: [
      `${sport.label.toLowerCase()} stringing hong kong`,
      `${sport.label.toLowerCase()} stringer hk`,
      `${zhLabel}穿線`,
      `${zhLabel}穿線師`,
      `${zhLabel}穿線師 WhatsApp`,
      `${zhLabel}穿線 香港`,
      `${sport.label.toLowerCase()} racket stringing`,
      "穿線師",
      "hong kong stringer whatsapp",
    ],
    openGraph: {
      title: `${zhLabel} ${sport.label} Stringers Hong Kong · RacketStringConnect`,
      description: desc.en,
      type: "website",
      url: `${BASE_URL}/sport/${sportId}`,
    },
  };
}

export default async function SportPage({
  params,
}: {
  params: Promise<{ sportId: string }>;
}) {
  const { sportId } = await params;
  if (!isValidSport(sportId)) notFound();

  const sport = getSportDefinition(sportId)!;
  const zhLabel = sportChinese[sportId] ?? sport.label;
  const desc = sportDescriptions[sportId];

  const allStringers = await fetchActiveStringers();
  const stringers = allStringers.filter((s) => s.sports.includes(sportId));

  // Count by district for internal linking
  const areaCounts = new Map<string, number>();
  for (const s of stringers) {
    const label = getAreaLabel(s.area) ?? s.area;
    areaCounts.set(label, (areaCounts.get(label) ?? 0) + 1);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${sport.label} Stringers Hong Kong`,
    description: desc.en,
    url: `${BASE_URL}/sport/${sportId}`,
    isPartOf: { "@type": "WebSite", name: "RacketStringConnect", url: BASE_URL },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        返回主頁 Back
      </Link>

      <section className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5">
          {sport.icon && <sport.icon className="h-3.5 w-3.5 text-yellow-400" aria-hidden />}
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-white">
            {stringers.length} Stringers · Hong Kong
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          {zhLabel}穿線師香港
        </h1>
        <p className="text-base text-slate-600">
          {desc.zh}
        </p>
        <p className="text-sm text-slate-500">
          {desc.en}
        </p>
      </section>

      {/* Area breakdown */}
      {areaCounts.size > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {Array.from(areaCounts.entries())
            .sort(([, a], [, b]) => b - a)
            .slice(0, 12)
            .map(([area, count]) => (
              <span
                key={area}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
              >
                {area} ({count})
              </span>
            ))}
        </div>
      )}

      {stringers.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-2xl font-black text-slate-200">暫時未有{zhLabel}穿線師登記</p>
          <p className="mt-2 text-sm text-slate-400">
            成為首位登記的{zhLabel}穿線師 — 球手已在搵人
          </p>
          <Link
            href="/stringers/join"
            className="mt-6 inline-block rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-yellow-300"
          >
            免費登記我的穿線服務
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stringers.map((stringer) => (
            <StringerCard key={stringer.slug} stringer={stringer} />
          ))}
        </div>
      )}
    </main>
  );
}
