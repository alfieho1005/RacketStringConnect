"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ContactInfo, Stringer, StringerPayload } from "@/lib/stringers/types";
import { areaOptions } from "@/config/areas";
import type { AreaId } from "@/config/areas";
import { districtOptions } from "@/config/district";
import type { DistrictId } from "@/config/district";
import { districtToSubdistrictIds } from "@/config/district_to_areas_mapping";
import { sportDefinitions } from "@/config/sports";
import type { SportId } from "@/config/sports";

type Props = {
  initialValues?: Stringer;
};

const buildContactPayload = (values: Record<string, string>) => {
  return Object.entries(values).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value.trim()) {
      acc[key] = value.trim();
    }
    return acc;
  }, {});
};

const contactFieldDefinitions: Array<{ id: keyof ContactInfo; label: string }> = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "instagram", label: "Instagram" },
  { id: "thread", label: "Threads" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "website", label: "Website" },
  { id: "facebook", label: "Facebook" },
];

export default function ProfileForm({ initialValues }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [pricing, setPricing] = useState(initialValues?.pricing ?? "");
  const areaToDistrictMap = useMemo(() => {
    const map = new Map<AreaId, DistrictId>();
    Object.entries(districtToSubdistrictIds).forEach(([districtId, ids]) => {
      ids.forEach((areaId) => map.set(areaId as AreaId, districtId as DistrictId));
    });
    return map;
  }, []);

  const initialDistrict = initialValues?.area
    ? areaToDistrictMap.get(initialValues.area)
    : undefined;

  const [district, setDistrict] = useState<DistrictId | "">(initialDistrict ?? "");
  const [area, setArea] = useState<AreaId>(
    initialValues?.area ?? areaOptions[0].id
  );
  const [visibility, setVisibility] = useState<Stringer["visibility"]>(
    initialValues?.visibility ?? "active"
  );
  const [hasCertifiedStringers, setHasCertifiedStringers] = useState(
    initialValues?.hasCertifiedStringers ?? false
  );
  const [error, setError] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [selectedSports, setSelectedSports] = useState<SportId[]>(
    () => (initialValues?.sports ? [...initialValues.sports] : [])
  );
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [contactFields, setContactFields] = useState<Record<keyof ContactInfo, string>>({
    whatsapp: initialValues?.contact.whatsapp ?? "",
    instagram: initialValues?.contact.instagram ?? "",
    thread: initialValues?.contact.thread ?? "",
    email: initialValues?.contact.email ?? "",
    phone: initialValues?.contact.phone ?? "",
    website: initialValues?.contact.website ?? "",
    facebook: initialValues?.contact.facebook ?? "",
  });

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setDescription(initialValues.description);
      setPricing(initialValues.pricing ?? "");
      setArea(initialValues.area);
      setVisibility(initialValues.visibility);
      setSelectedSports(initialValues.sports ? [...initialValues.sports] : []);
      setContactFields({
        whatsapp: initialValues.contact.whatsapp ?? "",
        instagram: initialValues.contact.instagram ?? "",
        thread: initialValues.contact.thread ?? "",
        email: initialValues.contact.email ?? "",
        phone: initialValues.contact.phone ?? "",
        website: initialValues.contact.website ?? "",
        facebook: initialValues.contact.facebook ?? "",
      });
      setHasCertifiedStringers(initialValues.hasCertifiedStringers ?? false);
      setAdditionalNotes("");
    }
  }, [initialValues]);
  useEffect(() => {
    // ensure district matches area when initial values change
    if (initialValues?.area) {
      setDistrict(areaToDistrictMap.get(initialValues.area) ?? "");
    }
  }, [initialValues?.area, areaToDistrictMap]);

  const contactPayload: ContactInfo = useMemo(
    () => buildContactPayload(contactFields) as ContactInfo,
    [contactFields]
  );

  const districtIdOptions = districtOptions;

  const availableAreaOptions = useMemo<
    readonly (typeof areaOptions)[number][]
  >(() => {
    if (district) {
      const areaIds = districtToSubdistrictIds[district] ?? [];
      if (areaIds.length > 0) {
        return areaOptions.filter((option) => areaIds.includes(option.id));
      }
    }
    return areaOptions;
  }, [district]);

  useEffect(() => {
    if (districtIdOptions.length > 0) {
      if (!district) {
        setDistrict(districtIdOptions[0].id);
        return;
      }

      if (!districtIdOptions.some((item) => item.id === district)) {
        setDistrict(districtIdOptions[0].id);
      }
    } else if (district) {
      setDistrict("");
    }
  }, [districtIdOptions, district]);

  useEffect(() => {
    if (district) {
      const areaIds = districtToSubdistrictIds[district] ?? [];
      if (areaIds.length > 0 && !areaIds.includes(area)) {
        setArea(areaIds[0] as AreaId);
      }
    }
  }, [district, area]);

  const handleToggleSport = (sportId: SportId) => {
    setSelectedSports((previous) =>
      previous.includes(sportId)
        ? previous.filter((value) => value !== sportId)
        : [...previous, sportId]
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || !trimmedDescription) {
      setError("請輸入穿線師姓名及服務簡介。");
      return;
    }

    if (selectedSports.length === 0) {
      setError("請選擇你提供穿線服務的運動。");
      return;
    }

    if (!initialValues && Object.keys(contactPayload).length === 0) {
      setError("請填寫至少一個聯絡方式，方便球手聯絡你。");
      return;
    }

    setIsWorking(true);

    const payload: StringerPayload = {
      name: trimmedName,
      description: trimmedDescription,
      sports: selectedSports,
      area,
      pricing: pricing.trim() || undefined,
      contact: contactPayload,
      visibility,
      hasCertifiedStringers,
      slug: initialValues?.slug,
    };

    const response = await fetch("/api/stringers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: { error?: string } = {};
    try {
      data = await response.json();
    } catch {
      data = { error: "Unable to read server response." };
    }

    if (!response.ok) {
      setError(data?.error || "Unable to save profile.");
      setIsWorking(false);
      return;
    }

    router.push("/");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="name">
          穿線師姓名 / 店舖名稱
        </label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-900"
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-600">穿線運動類別 Sports</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {sportDefinitions.map((sport) => {
            const isSelected = selectedSports.includes(sport.id);
            return (
              <button
                key={sport.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleToggleSport(sport.id)}
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                  isSelected
                    ? "border-slate-900 bg-slate-900/5 text-slate-900"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                {sport.label}
              </button>
            );
          })}
        </div>
      </div>

      {districtIdOptions.length > 0 && (
        <div>
          <label className="text-sm font-semibold text-slate-600" htmlFor="district">
            所在地區 District
          </label>
          <select
            id="district"
            name="district"
            value={district}
            onChange={(event) =>
              setDistrict(event.target.value as DistrictId)
            }
            className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
          >
            <option value="">Select district</option>
            {districtIdOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="area">
          分區 Neighbourhood
        </label>
        <select
          id="area"
          name="area"
          value={area}
          onChange={(event) => setArea(event.target.value as AreaId)}
          className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
        >
          {availableAreaOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="description">
          服務簡介 About your service
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          rows={3}
          className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-900"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="pricing">
          收費參考 Pricing
          <span className="ml-2 text-xs font-normal text-slate-400">
            選填 Optional
          </span>
        </label>
        <input
          id="pricing"
          name="pricing"
          value={pricing}
          onChange={(event) => setPricing(event.target.value)}
          placeholder="例如：每支 HK$80 起，詳情可查詢"
          className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-600">
          持牌穿線師 Certified stringer on staff
        </p>
        <div className="mt-2 flex gap-3">
          {[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={hasCertifiedStringers === option.value}
              onClick={() => setHasCertifiedStringers(option.value)}
              className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                hasCertifiedStringers === option.value
                  ? "border-slate-900 bg-slate-900/5 text-slate-900"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">
          如店舖有持牌穿線師，請選 &quot;Yes&quot;。
        </p>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-slate-600">聯絡方式 How players can reach you</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {contactFieldDefinitions.map((field) => (
            <label key={field.id} className="text-sm font-semibold text-slate-600">
              {field.label}
              <input
                type="text"
                value={contactFields[field.id] ?? ""}
                onChange={(event) =>
                  setContactFields((prev) => ({
                    ...prev,
                    [field.id]: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
              />
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="additionalNotes">
          備註 Notes for our team
          <span className="ml-2 text-xs font-normal text-slate-400">選填 Optional</span>
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          value={additionalNotes}
          onChange={(event) => setAdditionalNotes(event.target.value)}
          rows={3}
          placeholder="給審核團隊的備註（營業時間、特別專長、其他補充）"
          className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-900"
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-600">上架狀態 Listing status</p>
        <div className="mt-2 flex gap-3">
          {[
            { value: "active", label: "顯示中 Visible" },
            { value: "inactive", label: "暫時隱藏 Hidden" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={visibility === option.value}
              onClick={() =>
                setVisibility(option.value as Stringer["visibility"])
              }
              className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                visibility === option.value
                  ? "border-slate-900 bg-slate-900/5 text-slate-900"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isWorking}
          className="flex-1 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {initialValues ? "更新資料 Update" : "提交審核 Submit"}
        </button>
        <p className="text-xs text-slate-500">
          提交後將跳轉至目錄頁面。
        </p>
      </div>
    </form>
  );
}
