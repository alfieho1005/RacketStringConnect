"use client";

import { useEffect, useMemo, useState } from "react";
import Filters from "./Filters";
import StringerCard from "./StringerCard";
import type { Stringer } from "@/lib/stringers/types";
import type { AreaId } from "@/config/areas";
import { districtToSubdistrictIds } from "@/config/district_to_areas_mapping";
import type { DistrictId } from "@/config/district";
import type { SportId } from "@/config/sports";
import type { CountryId } from "@/config/countries";
import { sportDefinitions } from "@/config/sports";
import Link from "next/link";

interface Props {
  stringers: Stringer[];
}

export default function ExploreSection({ stringers }: Props) {
  const [selectedSport, setSelectedSport] = useState<SportId>();
  const [selectedCountry, setSelectedCountry] = useState<CountryId>();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictId>();
  const [selectedArea, setSelectedArea] = useState<AreaId>();

  useEffect(() => {
    setSelectedArea(undefined);
  }, [selectedDistrict]);

  useEffect(() => {
    setSelectedDistrict(undefined);
    setSelectedArea(undefined);
  }, [selectedCountry]);

  const handleResetFilters = () => {
    setSelectedSport(undefined);
    setSelectedDistrict(undefined);
    setSelectedArea(undefined);
    setSelectedCountry(undefined);
  };

  const filteredStringers = useMemo(() => {
    const districtAreas = selectedDistrict
      ? districtToSubdistrictIds[selectedDistrict]
      : [];
    return stringers.filter((stringer) => {
      const matchesSport = selectedSport
        ? stringer.sports.includes(selectedSport)
        : true;
      const matchesDistrict = selectedDistrict
        ? districtAreas.includes(stringer.area)
        : true;
      const matchesArea = selectedArea ? stringer.area === selectedArea : true;
      const matchesCountry = selectedCountry
        ? stringer.country === selectedCountry
        : true;
      return matchesSport && matchesDistrict && matchesArea && matchesCountry;
    });
  }, [stringers, selectedSport, selectedDistrict, selectedArea, selectedCountry]);

  const sportCounts = useMemo(
    () =>
      sportDefinitions.map((sport) => ({
        ...sport,
        count: stringers.filter((s) => s.sports.includes(sport.id)).length,
      })),
    [stringers]
  );

  const hasFilters =
    selectedSport || selectedCountry || selectedDistrict || selectedArea;

  return (
    <div className="space-y-6 px-4 py-6 mx-auto max-w-5xl">
      {/* Hero */}
      <section className="rounded-2xl bg-slate-900 px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: headline + CTAs */}
          <div className="max-w-xl space-y-5">
            {/* Free badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/15 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-yellow-400">
                100% Free Platform
              </p>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Find Your<br />
              <span className="text-yellow-400">Perfect Stringer</span>
            </h1>

            <p className="text-base leading-relaxed text-slate-400">
              Discover local badminton, tennis and squash stringing
              professionals. Filter by location and connect directly — no
              middleman, no fees, no bookings.
            </p>

            {/* CTAs — stacked on mobile, row on sm+ */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/stringers/join"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-yellow-300 active:bg-yellow-500"
              >
                List Yourself — Free
              </Link>
              <a
                href="#listings"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                Browse Stringers
              </a>
            </div>
          </div>

          {/* Sport stats */}
          <div className="grid grid-cols-3 gap-3 lg:flex lg:flex-col lg:min-w-[200px]">
            {sportCounts.map((sport) => (
              <div
                key={sport.id}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/60 px-3 py-3 sm:px-4"
              >
                <sport.icon className="h-5 w-5 text-yellow-400 flex-shrink-0" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {sport.label}
                  </p>
                  <p className="text-xs text-slate-500">
                    {sport.count} stringer{sport.count !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <Filters
        selectedSport={selectedSport}
        selectedDistrict={selectedDistrict}
        selectedArea={selectedArea}
        onSportChange={setSelectedSport}
        onDistrictChange={setSelectedDistrict}
        onAreaChange={setSelectedArea}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        onReset={handleResetFilters}
      />

      {/* Results */}
      <div id="listings" className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
            {hasFilters
              ? `${filteredStringers.length} result${filteredStringers.length !== 1 ? "s" : ""}`
              : `${filteredStringers.length} stringer${filteredStringers.length !== 1 ? "s" : ""} listed`}
          </p>
          {hasFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-yellow-600 transition hover:text-yellow-800 underline-offset-2 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredStringers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16 text-center px-6">
            <p className="text-lg font-bold text-slate-300">No stringers found</p>
            <p className="mt-2 max-w-xs text-sm text-slate-400">
              Try adjusting your filters, or be the first to list in this area.
            </p>
            <Link
              href="/stringers/join"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-yellow-300"
            >
              List Yourself — Free
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredStringers.map((stringer) => (
              <StringerCard key={stringer.slug} stringer={stringer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
