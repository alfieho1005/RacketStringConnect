import { stringerRepository } from "@/lib/stringers/memoryRepository";
import type { Stringer } from "@/lib/stringers/types";

export async function fetchActiveStringers(): Promise<Stringer[]> {
  const stringers = await stringerRepository.list();
  return stringers
    .filter((stringer) => stringer.visibility === "active")
    .sort((a, b) => (a.sortId ?? 0) - (b.sortId ?? 0));
}

export async function getStringerBySlug(slug: string): Promise<Stringer | undefined> {
  return stringerRepository.getBySlug(slug);
}

export { stringerRepository };
