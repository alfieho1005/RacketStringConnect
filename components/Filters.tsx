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

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

const activeClass = "border-yellow-400 bg-yellow-400 text-slate-900 font-bold shadow-sm";
const inactiveClass = "border-gray-200 bg-white text-slate-600 hover:border-gray-300 hover:text-slate-900";

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
        .filter((area): area is (typeof areaOptions)[number] => Boolean(area))
    : [];

  return (
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <FilterRow label="運動類別 Sport">
        {sportDefinitions.map((sport) => {
          const isActive = selectedSport === sport.id;
          return (
            <button
              key={sport.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSportChange(isActive ? undefined : sport.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                isActive ? activeClass : inactiveClass
              }`}
            >
              <sport.icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {sport.label}
            </button>
          );
        })}
      </FilterRow>

      <FilterRow label="所在地區 District">
        {districtOptions.map((district) => {
          const isActive = selectedDistrict === district.id;
          return (
            <button
              key={district.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onDistrictChange(isActive ? undefined : district.id)}
              className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                isActive ? activeClass : inactiveClass
              }`}
            >
              {district.label}
            </button>
          );
        })}
      </FilterRow>

      {selectedDistrict && availableAreaOptions.length > 0 && (
        <FilterRow label="分區 Area">
          {availableAreaOptions.map((area) => {
            const isActive = selectedArea === area.id;
            return (
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onAreaChange(isActive ? undefined : area.id)}
                key={area.id}
                className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                  isActive ? activeClass : inactiveClass
                }`}
              >
                {area.label}
              </button>
            );
          })}
        </FilterRow>
      )}

      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-400 transition hover:border-gray-400 hover:text-slate-700"
        >
          清除篩選 Clear
        </button>
      </div>
    </section>
  );
}
