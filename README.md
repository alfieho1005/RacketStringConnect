# StringConnect

> A PURE CONNECTION directory for badminton and tennis stringers.

## Product Philosophy
- StringConnect exists solely to help players discover local stringing services and click through to the providers they trust.
- Every page keeps contact external: WhatsApp, Instagram, email, or phone links immediately leave the platform so follow-up, pricing, and scheduling happen directly with the stringer.
- The experience is clean, friendly, and Apple-inspired—no marketplace frictions, no internal messaging, no data capture beyond discovery.

## Tech & Stack
- **Next.js App Router** with Edge runtime and zero backend database requirements; stringer data comes straight from the JSON-style seed file (`lib/stringers/stringer.ts`) and the in-memory repository so the experience is deployable to Cloudflare Pages/Workers without any credentials.
- **TypeScript + TSX** for type-safe UI and domain logic.
- **Tailwind CSS** (Tailwind 4) for the airy, rounded aesthetic.
- **Component-driven architecture** and **config-driven options** powering sports, areas, and contact labels (no hardcoded enums).
- **lucide-react** icons for sport badges and CTA buttons.

## Running locally
1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000 to explore stringers or visit `/portal` to create/edit a profile.

> No environment variables are required—the seeded JSON file is the only data source.

## Static MVP for Cloudflare Pages

- A self-contained static version lives under `static-site/` and consists of `index.html`, `dashboard.html`, the compiled `css/styles.css`, `js/app.js`, and a lightweight `data/stringers.json`. Use it when you need to serve the experience without Node.js tooling.
- Deploy by pointing Cloudflare Pages at `static-site/` (no build command, output directory `.`) and/or publish it with `npx wrangler pages publish static-site --project-name racketstringconnect-static`.
- The static dashboard fetches `./data/stringers.json` client-side, renders the table, charts, and filters purely in vanilla JS, so it mirrors the Next.js experience but works via a single static build.
- We also added an `about.html` and richer filter/summary elements so the static portal now mimics the previous marketing/explore pages more closely while remaining purely static.

> Node 18.x works with this setup (the project targets Next.js 15 to stay compatible with the sandboxed runtime). If you see Node warnings, upgrade to the latest Node 18 release.

## Deployment 
- Run the lint/build/export steps before deploying:
  npm run lint
  npm run build
  npx @cloudflare/next-on-pages
  npx wrangler pages deploy .vercel --project-name racketstringconnect

### Cloudflare login / environment prep
- Edit your shell profile (e.g. `nano ~/.bashrc`) to add any required PATH or node version tweaks for Wrangler.
- Source your profile so the changes take effect: `source ~/.bashrc`.
- Confirm Cloudflare login before deploying with `npx wrangler whoami`; if it opens an OAuth link, complete it in the browser so the deploy step can succeed.

## Project structure
- `app/` – App router pages: explore landing, dynamic stringer profile, stringer portal, and the optional `/api/stringers` route.
- `components/` – Reusable UI pieces like `StringerCard`, `ContactButtons`, `Filters`, `ExploreSection`, and the portal form.
- `config/` – Config folders defining sports, areas, and contact channel metadata; every option comes from here instead of inline literals.
- `features/stringers/` – The domain service that surfaces active stringers and single profiles via the repository.
- `lib/stringers/` – Repository interface, helper utilities, mock data seeds, and the in-memory implementation.

## Mock data & future database replacement
- `lib/stringers/stringer.ts` is the single source of truth for every stringer listed on the site—treat it as a JSON dataset that feeds the UI.
- `lib/stringers/memoryRepository.ts` clones the seed array into an in-memory store and still exposes `list`, `getBySlug`, and `upsert`. Because it runs in memory it keeps state only per cold start, which is why editing the seed file or restarting the dev server resets the list.
- `app/api/stringers/route.ts` posts back into the same repository so the `/portal` form appears to write directly to the JSON store and new or edited profiles show up on the Explore page immediately.
- To swap in a real backend later, replace `lib/stringers/memoryRepository.ts` (and any dependent data layer) with your storage implementation, keep `features/stringers/service.ts` as the single source of truth, and continue pointing `/portal` and the API route at that repository.

## Managing stringers
- To **edit the seeded list**, open `lib/stringers/stringer.ts`, keep every `Stringer` entry aligned with the `lib/stringers/types.ts` shape, and be intentional about `id`/`slug` so every stringer stays unique.
- The `seedStringers` array is what populates `memoryRepository`. Updating that file (or adding a new object) automatically updates everything that calls `fetchActiveStringers()` because the repository clones `seedStringers` into its in-memory store when the app boots.
- For live updates without touching the seed data, browse to `/portal` and submit the form backed by `app/api/stringers/route.ts`; the portal hits `stringerRepository.upsert` so you can adjust visibility, sports, or area and the UI refreshes on the next request.
- After changing data, run `npm run dev` and visit http://localhost:3000 so you can verify filters, cards, and counts reflect your edits before deploying.

## Stringer fields
- `id` – unique identifier for the stringer profile (used by `memoryRepository` and to keep internal data stable).
- `slug` – URL-friendly identifier (generated from `name` with `slugify` unless you supply one). It is the value used under `/stringers/{slug}` and as the React key in the explore list.
- `name` – display title used on cards and profile pages.
- `description` – multi-line copy describing the stringer’s services or storefront.
- `sports` – array of `SportId` values (see `config/sports/*`) that determines the sport badges and filter matches.
- `area` – `AreaId` from `config/areas` that decides which district/area the stringer belongs to.
- `pricing` – optional pricing text shown in the card’s pricing block, defaults to “Contact for price” when empty.
- `contact` – partial `ContactInfo` object (`lib/stringers/types.ts:6-10`) containing WhatsApp, Instagram, Thread, email, phone, or website info for the CTA buttons.
- `visibility` – `"active"` or `"inactive"`, and `features/stringers/service.ts` only surfaces active entries for the explore view.
- `sortId` – optional numeric sort order used by `fetchActiveStringers()` so lower numbers appear earlier in the UI.

## Seeded stringer highlight

- `id`: `Fstrss-hang-hau` (slug `Fstrss-hang-hau`) – the Hang Hau-based creative shop named **Fstrss** that covers “一切相關Tennis事項” including restringing, restring/Grip/Grommet repairs, and coaching.
- `sports`: `tennis`; `area`: `hang-hau`; `pricing`: “Pricing available upon enquiry”.
- `hasCertifiedStringers`: `false` – this profile is currently marked as not offering certified stringers, so it only shows up when you either filter for “All” or “No” on the new certified filter.
- `contact`: WhatsApp `+85296320729`, Instagram `FS_TENNIS_LESSON_STRINGING`.

## Certified stringer UI note

- The certified stringers badge and filter controls were temporarily hidden (phase 1) while the data layer keeps capturing `hasCertifiedStringers`. Bring the UI back in phase 2 by reintroducing the filter controls and badges in `components/Filters.tsx` and `components/StringerCard.tsx`.

## What StringConnect does NOT do
- ❌ No bookings, scheduling, or calendar flows.
- ❌ No payments, no escrow, no checkout.
- ❌ No messaging, chat, or support inboxes.
- ❌ No reviews, ratings, or internal admin workflows.
- ❌ No dispute handling, verifications, or matchmaking—every next step is off-platform.

## Future ideas (optional)
- Add read-only search parameters to pre-filter explore results for tournaments or neighbourhoods.
- Maintain analytics hooks on the API route if you decide to track discovery trends without storing user data.
