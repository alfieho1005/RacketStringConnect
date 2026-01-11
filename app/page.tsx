import type { Metadata } from "next";
import ExploreSection from "@/components/ExploreSection";
import { fetchActiveStringers } from "@/features/stringers/service";

export const metadata: Metadata = {
  title: "RacketStringConnect | Discover Local Stringers",
  description:
    "Discover badminton and tennis stringers nearby and connect externally through WhatsApp, Instagram, email, or phone.",
};

export default async function HomePage() {
  const activeStringers = await fetchActiveStringers();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <ExploreSection stringers={activeStringers} />
    </main>
  );
}
