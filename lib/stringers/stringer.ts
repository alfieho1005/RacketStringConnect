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
    hasCertifiedStringers: true,
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
    hasCertifiedStringers: true,
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
    hasCertifiedStringers: false,
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
    hasCertifiedStringers: false,
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
    hasCertifiedStringers: true,
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
    hasCertifiedStringers: false,
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
    hasCertifiedStringers: false,
    pricing: "Pricing available upon enquiry",
    sortId: 2,
    contact: {
      whatsapp: "+85296320729",
      instagram: "FS_TENNIS_LESSON_STRINGING",
    },
    visibility: "active" as const,
  },
  {
    id: "sportstationhk-causeway-bay",
    slug: "sportstationhk-causeway-bay",
    name: "Sport Station HK",
    description:
      "Since 2012\n" + 
      "🎾 Professional Stringing & Tennis Goods",
    sports: ["tennis" as const],
    area: "causeway-bay" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 999,
    contact: {
      instagram: "sportstationhk",
    },
    visibility: "active" as const,
  },
  {
    id: "ydc-tennis",
    slug: "ydc-tennis",
    name: "YDC Tennis 網球用品專門店",
    description:
      "位於大圍村的 YDC Tennis，專注網球用品與配件，提供專業穿線服務，營業時間親切照顧忙碌上班族。",
    sports: ["tennis" as const],
    area: "tai-wai" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 5,
    contact: {
      whatsapp: "+85256356123",
      instagram: "ydc.tennis",
      website: "https://ydctennis.onepos.shop",
    },
    visibility: "active" as const,
  },
  {
    id: "sunshine-sports-tai-wai",
    slug: "sunshine-sports-tai-wai",
    name: "陽光體育用品公司 (大圍)",
    description:
      "老牌的陽光體育用品公司，位於美林商場一樓，提供羽毛球拍穿線和各式體育用品，營業至 21:00 適合下班後交拍。",
    sports: ["badminton" as const, "squash" as const],
    area: "tai-wai" as const,
    hasCertifiedStringers: false,
    pricing: "Pricing available upon enquiry",
    sortId: 900,
    contact: {
      phone: "+85222050918",
    },
    visibility: "active" as const,
  },
  {
    id: "wanli-sports-shatin",
    slug: "wanli-sports-shatin",
    name: "萬里體育用品專門店 (沙田)",
    description:
      "位於沙田瀝源廣場的萬里體育用品專門店，雖然不在大圍但鄰近車站，是區內知名的羽毛球與網球穿線點。",
    sports: ["badminton" as const, "tennis" as const],
    area: "sha-tin" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 901,
    contact: {
      phone: "+85226919646",
      instagram: "wanli.sports",
    },
    visibility: "active" as const,
  },
  {
    id: "tko-sports",
    slug: "tko-sports",
    name: "將軍澳體育 TKO Sports",
    description:
      "將軍澳地區代表性的羽毛球專門店，提供穿線、球拍與運動用品，WhatsApp 經常用作報價與進度溝通。",
    sports: ["badminton" as const, "tennis" as const],
    area: "tseung-kwan-o" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 902,
    contact: {
      whatsapp: "+85293812100",
      phone: "+85293812100",
      website: "https://tkosports.com/",
      thread: "https://www.facebook.com/TKOSports",
    },
    visibility: "active" as const,
  },
  {
    id: "badminton-stringing-tko",
    slug: "badminton-stringing-tko",
    name: "Badminton Stringing TKO (將軍澳專業羽毛球穿線)",
    description:
      "專攻羽毛球穿線、更換手膠與球拍諮詢，交收地點主要沿將軍澳線沿線 MTR。（寶琳、坑口、將軍澳、調景嶺、康城）",
    sports: ["badminton" as const],
    area: "tseung-kwan-o" as const,
    hasCertifiedStringers: false,
    pricing: "Pricing available upon enquiry",
    sortId: 903,
    contact: {
      instagram: "badminton_stringing_tko",
    },
    visibility: "active" as const,
  },
  {
    id: "xuan-yuan-sports-mong-kok",
    slug: "xuan-yuan-sports-mong-kok",
    name: "軒轅體育 Click to open side panel for more information",
    description:
      "藏身旺角商廈內的專業羽毛球穿線工作室，師傅張人技術聞名，磅數精準又耐用，氣氛專注而安靜，好適合追求細緻手藝的球友。",
    sports: ["badminton" as const],
    area: "mong-kok" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 904,
    contact: {
      whatsapp: "+85254013514",
      phone: "+85254013514",
    },
    visibility: "active" as const,
  },
  {
    id: "lung-tang-sports-mong-kok",
    slug: "lung-tang-sports-mong-kok",
    name: "Lung Tang Sports 龍騰球拍",
    description:
      "老字號旺角體育用品店，提供網球/羽毛球/壁球穿線並支援球拍維修、配重調整，憑超過 20 年的大賽級技術聞名。",
    sports: ["tennis" as const, "badminton" as const, "squash" as const],
    area: "mong-kok" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 905,
    contact: {
      whatsapp: "+85259600882",
      phone: "+85223980897 / +85251337688 / +85223097611",
      thread: "https://www.facebook.com/longtenghk",
      website: "http://www.lt328.com/",
    },
    visibility: "active" as const,
  },
  {
    id: "flyness-sports-jordan",
    slug: "flyness-sports-jordan",
    name: "Flyness Sports Pro Shop",
    description:
      "佐敦官涌街地舖的專業穿線工作室，專注羽毛球與多樣裝備，技術口碑好，環境細緻，適合講求穩定感的球友。",
    sports: ["badminton" as const],
    area: "tsim-sha-tsui" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 906,
    contact: {
      phone: "+85223771993",
      whatsapp: "+85223771993",
    },
    visibility: "active" as const,
  },
  {
    id: "jeff-tennis-jordan",
    slug: "jeff-tennis-jordan",
    name: "Jeff Tennis Shop",
    description:
      "佐敦德興街的網球專門店，對線材與球員打法有深入了解，穿線服務深受網球員信任並附帶專業諮詢。",
    sports: ["tennis" as const],
    area: "tsim-sha-tsui" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 907,
    contact: {
      phone: "+85227368228",
    },
    visibility: "active" as const,
  },
  {
    id: "cyf-badminton-tsim-sha-tsui",
    slug: "cyf-badminton-tsim-sha-tsui",
    name: "Cyf Badminton Company (長遠體育)",
    description:
      "尖沙咀知名老字號羽毛球店，提供多年經驗的穿線技術與豐富產品組合，是資深球友的指定地點。",
    sports: ["badminton" as const],
    area: "tsim-sha-tsui" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 908,
    contact: {
      phone: "+85223682811",
    },
    visibility: "active" as const,
  },
  {
    id: "leap-way-sports-kwun-tong",
    slug: "leap-way-sports-kwun-tong",
    name: "飛騰羽毛球專門店 Leap Way Sports",
    description:
      "觀塘區數位化程度高的羽毛球專門店，IG 活動頻繁，網站提供完整產品目錄，店內穿線/配件服務同樣受歡迎。",
    sports: ["badminton" as const],
    area: "kwun-tong" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 910,
    contact: {
      phone: "+85294146488",
      whatsapp: "+85294146488",
      instagram: "leapwaysports",
      website: "https://www.leapwaysports.com/",
    },
    visibility: "active" as const,
  },
  {
    id: "jacky-sports-kwun-tong",
    slug: "jacky-sports-kwun-tong",
    name: "官塘球拍穿線 Jacky Sports",
    description:
      "專注穿線服務的官塘球拍專門店，提供簡潔網頁與專業簽名，位於觀塘工業中心 4 期，靠近地鐵站。",
    sports: ["badminton" as const],
    area: "kwun-tong" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 911,
    contact: {
      phone: "+85294945463",
      whatsapp: "+85294945463",
      website: "https://jackysports.boutir.com/",
      thread: "https://www.facebook.com/JackySportsHK",
    },
    visibility: "active" as const,
  },
  {
    id: "olym-badminton-kwun-tong",
    slug: "olym-badminton-kwun-tong",
    name: "奧林羽毛球用品專門店 Olym Badminton",
    description:
      "位於觀塘裕民中心的傳統羽毛球用品店，社交頻道更新穩定，是尋求可靠穿線與裝備維護的所在。",
    sports: ["badminton" as const],
    area: "kwun-tong" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 912,
    contact: {
      phone: "+85227727300",
      thread: "https://www.facebook.com/OlymBadminton",
    },
    visibility: "active" as const,
  },
  {
    id: "hk-squash-gear",
    slug: "hk-squash-gear",
    name: "HK Squash Gear",
    description:
      "Adrian Ng 創立的 Pro Shop 專為壁球愛好者打造，提供專業線材推薦與磅數調整，並透過預約/寄售形式服務客人。",
    sports: ["squash" as const],
    area: "admiralty" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 913,
    contact: {
      whatsapp: "+85291006488",
      website: "https://www.hksquashgear.com/",
      instagram: "hksquashgear",
      thread: "https://www.facebook.com/HKSquashGear",
    },
    visibility: "active" as const,
  },
  {
    id: "e78shop-san-po-kong",
    slug: "e78shop-san-po-kong",
    name: "E78 Shop",
    description:
      "新蒲崗的 E78 Shop 結合實體與線上平台，穿線師傅經驗豐富並提供細緻線材介紹，專注網球與羽毛球拍的高規格處理。",
    sports: ["tennis" as const, "badminton" as const],
    area: "san-po-kong" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 914,
    contact: {
      phone: "+85223294568",
      whatsapp: "+85294565158",
      website: "https://e78shop.com/",
      instagram: "e78shop",
    },
    visibility: "active" as const,
  },
  {
    id: "racket-sports-hk",
    slug: "racket-sports-hk",
    name: "Racket Sports HK 香港球拍運動用品專門店",
    description:
      "東九龍藍田匯景廣場的球拍專門店，涵蓋壁球、羽毛球與網球的穿線與配件，價格透明、服務親切且支持線上/WhatsApp 詢問。",
    sports: ["squash" as const, "badminton" as const, "tennis" as const],
    area: "lam-tin" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 915,
    contact: {
      phone: "+85260127286",
      whatsapp: "+85260127286",
      website: "http://www.racketsports.hk/",
      thread: "https://www.facebook.com/RacketSportsHK",
    },
    visibility: "active" as const,
  },
  {
    id: "winboton-tai-po",
    slug: "winboton-tai-po",
    name: "溫布頓體育 Winboton",
    description:
      "大埔廣場地下的羽毛球專門店，Instagram 活動頻繁，提供快速穿線與相關裝備支援。",
    sports: ["badminton" as const],
    area: "tai-po" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 916,
    contact: {
      instagram: "winboton_sports",
      phone: "+85265026125",
      whatsapp: "+85265026125",
    },
    visibility: "active" as const,
  },
  {
    id: "golden-river-tai-po",
    slug: "golden-river-tai-po",
    name: "金河體育 Golden River",
    description:
      "新達廣場一樓的金河體育，擁有多年穿線經驗，主打羽毛球拍裝備與細緻服務。",
    sports: ["badminton" as const],
    area: "tai-po" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 917,
    contact: {
      instagram: "goldenriversports",
      phone: "+85226578998",
    },
    visibility: "active" as const,
  },
  {
    id: "dragon-garden-tai-po",
    slug: "dragon-garden-tai-po",
    name: "龍園體育 Dragon Garden",
    description:
      "大元邨 / 太和邨區域知名的龍園體育，提供多台穿線機與豐富產品，是資深球友指定的羽毛球維護站。",
    sports: ["badminton" as const],
    area: "tai-po" as const,
    hasCertifiedStringers: true,
    pricing: "Pricing available upon enquiry",
    sortId: 918,
    contact: {
      phone: "+85226643614",
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
  hasCertifiedStringers: entry.hasCertifiedStringers,
  sortId: entry.sortId,
}));
