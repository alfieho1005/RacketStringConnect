import type { Metadata } from "next";
import Link from "next/link";
import StringerJoinForm from "@/components/StringerJoinForm";

export const metadata: Metadata = {
  title: "Join as a stringer · RacketStringConnect",
  description: "Share your profile with RacketStringConnect and we will collect it via email.",
};

const englishLabels = {
  name: "Name",
  instagram: "Instagram",
  thread: "Thread",
  facebook: "Facebook",
  website: "Website",
  email: "Email",
  phone: "Phone or WhatsApp",
  whatsapp: "WhatsApp",
  area: "Area",
  country: "Country / Region",
  district: "District",
  pricing: "Pricing (optional)",
  description: "Description",
  sportsLegend: "Sports you cover",
  moreLabel: "More to share",
};

export default function EnglishJoinPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/stringers/join"
          className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          ← Back to explore
        </Link>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Submission via email
        </p>
      </div>

      <section className="space-y-6 rounded-4xl border border-white/60 bg-white/80 p-5 sm:p-8 shadow-xl shadow-slate-900/5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            Become a stringer
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Submit your profile in English
          </h1>
          <div className="h-3" aria-hidden />
          <p className="text-lg text-slate-600">
            Provide the essentials about your stringing service and we&apos;ll send the summary through your email client so we keep follow-up external.
          </p>
          <p className="text-sm font-semibold text-slate-900">
            Need Chinese labels?{" "}
            <Link
              href="/stringers/join"
              className="text-sm font-semibold underline-offset-4 hover:underline"
            >
              Switch to the Chinese form
            </Link>
            .
          </p>
        </div>

        <StringerJoinForm labels={englishLabels} buttonLabel="Submit profile info" />
      </section>
    </main>
  );
}
