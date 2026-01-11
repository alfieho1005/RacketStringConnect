"use client";

import { useEffect, useMemo, useState } from "react";
import Filters from "./Filters";
import StringerCard from "./StringerCard";
import type { Stringer } from "@/lib/stringers/types";
import type { AreaId } from "@/config/areas";
import { districtToSubdistrictIds } from "@/config/district_to_areas_mapping";
import type { DistrictId } from "@/config/district";
import type { SportId } from "@/config/sports";

interface Props {
  stringers: Stringer[];
}

export default function ExploreSection({ stringers }: Props) {
  const [selectedSport, setSelectedSport] = useState<SportId>();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictId>();
  const [selectedArea, setSelectedArea] = useState<AreaId>();

  useEffect(() => {
    setSelectedArea(undefined);
  }, [selectedDistrict]);

  const handleResetFilters = () => {
    setSelectedSport(undefined);
    setSelectedDistrict(undefined);
    setSelectedArea(undefined);
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
      return matchesSport && matchesDistrict && matchesArea;
    });
  }, [stringers, selectedSport, selectedDistrict, selectedArea]);

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.5em] text-slate-500">
          Explore Stringers
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">Racket String Connect Map</h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Discover local badminton and tennis stringing pros with transparent contact
          info. Filters let you narrow by sport and district, while every profile links
          out to their contact channels.
        </p>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
          {filteredStringers.length} active stringer{filteredStringers.length === 1 ? "" : "s"}
        </p>
      </div>

      <Filters
        selectedSport={selectedSport}
        selectedDistrict={selectedDistrict}
        selectedArea={selectedArea}
        onSportChange={setSelectedSport}
        onDistrictChange={setSelectedDistrict}
        onAreaChange={setSelectedArea}
        onReset={handleResetFilters}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {filteredStringers.map((stringer) => (
          <StringerCard key={stringer.id} stringer={stringer} />
        ))}
      </div>
    </section>
  );
}
