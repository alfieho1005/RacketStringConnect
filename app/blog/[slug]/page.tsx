import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllSlugs, posts } from "@/lib/blog/posts";

const BASE_URL = "https://racketstringconnect.com";

/* ────────────────────────────────────────────
   Static params — pre-render all known slugs
   ──────────────────────────────────────────── */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ────────────────────────────────────────────
   Dynamic metadata — full SEO per post
   ──────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "RacketStringConnect" };

  const title = `${post.title} · RacketStringConnect`;

  return {
    title,
    description: `${post.description} ${post.descriptionEn}`,
    keywords: post.keywords,
    authors: [{ name: post.author ?? "RacketStringConnect" }],
    openGraph: {
      title,
      description: post.descriptionEn,
      type: "article",
      locale: "zh_HK",
      alternateLocale: "en_HK",
      url: `${BASE_URL}/blog/${post.slug}`,
      siteName: "RacketStringConnect",
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      tags: post.keywords,
      ...(post.coverImage
        ? {
            images: [
              {
                url: `${BASE_URL}${post.coverImage}`,
                alt: post.coverAlt ?? post.titleEn,
              },
            ],
          }
        : {}),
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

/* ────────────────────────────────────────────
   Page component
   ──────────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Find related posts (same tag, excluding current)
  const related = posts
    .filter((p) => p.slug !== post.slug && p.tag === post.tag)
    .slice(0, 2);

  // JSON-LD Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    alternativeHeadline: post.titleEn,
    description: post.descriptionEn,
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    author: {
      "@type": "Organization",
      name: post.author ?? "RacketStringConnect",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "RacketStringConnect",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    inLanguage: ["zh-HK", "en"],
    keywords: post.keywords.join(", "),
    ...(post.coverImage
      ? {
          image: {
            "@type": "ImageObject",
            url: `${BASE_URL}${post.coverImage}`,
            ...(post.coverAlt ? { caption: post.coverAlt } : {}),
          },
        }
      : {}),
  };

  // JSON-LD BreadcrumbList
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE_URL}/blog/${post.slug}`,
      },
    ],
  };

  // Dynamically load article content component
  let ArticleContent: React.ComponentType | null = null;
  try {
    const mod = await import(`./content/${slug}`);
    ArticleContent = mod.default;
  } catch {
    // Content file not yet created — show placeholder
  }

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-12 space-y-10">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-slate-700 transition">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog" className="hover:text-slate-700 transition">
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-slate-600 truncate max-w-[200px] sm:max-w-none">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Article header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-700 font-medium">
              {post.tag}
            </span>
            <time dateTime={post.date}>{post.date}</time>
            {post.readingTime && (
              <>
                <span aria-hidden>&middot;</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-slate-500">{post.titleEn}</p>
        </header>

        {/* Hero image */}
        {post.coverImage && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={post.coverImage}
            alt={post.coverAlt ?? post.titleEn}
            className="w-full rounded-2xl"
            loading="eager"
          />
        )}

        {/* Article body */}
        <article className="prose-custom space-y-6 text-base leading-relaxed text-slate-700">
          {ArticleContent ? (
            <ArticleContent />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
              <p className="font-semibold">Article content placeholder</p>
              <p className="text-sm mt-1">
                Create <code>app/blog/[slug]/content/{post.slug}.tsx</code> to
                add the article body.
              </p>
            </div>
          )}
        </article>

        {/* Internal link — CTA back to directory */}
        <section className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 sm:p-6">
          <p className="text-base font-semibold text-slate-900">
            搵穿線師？Find a Stringer
          </p>
          <p className="mt-1 text-sm text-slate-600">
            瀏覽全港穿線師目錄，WhatsApp 直接聯絡。Browse our directory and
            contact stringers directly.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-300"
            >
              搵穿線師 Find a Stringer
            </Link>
            <Link
              href="/stringers/join"
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-yellow-300"
            >
              免費登記 Join as Stringer
            </Link>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              相關文章 Related
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur transition hover:shadow-md hover:border-yellow-300"
                >
                  <p className="text-xs text-slate-400">
                    <time dateTime={r.date}>{r.date}</time>
                  </p>
                  <p className="mt-1 font-semibold text-slate-900 group-hover:text-yellow-600 transition">
                    {r.title}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500">{r.titleEn}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
