# StringConnect

> A PURE CONNECTION directory for badminton and tennis stringers.

## Product Philosophy
- StringConnect exists solely to help players discover local stringing services and click through to the providers they trust.
- Every page keeps contact external: WhatsApp, Instagram, email, or phone links immediately leave the platform so follow-up, pricing, and scheduling happen directly with the stringer.
- The experience is clean, friendly, and Apple-inspired—no marketplace frictions, no internal messaging, no data capture beyond discovery.

## Tech & Stack
- **Next.js App Router** with zero backend database requirements (mock repository + optional API route).
- **TypeScript + TSX** for type-safe UI and domain logic.
- **Tailwind CSS** (Tailwind 4) for the airy, rounded aesthetic.
- **Component-driven architecture** and **config-driven options** powering sports, areas, and contact labels (no hardcoded enums).
- **lucide-react** icons for sport badges and CTA buttons.

## Running locally
1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000 to explore stringers or visit `/portal` to create/edit a profile.

> Node 18.x works with this setup (the project targets Next.js 15 to stay compatible with the sandboxed runtime). If you see Node warnings, upgrade to the latest Node 18 release.

## Deployment 
npm run lint
npm run build
npx @cloudflare/next-on-pages
npx wrangler pages deploy .vercel/output/static --project-name racketstringconnect

## Project structure
- `app/` – App router pages: explore landing, dynamic stringer profile, stringer portal, and the optional `/api/stringers` route.
- `components/` – Reusable UI pieces like `StringerCard`, `ContactButtons`, `Filters`, `ExploreSection`, and the portal form.
- `config/` – Config folders defining sports, areas, and contact channel metadata; every option comes from here instead of inline literals.
- `features/stringers/` – The domain service that surfaces active stringers and single profiles via the repository.
- `lib/stringers/` – Repository interface, helper utilities, mock data seeds, and the in-memory implementation.

## Mock data & future database replacement
- `lib/stringers/stringer.ts` seeds five badminton/tennis stringers with real-looking contact info.
- `lib/stringers/memoryRepository.ts` exposes `list`, `getBySlug`, and `upsert` to mutate the in-memory store.
- `app/api/stringers/route.ts` demonstrates how to persist new or edited profiles through a JSON POST and reuses the repository.
- To swap in a real database, replace `lib/stringers/memoryRepository.ts` (and any dependent data layer) with implementations that call your preferred storage (SQL, Prisma, Firebase, etc.), keep `features/stringers/service.ts` as the single source of truth, and ensure the API route and portal form continue to talk to the new repository.

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

## What StringConnect does NOT do
- ❌ No bookings, scheduling, or calendar flows.
- ❌ No payments, no escrow, no checkout.
- ❌ No messaging, chat, or support inboxes.
- ❌ No reviews, ratings, or internal admin workflows.
- ❌ No dispute handling, verifications, or matchmaking—every next step is off-platform.

## Future ideas (optional)
- Add read-only search parameters to pre-filter explore results for tournaments or neighbourhoods.
- Maintain analytics hooks on the API route if you decide to track discovery trends without storing user data.
