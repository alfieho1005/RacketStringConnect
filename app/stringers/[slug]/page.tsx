import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAreaLabel } from "@/config/areas";
import { getSportDefinition } from "@/config/sports";
import ContactButtons from "@/components/ContactButtons";
import { getStringerBySlug } from "@/features/stringers/service";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const profile = await getStringerBySlug(params.slug);

  if (!profile) {
    return { title: "StringConnect" };
  }

  return {
    title: `${profile.name} · StringConnect`,
    description: profile.description,
  };
}

export default async function StringerProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const stringer = await getStringerBySlug(params.slug);

  if (!stringer) {
    notFound();
  }

  const areaLabel = getAreaLabel(stringer.area) ?? stringer.area;
  const sports = stringer.sports
    .map((sportId) => getSportDefinition(sportId))
    .filter(Boolean);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center text-sm font-semibold text-slate-600 transition hover:text-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to explore
      </Link>

      <section className="space-y-6 rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-xl shadow-slate-900/5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            {areaLabel}
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {stringer.name}
          </h1>
          <p className="text-sm text-slate-500">{stringer.visibility === "active" ? "Currently active" : "Temporarily offline"}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {sports.map((sport) => (
            <span
              key={sport?.id}
              className="flex items-center gap-1 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-2 text-xs font-semibold text-slate-600"
            >
              {sport?.icon && (
                <sport.icon className="h-4 w-4" aria-hidden />
              )}
              {sport?.label}
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
              Description
            </h2>
          <p className="text-lg text-slate-700 whitespace-pre-line">
            {stringer.description}
          </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
              Pricing
            </h2>
            <p className="text-lg font-semibold text-slate-900">
              {stringer.pricing || "Contact for price"}
            </p>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              All follow-up happens off-platform
            </p>
          </article>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            Contact
          </h2>
          <ContactButtons contact={stringer.contact} />
        </div>

      </section>
    </main>
  );
}
