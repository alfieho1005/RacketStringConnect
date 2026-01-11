import type { Metadata } from "next";
import Link from "next/link";
import ProfileForm from "@/components/ProfileForm";
import { getStringerBySlug } from "@/features/stringers/service";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Stringer Portal | RacketStringConnect",
  description:
    "Create or update your stringing profile, then direct players to your preferred contact methods while keeping discovery simple.",
};

export default async function PortalPage({
  searchParams,
}: {
  searchParams?: Promise<{ slug?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const slug = sp.slug;

  const stringer = slug ? await getStringerBySlug(slug) : undefined;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
          Stringer Portal
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-semibold text-slate-900">
            {stringer ? "Update your profile" : "Create your profile"}
          </h1>
          <Link
            href="/"
            className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-slate-900"
          >
            <span className="underline">Back to explore</span>
          </Link>
        </div>
        <p className="text-sm text-slate-500">
          Updates go live immediately for players to discover your services. Pricing and communication take place off-platform.
        </p>
      </div>

      <section className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-xl shadow-slate-900/5">
        <ProfileForm initialValues={stringer} />
      </section>
    </main>
  );
}
