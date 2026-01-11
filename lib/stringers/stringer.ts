import { slugify } from "./utils";
import type { SportId } from "@/config/sports";
import type { Stringer } from "./types";

type SeedStringer = Omit<Stringer, "slug" | "sports"> & {
  sports: readonly SportId[];
};

const baseStringers: ReadonlyArray<SeedStringer> = [
  {
    id: "central-western",
    name: "Peak Sports",
    description:
      "🎾 代購網球服裝 運動鞋 球拍 穿線\n 🎾💰FPS | PAYME | ALIPAY\n🎾平郵/ 順豐到付",
    sports: ["tennis" as const],
    area: "kwun-tong" as const,
    pricing: "Eqnuiry for details",
    sortId: 1,
    contact: {
      whatsapp: "+85265166162",
      instagram: "peak_tennis",
      thread: "https://www.threads.com/@peak__sports_"
    },
    visibility: "active" as const,
  },
  {
    id: "sha-tin",
    name: "<Dummy> Baseline Studio",
    description:
      "Tennis-specialist service with tension tracking, vibration dampener swaps, and personalized coaching by appointment.",
    sports: ["tennis" as const],
    // 沙田 district – generic sub-district id
    area: "sha-tin" as const,
    pricing: "RM 55 flat, racket storage included",
    sortId: 20,
    contact: {
      whatsapp: "+60100000000",
      instagram: "baseline.studio",
      email: "strings@baselinestudio.com",
    },
    visibility: "active" as const,
  },
  {
    id: "sha-tin-birdie-lab",
    name: "<Dummy> Birdie Lab",
    description:
      "Neighborhood expert for tuning rackets before competition season, shuttle delivery included for Bukit Jalil.",
    sports: ["badminton" as const],
    // 沙田內常用分區
    area: "fo-tan" as const,
    sortId: 2,
    contact: {
      whatsapp: "+60100000000",
      email: "contact@birdielab.net",
    },
    visibility: "active" as const,
  },
  {
    id: "yuen-long",
    name: "<Dummy> Rally Zone Strings",
    description:
      "Hybrid stringer supporting both badminton and tennis along the Sunway corridor, laser-powered tension meter.",
    sports: ["badminton" as const, "tennis" as const],
    // 元朗分區
    area: "yuen-long" as const,
    pricing: "Starting RM 32, discounts for club teams",
    sortId: 3,
    contact: {
      whatsapp: "+60100000000",
      instagram: "rally.zone",
      phone: "+60380812390",
    },
    visibility: "active" as const,
  },
  {
    id: "kwai-tsing",
    name: "<Dummy> Coastal Strings",
    description:
      "Penang-based tennis lab serving players island-wide with premium strings and evening pickup lanes.",
    sports: ["tennis" as const],
    // 新界葵青分區
    area: "kwai-chung" as const,
    sortId: 4,
    contact: {
      whatsapp: "+60100000000",
      instagram: "coastalstrings",
      email: "penang@coastalstrings.com",
      phone: "+60426000111",
    },
    visibility: "active" as const,
  },
];

export const seedStringers: Stringer[] = baseStringers.map((entry) => ({
  id: entry.id,
  slug: slugify(entry.name),
  name: entry.name,
  description: entry.description,
  sports: entry.sports,
  area: entry.area,
  pricing: entry.pricing,
  contact: entry.contact,
  visibility: entry.visibility,
  sortId: entry.sortId,
}));
