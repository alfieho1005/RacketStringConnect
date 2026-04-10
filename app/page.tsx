import type { Metadata } from "next";
import ExploreSection from "@/components/ExploreSection";
import { fetchActiveStringers } from "@/features/stringers/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "RacketStringConnect · 搵穿線師 WhatsApp 直接聯絡 | Stringer Directory HK",
  description:
    "香港羽毛球、網球、壁球穿線師目錄。WhatsApp 直接聯絡，覆蓋全港 18 區，毋需中間人。Find badminton, tennis & squash stringers in Hong Kong. Direct WhatsApp contact, no middleman, all 18 districts.",
  keywords: [
    "badminton stringing hong kong",
    "tennis stringing hk",
    "羽毛球穿線",
    "網球穿線",
    "羽毛球穿線師 WhatsApp 香港",
    "穿線師 WhatsApp",
    "上弦羽毛球",
    "荃灣羽毛球穿線",
    "旺角網球穿線",
    "元朗網球用品",
    "壁球拍專門店",
    "racket stringing near me",
    "stringer hong kong whatsapp",
    "穿線師",
    "pickleball stringer hong kong",
    "匹克球穿線",
  ],
  openGraph: {
    title: "RacketStringConnect · 搵穿線師 WhatsApp 直接搵 | HK Stringer Directory",
    description:
      "香港羽毛球、網球、壁球穿線師。WhatsApp 直接傾，唔使經中間人。Find stringers in HK — direct WhatsApp, all 18 districts.",
    type: "website",
    locale: "zh_HK",
    alternateLocale: "en_HK",
  },
};

export default async function HomePage() {
  const activeStringers = await fetchActiveStringers();

  return (
    <main>
      <ExploreSection stringers={activeStringers} />
    </main>
  );
}
