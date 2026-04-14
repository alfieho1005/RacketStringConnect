/**
 * Centralized blog post registry.
 *
 * To publish a new article:
 *   1. Add a BlogPost entry to `posts` (newest first).
 *   2. Create `/app/blog/[slug]/content/<slug>.tsx` with the article body.
 *   3. The sitemap, index page, and [slug] route pick it up automatically.
 *
 * SEO checklist per post:
 *   - title / titleEn: keep under 60 chars (shown in SERP)
 *   - description / descriptionEn: 120-155 chars (meta description)
 *   - keywords: 5-10 relevant terms, mix zh + en, include long-tails
 *   - tag: one primary category for breadcrumb + filtering
 *   - coverAlt: descriptive alt text for the hero image (accessibility + image SEO)
 */

export type BlogPost = {
  /** URL slug — must match the content component filename */
  slug: string;
  /** Primary title (Chinese) — <60 chars ideal for SERP */
  title: string;
  /** English subtitle — appears below title and in OG fallback */
  titleEn: string;
  /** Chinese meta description — 120-155 chars for SERP snippet */
  description: string;
  /** English meta description */
  descriptionEn: string;
  /** Short excerpt for index cards (Chinese) */
  excerpt: string;
  /** Short excerpt for index cards (English) */
  excerptEn: string;
  /** ISO date string (YYYY-MM-DD) — used in structured data + sorting */
  date: string;
  /** Last-modified ISO date (YYYY-MM-DD) — triggers sitemap re-crawl */
  updatedDate?: string;
  /** Primary category tag */
  tag: string;
  /** SEO keywords — mix of zh-HK + English, include long-tail phrases */
  keywords: string[];
  /** Hero image path relative to /public (optional) */
  coverImage?: string;
  /** Alt text for hero image — descriptive, includes keywords naturally */
  coverAlt?: string;
  /** Estimated reading time in minutes */
  readingTime?: number;
  /** Author name (defaults to "RacketStringConnect") */
  author?: string;
};

/**
 * All published posts, newest first.
 * The [slug] page, index page, and sitemap all read from this array.
 */
export const posts: BlogPost[] = [
  {
    slug: "how-to-choose-racket-string-and-tension",
    title: "如何為你的球拍選擇合適的線材與磅數",
    titleEn: "How to Choose the Right Racket String & Tension",
    description:
      "唔同嘅線材同磅數會直接影響你嘅力量、控制同手感。呢篇指南由淺入深幫你揀到最適合自己打法嘅穿線設定。",
    descriptionEn:
      "Different strings and tensions affect power, control, and feel. This guide helps you find the perfect stringing setup for your play style.",
    excerpt:
      "唔同嘅穿線設定，會直接影響你嘅力量、控制、舒適度同整體手感。了解自己適合咩 setup，可以幫你打得更穩定。",
    excerptEn:
      "String choice and tension directly affect power, control, and comfort. Learn which setup suits your play style.",
    date: "2026-04-14",
    tag: "穿線知識",
    keywords: [
      "racket stringing",
      "tennis string tension",
      "best tennis strings",
      "racket string setup",
      "how to choose tennis strings",
      "how often to restring a racket",
      "穿線磅數",
      "球拍線材",
      "羽毛球穿線",
      "網球穿線香港",
    ],
    readingTime: 6,
  },
  // ──────────────────────────────────────────────────────
  // TEMPLATE — copy this block to create a new post:
  // ──────────────────────────────────────────────────────
  // {
  //   slug: "your-post-slug",
  //   title: "中文標題 — <60 字元",
  //   titleEn: "English Title — Under 60 Characters",
  //   description: "中文 meta description — 120-155 字元，出現喺 Google 搜尋結果。",
  //   descriptionEn: "English meta description — 120-155 chars, shown in SERP.",
  //   excerpt: "中文摘要 — 用於 blog 列表頁卡片。",
  //   excerptEn: "English excerpt — shown on the blog index card.",
  //   date: "2026-01-01",
  //   tag: "穿線知識",
  //   keywords: ["keyword1", "keyword2", "關鍵字"],
  //   readingTime: 5,
  // },
];

/** Look up a single post by slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** All slugs — used by generateStaticParams */
export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
