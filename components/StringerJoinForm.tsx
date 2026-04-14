"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { areaOptions } from "@/config/areas";
import type { AreaId } from "@/config/areas";
import { districtOptions } from "@/config/district";
import { districtToSubdistrictIds } from "@/config/district_to_areas_mapping";
import { sportDefinitions } from "@/config/sports";
import type { SportId } from "@/config/sports";
import { stringerJoinConfig, type StringerJoinLabels } from "@/config/stringerJoin";

type DistrictId = (typeof districtOptions)[number]["id"];

interface FormState {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  thread: string;
  facebook: string;
  website: string;
  area: AreaId | "";
  district: DistrictId | "";
  pricing: string;
  description: string;
  sports: SportId[];
  additionalNotes: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  whatsapp: "",
  instagram: "",
  thread: "",
  facebook: "",
  website: "",
  area: "",
  district: "",
  pricing: "",
  description: "",
  sports: [],
  additionalNotes: "",
};

type StringerJoinFormProps = {
  labels?: StringerJoinLabels;
  buttonLabel?: string;
};

const contactFields = [
  { id: "email", labelKey: "email" },
  { id: "phone", labelKey: "phone" },
  { id: "whatsapp", labelKey: "whatsapp" },
  { id: "instagram", labelKey: "instagram" },
  { id: "thread", labelKey: "thread" },
  { id: "facebook", labelKey: "facebook" },
  { id: "website", labelKey: "website" },
] as const;

export default function StringerJoinForm({
  labels = stringerJoinConfig.labels,
  buttonLabel = stringerJoinConfig.buttonLabel,
}: StringerJoinFormProps) {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "working" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const selectedSports = useMemo(
    () => sportDefinitions.filter((sport) => formState.sports.includes(sport.id)),
    [formState.sports],
  );

  const districtIdOptions = districtOptions;

  const availableAreaOptions = useMemo<
    readonly (typeof areaOptions)[number][]
  >(() => {
    if (formState.district) {
      const areaIds = districtToSubdistrictIds[formState.district] ?? [];
      if (areaIds.length > 0) {
        return areaOptions.filter((option) => areaIds.includes(option.id));
      }
    }
    return areaOptions;
  }, [formState.district]);

  useEffect(() => {
    if (!formState.district || availableAreaOptions.length === 0) {
      return;
    }

    if (formState.area && availableAreaOptions.some((option) => option.id === formState.area)) {
      return;
    }

    setFormState((prev) => ({
      ...prev,
      area: availableAreaOptions[0].id,
    }));
  }, [availableAreaOptions, formState.area, formState.district]);

  const handleToggleSport = (sportId: SportId) => {
    setFormState((prev) => {
      const nextSports = prev.sports.includes(sportId)
        ? prev.sports.filter((id) => id !== sportId)
        : [...prev.sports, sportId];
      return { ...prev, sports: nextSports };
    });
  };

  const hasContact = () =>
    [formState.email, formState.phone, formState.whatsapp, formState.instagram, formState.thread, formState.facebook, formState.website]
      .some((value) => value.trim());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (!formState.name.trim() || !formState.description.trim()) {
      setStatus("error");
      setMessage("請輸入穿線師姓名及服務簡介。");
      return;
    }

    if (formState.sports.length === 0) {
      setStatus("error");
      setMessage("請選擇你提供穿線服務的運動。");
      return;
    }

    if (!formState.area) {
      setStatus("error");
      setMessage("請選擇你的服務分區。");
      return;
    }

    if (!hasContact()) {
      setStatus("error");
      setMessage("請填寫至少一個聯絡方式，方便球手聯絡你。");
      return;
    }

    setStatus("working");

    const contact: Record<string, string> = {};
    for (const field of contactFields) {
      const val = formState[field.id].trim();
      if (val) contact[field.id] = val;
    }

    const res = await fetch("/api/stringers/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formState.name.trim(),
        description: formState.description.trim(),
        sports: formState.sports,
        area: formState.area,
        pricing: formState.pricing.trim() || undefined,
        contact,
        additionalNotes: formState.additionalNotes.trim() || undefined,
      }),
    });

    if (res.ok) {
      setStatus("success");
      setMessage("已收到你的登記申請！我們將於 1–2 個工作天內審核並上架。請留意 WhatsApp 或電郵通知。");
      setFormState(initialFormState);
    } else {
      const data = await res.json() as { error?: string };
      setStatus("error");
      setMessage(data.error ?? "提交失敗，請稍後再試。");
    }
  };

  return (
    <form className="space-y-6 rounded-[32px] border border-white/70 bg-white/80 p-5 sm:p-8 shadow-xl shadow-slate-900/5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <h2 className="text-base font-semibold uppercase tracking-[0.5em] text-slate-400">
          登記成為穿線師
        </h2>
        <p className="text-lg text-slate-600">
          填寫資料，我們審核後上架。永久免費，毋需抽佣。
        </p>
      </div>

      {message && (
        <div
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
            status === "error" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{labels.name}</span>
          <input
            required
            value={formState.name}
            onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          />
        </label>

        <label className="space-y-1 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{labels.description}</span>
          <textarea
            required
            rows={4}
            value={formState.description}
            onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {contactFields.map((field) => (
          <label key={field.id} className="space-y-1 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{labels[field.labelKey]}</span>
            <input
              type="text"
              value={formState[field.id]}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, [field.id]: event.target.value }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            />
          </label>
        ))}
      </div>

      {districtIdOptions.length > 0 && (
        <label className="space-y-1 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{labels.district}</span>
          <select
            value={formState.district}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                district: event.target.value
                  ? (event.target.value as DistrictId)
                  : "",
              }))
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          >
            <option value="">選擇地區 Select district</option>
            {districtIdOptions.map((districtOption) => (
              <option key={districtOption.id} value={districtOption.id}>
                {districtOption.label}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="space-y-1 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{labels.area}</span>
        <select
          required
          value={formState.area}
          onChange={(event) => setFormState((prev) => ({ ...prev, area: event.target.value as AreaId }))}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
        >
          <option value="">選擇分區 Select area</option>
          {availableAreaOptions.map((area) => (
            <option key={area.id} value={area.id}>
              {area.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{labels.pricing}</span>
        <input
          value={formState.pricing}
          onChange={(event) => setFormState((prev) => ({ ...prev, pricing: event.target.value }))}
          placeholder="Pricing details or note"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
        />
      </label>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-slate-600">{labels.sportsLegend}</legend>
        <div className="grid gap-2 md:grid-cols-3">
          {sportDefinitions.map((sport) => {
            const isActive = formState.sports.includes(sport.id);
            return (
              <label
                key={sport.id}
                className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
              >
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => handleToggleSport(sport.id)}
                  className="h-4 w-4 accent-slate-700"
                />
                {sport.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="space-y-1 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{labels.moreLabel}</span>
        <textarea
          rows={3}
          value={formState.additionalNotes}
          onChange={(event) => setFormState((prev) => ({ ...prev, additionalNotes: event.target.value }))}
          placeholder="給審核團隊的備註（營業時間、特別專長、其他補充）"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
        />
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === "working"}
          className="rounded-full border border-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-slate-900 hover:text-white disabled:opacity-50"
        >
          {status === "working" ? "Submitting..." : buttonLabel}
        </button>
      </div>
    </form>
  );
}
