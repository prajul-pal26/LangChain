import type { Metadata } from "next";
import Link from "next/link";
import {
  categoryColors,
  getFeaturedBlogs,
  getHeroFeaturedBlog,
  type BlogCategory,
} from "@/data/blogs";
import BlogFilters from "./BlogFilters";

export const metadata: Metadata = {
  title: "Blog — Pranjul Pal",
  description:
    "Thoughts on building production AI systems, autonomous agents, retrieval-augmented generation, and the tools that make it all work.",
  openGraph: {
    title: "Blog — Pranjul Pal",
    description:
      "Thoughts on building production AI systems, autonomous agents, and RAG.",
    url: "https://www.generativedge.com/blog",
  },
};

function CategoryBadge({ category }: { category: BlogCategory }) {
  return (
    <span
      className={`inline-block text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full border ${categoryColors[category]}`}
    >
      {category}
    </span>
  );
}

export default function BlogPage() {
  const heroPost = getHeroFeaturedBlog();
  const featuredPosts = getFeaturedBlogs().filter((b) => !b.heroFeatured);

  return (
    <main className="relative z-10 min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-100 backdrop-blur-2xl bg-bg/88 border-b border-[var(--border)]">
        <div className="mx-auto max-w-[1400px] px-8 lg:px-12 h-[72px] flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-tight">
            <span className="text-t">Pranjul</span>
            <span className="text-gold"> Pal</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-sans text-t-mid hover:text-gold transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm font-sans text-gold transition-colors duration-200"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-[72px]">
        {/* Hero Section */}
        <section className="mx-auto max-w-[1400px] px-8 lg:px-12 pt-20 pb-16">
          <div className="flex items-center gap-5 mb-8">
            <span className="font-mono text-sm text-gold font-medium">01</span>
            <div className="w-10 h-px bg-[var(--border-h)]" />
            <span className="font-mono text-xs tracking-[3px] uppercase text-t-dim">
              Newsroom
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
            Blog
          </h1>
          <p className="text-t-mid text-lg md:text-xl max-w-2xl leading-relaxed">
            Thoughts on building production AI systems, autonomous agents,
            retrieval-augmented generation, and the tools that make it all work.
          </p>
        </section>

        {/* Featured Hero Card */}
        {heroPost && (
          <section className="mx-auto max-w-[1400px] px-8 lg:px-12 pb-12">
            <Link href={`/blog/${heroPost.slug}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-bg-2 hover:border-[var(--border-h)] transition-all duration-300">
                <div className="h-64 md:h-80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/15 via-amber-900/20 to-bg-2" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(154,108,46,0.08),transparent_60%)]" />
                  <div className="absolute top-12 right-12 w-48 h-48 rounded-full border border-gold/10 opacity-40" />
                  <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-gold/15 opacity-30" />
                  <div className="absolute bottom-8 left-12 w-24 h-24 rounded-full bg-gold/5" />
                  <div className="absolute top-1/2 left-1/3 w-64 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                </div>

                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-4">
                    <CategoryBadge category={heroPost.category} />
                    <span className="text-sm text-t-dim font-mono">
                      {heroPost.date}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4 group-hover:text-gold transition-colors duration-200">
                    {heroPost.title}
                  </h2>
                  <p className="text-t-mid text-lg leading-relaxed max-w-3xl">
                    {heroPost.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Featured Grid */}
        <section className="mx-auto max-w-[1400px] px-8 lg:px-12 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredPosts.slice(0, 4).map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <div className="h-full rounded-xl border border-[var(--border)] bg-bg-2 p-6 hover:border-[var(--border-h)] hover:-translate-y-1 transition-all duration-300">
                  <div
                    className={`h-1 w-12 rounded-full mb-5 ${
                      i === 0
                        ? "bg-amber-500"
                        : i === 1
                        ? "bg-cyan-500"
                        : i === 2
                        ? "bg-emerald-500"
                        : "bg-violet-500"
                    }`}
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <CategoryBadge category={post.category} />
                  </div>
                  <h3 className="font-serif text-lg tracking-tight mb-3 group-hover:text-gold transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-t-dim leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-xs text-t-dim font-mono">
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
          <div className="h-px bg-[var(--border)]" />
        </div>

        {/* Client-side interactive filters */}
        <BlogFilters />

        {/* Newsletter CTA */}
        <section className="mx-auto max-w-[1400px] px-8 lg:px-12 pb-20">
          <div className="relative rounded-2xl border border-[var(--border)] bg-bg-2 p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(154,108,46,0.04),transparent_70%)]" />
            <div className="relative">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">
                Stay at the edge
              </h2>
              <p className="text-t-mid text-lg mb-8 max-w-xl mx-auto">
                Get notified when I publish new research, tutorials, and deep
                dives into production AI systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-bg border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-t placeholder:text-t-dim font-mono focus:outline-none focus:border-gold/30 transition-colors"
                />
                <button className="font-mono text-xs bg-t text-bg px-6 py-3 rounded-lg font-medium hover:brightness-95 transition-all uppercase tracking-wider whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--border)] py-12">
          <div className="mx-auto max-w-[1400px] px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="font-serif text-lg tracking-tight">
              <span className="text-t">Pranjul</span>
              <span className="text-gold"> Pal</span>
            </Link>
            <p className="text-sm text-t-dim font-mono">
              &copy; {new Date().getFullYear()} The Generative Edge. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
