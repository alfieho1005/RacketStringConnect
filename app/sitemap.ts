import type { MetadataRoute } from "next";
import { fetchActiveStringers } from "@/features/stringers/service";

const BASE_URL = "https://racketstringconnect.com";

// High-value district + sport pages that match real search queries
const localizedPages = [
  // Tsuen Wan — top query in Search Console
  { path: "/?country=hk&amp;district=tsuen-wan-district&amp;sport=badminton", priority: 0.9 },
  { path: "/?country=hk&amp;district=tsuen-wan-district&amp;sport=tennis", priority: 0.9 },
  // Mong Kok (Yau Tsim Mong)
  { path: "/?country=hk&amp;district=yau-tsim-mong&amp;sport=tennis", priority: 0.85 },
  { path: "/?country=hk&amp;district=yau-tsim-mong&amp;sport=badminton", priority: 0.85 },
  // Yuen Long
  { path: "/?country=hk&amp;district=yuen-long-district&amp;sport=tennis", priority: 0.8 },
  { path: "/?country=hk&amp;district=yuen-long-district&amp;sport=badminton", priority: 0.8 },
  // Squash
  { path: "/?country=hk&amp;sport=squash", priority: 0.75 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stringers = await fetchActiveStringers();

  // Exclude legacy "-pb-court" slugs that no longer resolve (GSC 404s)
  const stringerEntries: MetadataRoute.Sitemap = stringers
    .filter((s) => !s.slug.endsWith("-pb-court"))
    .map((stringer) => ({
      url: `${BASE_URL}/stringers/${stringer.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const localizedEntries: MetadataRoute.Sitemap = localizedPages.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/pickleball`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95, // First-mover — high priority
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/stringers/join`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...localizedEntries,
    ...stringerEntries,
  ];
}
