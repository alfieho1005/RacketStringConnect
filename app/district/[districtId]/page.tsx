import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { districtOptions, getDistrictLabel } from "@/config/district";
import type { DistrictId } from "@/config/district";
import { districtToSubdistrictIds } from "@/config/district_to_areas_mapping";
import { getSportDefinition } from "@/config/sports";
import { fetchActiveStringers } from "@/features/stringers/service";
import StringerCard from "@/components/StringerCard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE_URL = "https://racketstringconnect.com";

const districtChinese: Record<string, string> = {
  "central-and-western": "中西區",
  "wan-chai-district": "灣仔",
  "eastern-district": "東區",
  "southern-district": "南區",
  "yau-tsim-mong": "油尖旺",
  "sham-shui-po-district": "深水埗",
  "kowloon-city-district": "九龍城",
  "wong-tai-sin-district": "黃大仙",
  "kwun-tong-district": "觀塘",
  "kwai-tsing": "葵青",
  "tsuen-wan-district": "荃灣",
  "tuen-mun-district": "屯門",
  "yuen-long-district": "元朗",
  "north-district": "北區",
  "tai-po-district": "大埔",
  "sha-tin-district": "沙田",
  "sai-kung-district": "西貢",
  "islands-district": "離島",
};

function isValidDistrict(id: string): id is DistrictId {
  return districtOptions.some((d) => d.id === id);
}

export async function generateStaticParams() {
  return districtOptions.map((d) => ({ districtId: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ districtId: string }>;
}): Promise<Metadata> {
  const { districtId } = await params;
  if (!isValidDistrict(districtId)) return { title: "RacketStringConnect" };

  const label = getDistrictLabel(districtId);
  const zhLabel = districtChinese[districtId] ?? label;

  return {
    title: `${zhLabel}穿線師 ${label} Stringers — WhatsApp 直接聯絡 · RacketStringConnect`,
    description: `${zhLabel}羽毛球、網球、壁球穿線師。WhatsApp 直接聯絡，毋需中間人。Find badminton, tennis & squash stringers in ${label}, Hong Kong. Direct WhatsApp contact.`,
    keywords: [
      `${label} stringing`,
      `${label} badminton stringing`,
      `${label} tennis stringing`,
      `${zhLabel}穿線`,
      `${zhLabel}羽毛球穿線`,
      `${zhLabel}穿線師 WhatsApp`,
      "穿線師",
      "hong kong stringer",
    ],
    openGraph: {
      title: `${zhLabel} ${label} Stringers · RacketStringConnect`,
      description: `Find racket stringers in ${label}, Hong Kong. WhatsApp direct contact.`,
      type: "website",
      url: `${BASE_URL}/district/${districtId}`,
    },
  };
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ districtId: string }>;
}) {
  const { districtId } = await params;
  if (!isValidDistrict(districtId)) notFound();

  const label = getDistrictLabel(districtId)!;
  const zhLabel = districtChinese[districtId] ?? label;
  const areaIds = districtToSubdistrictIds[districtId] ?? [];

  const allStringers = await fetchActiveStringers();
  const stringers = allStringers.filter((s) => areaIds.includes(s.area));

  const sportSummary = new Map<string, number>();
  for (const s of stringers) {
    for (const sport of s.sports) {
      sportSummary.set(sport, (sportSummary.get(sport) ?? 0) + 1);
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} Racket Stringers`,
    description: `Directory of racket stringing professionals in ${label}, Hong Kong.`,
    url: `${BASE_URL}/district/${districtId}`,
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
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">
          {label} · Hong Kong
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          {zhLabel}穿線師
        </h1>
        <p className="text-base text-slate-600">
          {zhLabel}區內嘅羽毛球、網球、壁球穿線師。WhatsApp 直接聯絡，唔使經中間人。
        </p>

        {sportSummary.size > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {Array.from(sportSummary.entries()).map(([sportId, count]) => {
              const sport = getSportDefinition(sportId as Parameters<typeof getSportDefinition>[0]);
              if (!sport) return null;
              return (
                <span
                  key={sportId}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  {sport.icon && <sport.icon className="h-3.5 w-3.5 text-yellow-400" aria-hidden />}
                  {sport.label} ({count})
                </span>
              );
            })}
          </div>
        )}
      </section>

      {stringers.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-2xl font-black text-slate-200">此區暫時未有穿線師登記</p>
          <p className="mt-2 text-sm text-slate-400">
            成為{zhLabel}首位登記的穿線師 — 球手已在搵人
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
