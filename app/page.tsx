import type { Metadata } from "next";
import ExploreSection from "@/components/ExploreSection";
import { fetchActiveStringers } from "@/features/stringers/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "RacketStringConnect · 球拍穿線師搜尋 | Free Stringer Directory HK",
  description:
    "Free platform to find local badminton, tennis and squash stringing professionals in Hong Kong. Filter by district — Tsuen Wan, Mong Kok, Yuen Long and more. 免費搜尋香港羽毛球、網球、壁球穿線師。",
  keywords: [
    "badminton stringing hong kong",
    "tennis stringing hk",
    "羽毛球穿線",
    "網球穿線",
    "上弦羽毛球",
    "荃灣羽毛球穿線",
    "旺角網球穿線",
    "元朗網球用品",
    "壁球拍專門店",
    "racket stringing near me",
    "stringer hong kong",
    "穿線師",
  ],
  openGraph: {
    title: "RacketStringConnect · Find Local Racket Stringers Free",
    description:
      "Discover badminton, tennis and squash stringers in HK. Connect directly — no fees, no middleman. 免費搜尋香港穿線師。",
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
