import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions · RacketStringConnect",
  description:
    "RacketStringConnect is a discovery-only directory. We are not responsible for any transactions or services between users and stringers.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-400">
          Legal
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Terms & Conditions</h1>
        <p className="text-sm text-slate-400">Last updated: March 2026</p>
      </div>

      <div className="space-y-6 rounded-3xl border border-white/60 bg-white/70 p-6 sm:p-8 shadow-xl shadow-slate-900/5 backdrop-blur text-base leading-relaxed text-slate-700">

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">1. Directory Service Only</h2>
          <p>
            RacketStringConnect is a free, discovery-only directory. We list stringing professionals and shops to help players find and contact them directly. We are not a booking platform, marketplace, or agent for any stringer listed on this site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">2. No Liability for Third-Party Services</h2>
          <p>
            All contact and transactions between users and stringers occur entirely outside of RacketStringConnect — via WhatsApp, Instagram, email, phone, or any other channel provided by the stringer. We have no involvement in, and accept no responsibility or liability for, any services, payments, disputes, quality of work, or outcomes arising from those interactions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">3. Accuracy of Listings</h2>
          <p>
            Stringer profiles, pricing, availability, and contact details are provided by the stringers themselves or submitted by third parties. RacketStringConnect does not verify, guarantee, or warrant the accuracy, completeness, or currency of any listing. Always confirm details directly with the stringer before proceeding.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">4. No Endorsement</h2>
          <p>
            The presence of a stringer on this directory does not constitute an endorsement, recommendation, or certification by RacketStringConnect. Users are responsible for conducting their own due diligence before engaging any stringer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">5. Listing Requests</h2>
          <p>
            Stringers listed on this site have either submitted their own profile or have been added based on publicly available information. If you are a stringer and would like to update or remove your listing, please contact us at{" "}
            <a
              href="mailto:racketstringconnect@gmail.com"
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
            >
              racketstringconnect@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, RacketStringConnect, its operators, and contributors shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this site or from any interaction with a stringer found through this directory.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">7. Changes to These Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the site constitutes acceptance of the current terms. The date at the top of this page reflects the most recent revision.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">8. Contact</h2>
          <p>
            Questions about these terms? Reach us at{" "}
            <a
              href="mailto:racketstringconnect@gmail.com"
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
            >
              racketstringconnect@gmail.com
            </a>
            .
          </p>
        </section>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-slate-900 hover:underline"
        >
          ← Back to directory
        </Link>
      </div>
    </main>
  );
}
