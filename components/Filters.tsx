"use client";

import { sportDefinitions } from "@/config/sports";
import { areaOptions } from "@/config/areas";
import { districtOptions } from "@/config/district";
import { districtToSubdistrictIds } from "@/config/district_to_areas_mapping";
import type { AreaId } from "@/config/areas";
import type { DistrictId } from "@/config/district";
import type { SportId } from "@/config/sports";

const areaOptionMap = new Map(areaOptions.map((option) => [option.id, option] as const));

type Props = {
  selectedSport?: SportId;
  selectedDistrict?: DistrictId;
  selectedArea?: AreaId;
  onSportChange: (value?: SportId) => void;
  onDistrictChange: (value?: DistrictId) => void;
  onAreaChange: (value?: AreaId) => void;
  onReset: () => void;
};

export default function Filters({
  onSportChange,
  onDistrictChange,
  onAreaChange,
  onReset,
  selectedSport,
  selectedDistrict,
  selectedArea,
}: Props) {
  const availableAreaOptions = selectedDistrict
    ? districtToSubdistrictIds[selectedDistrict]
        .map((areaId) => areaOptionMap.get(areaId))
        .filter(
          (area): area is (typeof areaOptions)[number] => Boolean(area)
        )
    : [];

  return (
    <section className="space-y-4 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5">
      <div className="flex items-center gap-3 overflow-x-auto pb-1 md:flex-wrap">
        <p className="text-sm font-semibold uppercase tracking-[0.5em] text-slate-500">
          Sport
        </p>
        {sportDefinitions.map((sport) => {
          const isActive = selectedSport === sport.id;
          return (
            <button
              key={sport.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSportChange(isActive ? undefined : sport.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-slate-900 bg-slate-900/5 text-slate-900"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {sport.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-1 md:flex-wrap">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
          District
        </p>
        {districtOptions.map((district) => {
          const isActive = selectedDistrict === district.id;
          return (
            <button
              key={district.id}
              type="button"
              aria-pressed={isActive}
              onClick={() =>
                onDistrictChange(isActive ? undefined : district.id)
              }
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-slate-900 bg-slate-900/5 text-slate-900"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {district.label}
            </button>
          );
        })}
      </div>

      {selectedDistrict && availableAreaOptions.length > 0 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:flex-wrap">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
            Area
          </p>
          {availableAreaOptions.map((area) => {
            const isActive = selectedArea === area.id;
            return (
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  onAreaChange(isActive ? undefined : area.id)
                }
                key={area.id}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-slate-900 bg-slate-900/5 text-slate-900"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                {area.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border px-4 py-2 text-sm font-semibold transition border-slate-200 bg-white text-slate-500 hover:border-slate-900 hover:text-slate-900"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
