import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAreaLabel } from "@/config/areas";
import { getSportDefinition } from "@/config/sports";
import ContactButtons from "@/components/ContactButtons";
import { getStringerBySlug } from "@/features/stringers/service";

export const runtime = "edge";

const BASE_URL = "https://racketstringconnect.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getStringerBySlug(slug);

  if (!profile) {
    return { title: "RacketStringConnect" };
  }

  const areaLabel = getAreaLabel(profile.area) ?? profile.area;
  const sportLabels = profile.sports
    .map((id) => getSportDefinition(id)?.label)
    .filter(Boolean)
    .join(" & ");

  const title = `${profile.name} — ${sportLabels} Stringing in ${areaLabel} · RacketStringConnect`;
  const description = `${profile.name} offers ${sportLabels.toLowerCase()} stringing in ${areaLabel}, Hong Kong. ${profile.description?.slice(0, 120) ?? ""}`;

  return {
    title,
    description,
    keywords: [
      `${areaLabel} stringing`,
      `${areaLabel} ${sportLabels.toLowerCase()} stringing`,
      `${sportLabels.toLowerCase()} stringing hong kong`,
      "穿線師",
      `${areaLabel}穿線`,
      profile.name,
    ],
    openGraph: {
      title,
      description,
      type: "profile",
      url: `${BASE_URL}/stringers/${slug}`,
    },
  };
}

export default async function StringerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stringer = await getStringerBySlug(slug);

  if (!stringer) {
    notFound();
  }

  const areaLabel = getAreaLabel(stringer.area) ?? stringer.area;
  const sports = stringer.sports
    .map((sportId) => getSportDefinition(sportId))
    .filter(Boolean);

  const sportLabels = sports.map((s) => s?.label).filter(Boolean).join(" & ");
  const isActive = stringer.visibility === "active";

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: stringer.name,
    description: stringer.description,
    serviceType: `${sportLabels} Racket Stringing`,
    areaServed: {
      "@type": "City",
      name: areaLabel,
      containedInPlace: {
        "@type": "Country",
        name: "Hong Kong",
      },
    },
    ...(stringer.pricing ? { priceRange: stringer.pricing } : {}),
    ...(stringer.contact.phone ? { telephone: stringer.contact.phone } : {}),
    ...(stringer.contact.email ? { email: stringer.contact.email } : {}),
    ...(stringer.contact.website ? { url: stringer.contact.website } : {}),
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to explore
      </Link>

      {/* Profile card */}
      <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Yellow top strip */}
        <div className="-mx-6 -mt-6 mb-2 h-1 rounded-t-xl bg-yellow-400" />

        {/* Header */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">
            {areaLabel} · Hong Kong
          </p>
          <h1 className="text-2xl font-bold text-slate-900">{stringer.name}</h1>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              isActive
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-gray-100 text-gray-400 border border-gray-200"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-gray-300"}`} />
            {isActive ? "Ready to string" : "Temporarily offline"}
          </span>
        </div>

        {/* Sport badges */}
        <div className="flex flex-wrap gap-2">
          {sports.map((sport) => (
            <span
              key={sport?.id}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
            >
              {sport?.icon ? <sport.icon className="h-3.5 w-3.5 text-yellow-400" aria-hidden /> : null}
              {sport?.label}
            </span>
          ))}
        </div>

        {/* Description + Pricing — stack on mobile, 2-col on md */}
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">
              About
            </h2>
            <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">
              {stringer.description}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">
              Pricing
            </h2>
            <p className="text-xl font-bold text-slate-900">
              {stringer.pricing || "Contact for price"}
            </p>
            <p className="text-xs text-slate-400">
              All bookings happen off-platform directly with the stringer.
            </p>
          </div>
        </div>

        {/* Contact — full width buttons, easy to tap on mobile */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">
            Contact
          </h2>
          <ContactButtons contact={stringer.contact} />
        </div>
      </section>
    </main>
  );
}
