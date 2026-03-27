import { seedStringers } from "./stringer";
import { slugify } from "./utils";
import { DEFAULT_COUNTRY } from "@/config/countries";
import type { Stringer, StringerPayload } from "./types";

const stringerStore: Stringer[] = [...seedStringers];

const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 11);
};

export const stringerRepository = {
  async list(): Promise<Stringer[]> {
    return [...stringerStore];
  },

  async getBySlug(slug: string): Promise<Stringer | undefined> {
    return stringerStore.find((stringer) => stringer.slug === slug);
  },

  async upsert(payload: StringerPayload): Promise<Stringer> {
    const slug = payload.slug ?? slugify(payload.name);
    const existingIndex = stringerStore.findIndex(
      (stringer) => stringer.slug === slug
    );

    const country =
      payload.country ??
      stringerStore[existingIndex]?.country ??
      DEFAULT_COUNTRY;

    const baseEntry: Stringer = {
      id: existingIndex >= 0 ? stringerStore[existingIndex].id : generateId(),
      slug,
      name: payload.name,
      description: payload.description,
      sports: payload.sports,
      area: payload.area,
      country,
      pricing: payload.pricing,
      contact: payload.contact,
      visibility: payload.visibility,
      hasCertifiedStringers:
        payload.hasCertifiedStringers ??
        stringerStore[existingIndex]?.hasCertifiedStringers ??
        false,
      sortId: payload.sortId ?? stringerStore[existingIndex]?.sortId,
    };

    if (existingIndex >= 0) {
      stringerStore[existingIndex] = baseEntry;
    } else {
      stringerStore.unshift(baseEntry);
    }

    return baseEntry;
  },
};
