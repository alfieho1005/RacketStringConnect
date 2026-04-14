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
    coverImage: "/images/blog/how-to-choose-racket-string-and-tension.webp",
    coverAlt: "Professional stringer adjusting string tension on a racket stringing machine",
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
  {
    slug: "tennis-string-types-explained",
    title: "網球拍線材大解構：由製作過程睇清每種線嘅本質",
    titleEn: "Tennis String Types Explained — Materials, Construction & How to Choose",
    description:
      "天然腸線、尼龍線、聚酯線、克維拉同混合穿法，由製作原理到物理特性，穿線師角度逐樣拆解，幫你揀到最適合嘅線材。",
    descriptionEn:
      "Natural gut, nylon, polyester, Kevlar, and hybrid setups — understand how each string is made and which suits your game.",
    excerpt:
      "天然腸線、聚酯線、尼龍線、克維拉⋯⋯每種線材都有唔同製作方式同物理特性，揀錯線隨時影響表現同舒適度。",
    excerptEn:
      "Natural gut, polyester, nylon, Kevlar — each string type is made differently and plays differently. Pick the right one.",
    date: "2026-04-14",
    tag: "穿線知識",
    coverImage: "/images/blog/tennis-string-types-explained.webp",
    coverAlt: "Macro comparison of different tennis string types — natural gut, polyester, nylon, and kevlar side by side",
    keywords: [
      "tennis string types",
      "natural gut string",
      "polyester tennis string",
      "nylon synthetic gut",
      "kevlar tennis string",
      "hybrid stringing",
      "網球線材種類",
      "天然腸線",
      "聚酯線",
      "穿線師推薦",
      "racket stringing hong kong",
    ],
    readingTime: 8,
  },
  {
    slug: "what-strings-do-pro-tennis-players-use",
    title: "ATP 同 WTA 球星用咩線？職業球員穿線大公開",
    titleEn: "What Strings Do Pro Tennis Players Use? ATP & WTA Setups Revealed",
    description:
      "Djokovic、Nadal、Alcaraz、Świątek、Sabalenka⋯⋯逐位拆解佢哋用咩線材、點解揀呢個 setup，同埋對業餘球員嘅啟示。",
    descriptionEn:
      "From Djokovic's gut/poly hybrid to Nadal's full polyester — see what the top ATP & WTA players string and why it matters for your game.",
    excerpt:
      "Djokovic 用天然腸線 hybrid、Nadal 全用 poly、Federer 追求手感⋯⋯逐位拆解職業球員嘅穿線設定。",
    excerptEn:
      "Djokovic's gut hybrid, Nadal's full poly, Federer's classic setup — pro string choices explained.",
    date: "2026-04-14",
    tag: "穿線知識",
    coverImage: "/images/blog/what-strings-do-pro-tennis-players-use.webp",
    coverAlt: "Professional tennis player mid-swing on a hard court with dramatic stadium lighting",
    keywords: [
      "pro tennis strings",
      "what strings does Djokovic use",
      "Nadal string setup",
      "ATP player strings",
      "WTA player strings",
      "Babolat RPM Blast",
      "Luxilon Alu Power",
      "natural gut hybrid",
      "職業球員穿線",
      "網球線材推薦",
      "racket stringing hong kong",
    ],
    readingTime: 10,
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
