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
  const isActive = stringer.visibility === "active";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md hover:border-gray-300">
      {/* Yellow accent strip at top */}
      <div className="h-1 w-full bg-yellow-400" />

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        {/* Header: location + status */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 truncate">
              {areaLabel}
            </p>
            <Link
              className="block text-lg font-bold leading-snug text-slate-900 transition hover:text-yellow-600"
              href={`/stringers/${stringer.slug}`}
            >
              {stringer.name}
            </Link>
          </div>
          {/* Status badge */}
          <span
            className={`mt-1 flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
              isActive
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-gray-100 text-gray-400 border border-gray-200"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${isActive ? "bg-green-500" : "bg-gray-300"}`} />
            {isActive ? "Ready" : "Offline"}
          </span>
        </div>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-slate-500 whitespace-pre-line">
          {stringer.description}
        </p>

        {/* Sport badges */}
        <div className="flex flex-wrap gap-2">
          {sports.map((sport) => (
            <span
              key={sport?.id}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
            >
              {sport?.icon && (
                <sport.icon className="h-3 w-3 text-yellow-400" aria-hidden />
              )}
              {sport?.label}
            </span>
          ))}
        </div>

        {/* Pricing row */}
        <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
              Pricing
            </p>
            <p className="text-base font-bold text-slate-900">{priceLabel}</p>
          </div>
        </div>

        {/* Contact — full width on mobile for easy tapping */}
        <ContactButtons contact={stringer.contact} />
      </div>
    </article>
  );
}
