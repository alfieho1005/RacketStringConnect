import { seedStringers } from "./stringer";
import { slugify } from "./utils";
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

    const baseEntry: Stringer = {
      id: existingIndex >= 0 ? stringerStore[existingIndex].id : generateId(),
      slug,
      name: payload.name,
      description: payload.description,
      sports: payload.sports,
      area: payload.area,
      pricing: payload.pricing,
      contact: payload.contact,
      visibility: payload.visibility,
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
