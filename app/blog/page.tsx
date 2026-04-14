import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/blog/posts";

const BASE_URL = "https://racketstringconnect.com";

export const metadata: Metadata = {
  title: "Blog · RacketStringConnect | 穿線知識與球拍運動資訊",
  description:
    "穿線知識、球拍運動貼士、香港球壇資訊。Learn about racket stringing, sport tips, and the Hong Kong racket community.",
  keywords: [
    "穿線知識",
    "stringing tips",
    "羽毛球穿線",
    "badminton stringing guide",
    "tennis stringing hong kong",
    "racket sports blog",
    "香港球拍運動",
  ],
  openGraph: {
    title: "Blog · RacketStringConnect",
    description:
      "Stringing tips, gear advice, and the latest from Hong Kong's racket sports scene.",
    type: "website",
    locale: "zh_HK",
    alternateLocale: "en_HK",
    url: `${BASE_URL}/blog`,
  },
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
};

export default function BlogIndexPage() {
  // JSON-LD CollectionPage + BreadcrumbList
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog — RacketStringConnect",
    description:
      "穿線知識、球拍運動貼士、香港球壇資訊。Stringing tips, gear advice, and HK racket sports news.",
    url: `${BASE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "RacketStringConnect",
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
    ],
  };

  // Group posts by tag for optional filtering
  const tags = [...new Set(posts.map((p) => p.tag))];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-slate-700 transition">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-slate-600">Blog</li>
          </ol>
        </nav>

        {/* Hero image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/blog/blog-index-hero.webp"
          alt="Racket sports equipment — tennis and badminton rackets with colorful strings on a wooden surface"
          className="w-full rounded-3xl shadow-xl shadow-slate-900/5"
          loading="eager"
        />

        {/* Hero */}
        <section className="space-y-3 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
            Blog
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            穿線知識 &amp; 球拍運動資訊
          </h1>
          <p className="text-base leading-relaxed text-slate-700">
            穿線貼士、器材選擇、香港球壇最新動態 — 幫你打得更好。
          </p>
          <p className="text-sm text-slate-500">
            Stringing tips, gear advice, and the latest from Hong Kong&apos;s
            racket sports scene.
          </p>
        </section>

        {/* Tag strip */}
        {tags.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Post list */}
        {posts.length === 0 ? (
          <section className="rounded-3xl border border-white/60 bg-white/70 p-8 text-center shadow-sm backdrop-blur">
            <p className="text-lg font-semibold text-slate-900">
              即將推出 — Coming Soon
            </p>
            <p className="mt-2 text-sm text-slate-500">
              我們正在準備第一批文章，敬請留意！
            </p>
          </section>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl border border-white/60 bg-white/70 p-5 sm:p-6 shadow-sm backdrop-blur transition hover:shadow-xl hover:border-yellow-300"
              >
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-700 font-medium">
                    {post.tag}
                  </span>
                  <time dateTime={post.date}>{post.date}</time>
                  {post.readingTime && (
                    <>
                      <span aria-hidden>&middot;</span>
                      <span>{post.readingTime} min</span>
                    </>
                  )}
                </div>
                <h2 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-yellow-600 transition">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{post.titleEn}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-yellow-600">
                  閱讀更多 &rarr;
                </span>
              </Link>
            ))}
          </section>
        )}

        {/* Internal link CTA */}
        <section className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 sm:p-6 text-center">
          <p className="text-base font-semibold text-slate-900">
            想搵穿線師？Looking for a stringer?
          </p>
          <p className="mt-1 text-sm text-slate-600">
            瀏覽目錄，WhatsApp 直接聯絡。Browse our directory — direct contact, no middleman.
          </p>
          <Link
            href="/"
            className="mt-3 inline-flex items-center rounded-xl bg-yellow-400 px-5 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-300"
          >
            搵穿線師 Find a Stringer
          </Link>
        </section>
      </main>
    </>
  );
}
