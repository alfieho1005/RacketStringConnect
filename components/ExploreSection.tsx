"use client";

import { useEffect, useMemo, useState } from "react";
import Filters from "./Filters";
import StringerCard from "./StringerCard";
import type { Stringer } from "@/lib/stringers/types";
import type { AreaId } from "@/config/areas";
import { districtToSubdistrictIds } from "@/config/district_to_areas_mapping";
import type { DistrictId } from "@/config/district";
import type { SportId } from "@/config/sports";
import { sportDefinitions } from "@/config/sports";
import Link from "next/link";
import Image from "next/image";

interface Props {
  stringers: Stringer[];
}

export default function ExploreSection({ stringers }: Props) {
  const [selectedSport, setSelectedSport] = useState<SportId>();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictId>();
  const [selectedArea, setSelectedArea] = useState<AreaId>();

  useEffect(() => { setSelectedArea(undefined); }, [selectedDistrict]);

  const handleResetFilters = () => {
    setSelectedSport(undefined);
    setSelectedDistrict(undefined);
    setSelectedArea(undefined);
  };

  const filteredStringers = useMemo(() => {
    const districtAreas = selectedDistrict ? districtToSubdistrictIds[selectedDistrict] : [];
    return stringers.filter((s) => {
      const matchesSport = selectedSport ? s.sports.includes(selectedSport) : true;
      const matchesDistrict = selectedDistrict ? districtAreas.includes(s.area) : true;
      const matchesArea = selectedArea ? s.area === selectedArea : true;
      return matchesSport && matchesDistrict && matchesArea;
    });
  }, [stringers, selectedSport, selectedDistrict, selectedArea]);

  const sportCounts = useMemo(
    () => sportDefinitions.map((sport) => ({
      ...sport,
      count: stringers.filter((s) => s.sports.includes(sport.id)).length,
    })),
    [stringers]
  );

  const hasFilters = selectedSport || selectedDistrict || selectedArea;

  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero — full-bleed image with text overlay */}
      <section className="pb-10 pt-8 sm:pt-12">
        <div className="relative mb-8 overflow-hidden rounded-2xl" style={{ minHeight: "420px" }}>

          {/* Background image */}
          <Image
            src="/images/racketstringconnect.jpg"
            alt="Stringer's hands restringing a tennis racket on a stringing machine"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Dark gradient overlay — bottom-heavy so text on left reads clearly */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/20" />

          {/* Content on top */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10" style={{ minHeight: "420px" }}>

            {/* Sport count strip */}
            {sportCounts.some((s) => s.count > 0) ? (
              <div className="flex gap-5">
                {sportCounts.map((sport) => {
                  const chineseLabels: Record<string, string> = {
                    badminton: "羽毛球",
                    tennis: "網球",
                    squash: "壁球",
                    pickleball: "匹克球",
                  };
                  return (
                    <button
                      key={sport.id}
                      onClick={() => setSelectedSport(selectedSport === sport.id ? undefined : sport.id)}
                      className={`shrink-0 text-center transition ${
                        selectedSport === sport.id ? "opacity-100" : "opacity-40 hover:opacity-70"
                      }`}
                    >
                      <span className={`block text-2xl font-black leading-none sm:text-3xl ${
                        selectedSport === sport.id ? "text-yellow-400" : "text-white"
                      }`}>
                        {sport.count}
                      </span>
                      <span className="block text-[10px] font-semibold uppercase tracking-widest text-white/60">
                        {chineseLabels[sport.id] ?? sport.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-white/80">覆蓋全港 18 區</p>
                <p className="text-[11px] text-white/50 uppercase tracking-widest">Growing across all districts</p>
              </div>
            )}

            {/* Headline + CTA pinned to bottom */}
            <div className="max-w-lg">
              <h1 className="text-4xl font-black leading-[1.05] text-white sm:text-5xl md:text-6xl">
                香港穿線師目錄<br /><span className="relative inline-block">
                  <span className="relative z-10">Find your stringer.</span>
                  <span
                    aria-hidden
                    className="absolute bottom-1 left-0 right-0 h-3 -skew-x-2 bg-yellow-400 sm:h-4"
                    style={{ zIndex: 0 }}
                  />
                </span>
              </h1>

              <p className="mt-4 text-base text-white/75 sm:text-lg">
                羽毛球 · 網球 · 壁球穿線師，覆蓋全港各區。直接聯絡，毋需中間人。
              </p>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                <span>實名穿線師</span>
                <span>·</span>
                <span>直接聯絡</span>
                <span>·</span>
                <span>免費登記</span>
                <span>·</span>
                <span>香港專屬</span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/stringers/join"
                  className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-yellow-300 active:bg-yellow-500"
                >
                  免費登記穿線師
                </Link>
                <a
                  href="#listings"
                  className="text-sm font-semibold text-white/70 underline underline-offset-4 transition hover:text-white"
                >
                  瀏覽全部穿線師 ↓
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Filters — no box, just a ruled section */}
      <div className="border-t border-gray-200">
        <Filters
          selectedSport={selectedSport}
          selectedDistrict={selectedDistrict}
          selectedArea={selectedArea}
          onSportChange={setSelectedSport}
          onDistrictChange={setSelectedDistrict}
          onAreaChange={setSelectedArea}
          onReset={handleResetFilters}
        />
      </div>

      {/* Results */}
      <div id="listings" className="pb-16 pt-6">
        <div className="mb-4 flex items-baseline justify-between">
          <p className="text-sm font-semibold text-slate-400">
            {hasFilters
              ? `${filteredStringers.length} 位穿線師`
              : `${filteredStringers.length} 位穿線師登記中`}
          </p>
          {hasFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-slate-400 underline underline-offset-4 transition hover:text-slate-700"
            >
              清除篩選
            </button>
          )}
        </div>

        {filteredStringers.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-2xl font-black text-slate-200">此區暫時未有穿線師登記</p>
            <p className="mt-2 text-sm text-slate-400">
              成為首位登記的穿線師 — 球手已在搵人
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
            {filteredStringers.map((stringer) => (
              <StringerCard key={stringer.slug} stringer={stringer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
