import Link from "next/link";
import type { Stringer } from "@/lib/stringers/types";
import { getAreaLabel } from "@/config/areas";
import { getSportDefinition } from "@/config/sports";
import ContactButtons from "./ContactButtons";

type Props = {
  stringer: Stringer;
};

export default function StringerCard({ stringer }: Props) {
  const sports = stringer.sports
    .map((sportId) => getSportDefinition(sportId))
    .filter(Boolean);

  const areaLabel = getAreaLabel(stringer.area);
  const priceLabel = stringer.pricing || "Contact for price";

  return (
    <article className="flex h-full flex-col rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          {areaLabel}
        </p>
        <Link
          className="text-2xl font-semibold leading-snug text-slate-900 transition hover:text-slate-700"
          href={`/stringers/${stringer.slug}`}
        >
          {stringer.name}
        </Link>
      </div>

      <p className="mt-2 text-sm text-slate-500 whitespace-pre-line">
        {stringer.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {sports.map((sport) => (
          <span
            key={sport?.id}
            className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50/60 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {sport?.icon && (
              <sport.icon className="h-4 w-4" aria-hidden />
            )}
            {sport?.label}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
            Pricing
          </p>
          <p className="text-lg font-semibold text-slate-900">{priceLabel}</p>
        </div>
        <div className="text-right text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          {stringer.visibility === "active" ? "Ready" : "Offline"}
        </div>
      </div>

      <div className="mt-6">
        <ContactButtons contact={stringer.contact} />
      </div>
    </article>
  );
}
