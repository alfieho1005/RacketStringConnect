"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Stringer } from "@/lib/stringers/types";
import { areaOptions } from "@/config/areas";
import type { AreaId } from "@/config/areas";
import { sportDefinitions } from "@/config/sports";
import type { SportId } from "@/config/sports";
import type { ContactInfo } from "@/lib/stringers/types";

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
];

export default function ProfileForm({ initialValues }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [pricing, setPricing] = useState(initialValues?.pricing ?? "");
  const [area, setArea] = useState<AreaId>(
    initialValues?.area ?? areaOptions[0].id
  );
  const [visibility, setVisibility] = useState<Stringer["visibility"]>(
    initialValues?.visibility ?? "active"
  );
  const [error, setError] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [selectedSports, setSelectedSports] = useState<SportId[]>(
    () => (initialValues?.sports ? [...initialValues.sports] : [])
  );
  const [contactFields, setContactFields] = useState<Record<keyof ContactInfo, string>>({
    whatsapp: initialValues?.contact.whatsapp ?? "",
    instagram: initialValues?.contact.instagram ?? "",
    thread: initialValues?.contact.thread ?? "",
    email: initialValues?.contact.email ?? "",
    phone: initialValues?.contact.phone ?? "",
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
      });
    }
  }, [initialValues]);

  const contactPayload: ContactInfo = useMemo(
    () => buildContactPayload(contactFields) as ContactInfo,
    [contactFields]
  );

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

    if (!name.trim() || !description.trim()) {
      setError("Name and description are required.");
      return;
    }

    if (selectedSports.length === 0) {
      setError("Tell us which sports you support.");
      return;
    }

    setIsWorking(true);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      sports: selectedSports,
      area,
      pricing: pricing.trim() || undefined,
      visibility,
      contact: contactPayload,
      slug: initialValues?.slug,
    };

    const response = await fetch("/api/stringers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

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
          Stringer Name
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
        <p className="text-sm font-semibold text-slate-600">Supported Sports</p>
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

      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="area">
          Area / District
        </label>
        <select
          id="area"
          name="area"
          value={area}
          onChange={(event) => setArea(event.target.value as AreaId)}
          className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
        >
          {areaOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="description">
          Short Description
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
          Pricing Notes
          <span className="ml-2 text-xs font-normal text-slate-400">
            Optional
          </span>
        </label>
        <input
          id="pricing"
          name="pricing"
          value={pricing}
          onChange={(event) => setPricing(event.target.value)}
          placeholder="e.g. From RM 30 or contact for custom quotes"
          className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
        />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-slate-600">Contact Methods</legend>
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
        <p className="text-sm font-semibold text-slate-600">Profile Visibility</p>
        <div className="mt-2 flex gap-3">
          {[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
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
          {initialValues ? "Save changes" : "Save profile"}
        </button>
        <p className="text-xs text-slate-500">
          You will be redirected to the Explore page once saved.
        </p>
      </div>
    </form>
  );
}
