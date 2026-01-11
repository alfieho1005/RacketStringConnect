import { slugify } from "./utils";
import type { SportId } from "@/config/sports";
import type { Stringer } from "./types";

type SeedStringer = Omit<Stringer, "slug" | "sports"> & {
  sports: readonly SportId[];
  slug?: string;
};

const baseStringers: ReadonlyArray<SeedStringer> = [
  {
    id: "peak-sports",
    slug: "peak-sports",
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
      thread: "https://www.threads.com/@peak__sports_",
      website: "https://topspintennis.pro/aboutstore",
    },
    visibility: "active" as const,
  },
  {
    id: "topspin-tennisports",
    slug: "topspin-tennisports",
    name: "Topspin Tennisports Stringer House 決勝者網球穿線家",
    description:
      "Tennis Rackets, Stringing Services & Accessories Pro Shop\n 專業網球用品及網球拍穿線店\n 荃灣荃豐中心商場 2樓 C48室\n C48, 2/F, Tsuen Fung Centre, Tsuen Wan",
    sports: ["tennis" as const],
    area: "tsuen-wan" as const,
    pricing: "Please check the website",
    sortId: 2,
    contact: {
      whatsapp: "+85296623373",
      email: "topspintennisports@gmail.com",
      website: "https://topspintennis.pro",
    },
    visibility: "active" as const,
  },
  {
    id: "wingkee-tsuen-wan",
    slug: "wingkee-tsuen-wan",
    name: "WingKeeTennis",
    description:
      "WingKeeTennis 用心為網球愛好者提供優質穿線服務\n WingKeeTennis is dedicated to providing high-quality stringing services for tennis enthusiasts",
    sports: ["tennis" as const],
    area: "tsuen-wan" as const,
    sortId: 3,
    contact: {
      whatsapp: "+85269266362",
      thread: "https://www.threads.com/@wingkeetennis",
    },
    visibility: "active" as const,
  },
  {
    id: "wingkee-central",
    slug: "wingkee-central",
    name: "WingKeeTennis",
    description:
      "WingKeeTennis 用心為網球愛好者提供優質穿線服務\n WingKeeTennis is dedicated to providing high-quality stringing services for tennis enthusiasts",
    sports: ["tennis" as const],
    area: "central" as const,
    sortId: 3,
    contact: {
      whatsapp: "+85269266362",
      thread: "https://www.threads.com/@wingkeetennis",
    },
    visibility: "active" as const,
  },
  {
    id: "a-plus-causeway-bay",
    slug: "a-plus-causeway-bay",
    name: "A-Plus Sports（銅鑼灣店）",
    description:
      "🎾🏸 專業網球／羽毛球用品及穿線服務\n\n" +
      "📍 銅鑼灣店\n" +
      "銅鑼灣金百利11樓1105室\n" +
      "Flat 1105, 11/F, Island Centre, No.1 Great George St., Causeway Bay, Hong Kong\n\n" +
      "⏰ 營業時間：11:00AM – 8:00PM\n" +
      "📞 TEL：3153 4073",
    sports: ["tennis" as const, "badminton" as const],
    area: "causeway-bay" as const,
    pricing: "Pricing available upon enquiry",
    sortId: 999,
    contact: {
      email: "Aplus_sports@hotmail.com",
      website: "https://www.aplus-tennis.com",
    },
    visibility: "active" as const,
  },
  {
    id: "a-plus-kwun-tong",
    slug: "a-plus-kwun-tong",
    name: "A-Plus Sports（觀塘店）",
    description:
      "🎾🏸 專業網球／羽毛球用品及穿線服務\n\n" +
      "📍 觀塘店\n" +
      "觀塘開源道72號溢財中心4/F A室\n" +
      "Flat A, 4/F, LIADRO Centre, 72 Hoi Yuen Rd., Kwun Tong, Kowloon\n\n" +
      "⏰ 營業時間：12:00PM – 8:00PM\n" +
      "📞 TEL：2790 2236",
    sports: ["tennis" as const, "badminton" as const],
    area: "kwun-tong" as const,
    pricing: "Pricing available upon enquiry",
    sortId: 999,
    contact: {
      email: "Aplus_sports@hotmail.com",
      website: "https://www.aplus-tennis.com",
    },
    visibility: "active" as const,
  },
  {
    id: "Fstrss-hang-hau",
    slug: "Fstrss-hang-hau",
    name: "Fstrss",
    description:
      "一切相關Tennis事項\n 包括 穿線/改拍/換Grip/Grommet/教學\n",
    sports: ["tennis" as const],
    area: "hang-hau" as const,
    pricing: "Pricing available upon enquiry",
    sortId: 2,
    contact: {
      whatsapp: "+85296320729",
      instagram: "FS_TENNIS_LESSON_STRINGING",
    },
    visibility: "active" as const,
  },
];

export const seedStringers: Stringer[] = baseStringers.map((entry) => ({
  id: entry.id,
  slug: entry.slug ?? slugify(entry.name),
  name: entry.name,
  description: entry.description,
  sports: entry.sports,
  area: entry.area,
  pricing: entry.pricing,
  contact: entry.contact,
  visibility: entry.visibility,
  sortId: entry.sortId,
}));
