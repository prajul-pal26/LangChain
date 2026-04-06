import type { Metadata } from "next";
import Link from "next/link";
import { getBlogBySlug, blogs, categoryColors, type BlogCategory } from "@/data/blogs";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Pranjul Pal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://www.generativedge.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function CategoryBadge({ category }: { category: BlogCategory }) {
  return (
    <span
      className={`inline-block text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full border ${categoryColors[category]}`}
    >
      {category}
    </span>
  );
}

function renderBody(body: string) {
  const lines = body.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="font-serif text-2xl md:text-3xl tracking-tight mt-12 mb-6"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="font-serif text-xl md:text-2xl tracking-tight mt-8 mb-4"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="space-y-2 my-4 ml-1">
          {listItems.map((item, j) => (
            <li key={j} className="flex gap-3 text-t-mid leading-relaxed">
              <span className="text-gold mt-1.5 text-xs">&#9670;</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-t font-medium">$1</strong>')
                    .replace(/`(.+?)`/g, '<code class="font-mono text-sm bg-bg-3 px-1.5 py-0.5 rounded text-gold">$1</code>'),
                }}
              />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith("1. ") || /^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2 my-4 ml-1">
          {listItems.map((item, j) => (
            <li key={j} className="flex gap-3 text-t-mid leading-relaxed">
              <span className="text-gold font-mono text-sm font-medium min-w-[20px]">
                {j + 1}.
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-t font-medium">$1</strong>')
                    .replace(/`(.+?)`/g, '<code class="font-mono text-sm bg-bg-3 px-1.5 py-0.5 rounded text-gold">$1</code>'),
                }}
              />
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      elements.push(
        <p
          key={i}
          className="text-t-mid leading-[1.8] my-4"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-t font-medium">$1</strong>')
              .replace(/`(.+?)`/g, '<code class="font-mono text-sm bg-bg-3 px-1.5 py-0.5 rounded text-gold">$1</code>'),
          }}
        />
      );
    }
    i++;
  }

  return elements;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) notFound();

  const related = blogs
    .filter((b) => b.category === post.category && b.slug !== post.slug)
    .slice(0, 3);

  const bodyElements = renderBody(post.body);

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
        {/* Back link */}
        <div className="mx-auto max-w-[1400px] px-8 lg:px-12 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-t-dim font-mono hover:text-gold transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="rotate-180"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to all posts
          </Link>
        </div>

        {/* Article */}
        <article className="mx-auto max-w-[1400px] px-8 lg:px-12 pt-12 pb-20">
          <BlogPostClient>
            <header className="max-w-3xl mb-16">
              <div className="flex items-center gap-4 mb-6">
                <CategoryBadge category={post.category} />
                <span className="text-sm text-t-dim font-mono">{post.date}</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 leading-[1.1]">
                {post.title}
              </h1>
              <p className="text-xl text-t-mid leading-relaxed">{post.excerpt}</p>
            </header>
          </BlogPostClient>

          {/* Divider */}
          <div className="h-px bg-[var(--border)] max-w-3xl mb-12" />

          {/* Article Body — server rendered for SEO */}
          <div className="max-w-3xl">{bodyElements}</div>

          {/* Author Card */}
          <div className="max-w-3xl mt-16 pt-12 border-t border-[var(--border)]">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <span className="font-serif text-xl text-gold">P</span>
              </div>
              <div>
                <p className="font-serif text-lg">Pranjul Pal</p>
                <p className="text-sm text-t-dim">
                  AI Engineer building autonomous agents and production AI systems
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="border-t border-[var(--border)]">
            <div className="mx-auto max-w-[1400px] px-8 lg:px-12 py-20">
              <div className="flex items-center gap-5 mb-10">
                <span className="font-mono text-sm text-gold font-medium">
                  More
                </span>
                <div className="w-10 h-px bg-[var(--border-h)]" />
                <span className="font-mono text-xs tracking-[3px] uppercase text-t-dim">
                  Related Posts
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    href={`/blog/${rPost.slug}`}
                    className="group block"
                  >
                    <div className="rounded-xl border border-[var(--border)] bg-bg-2 p-6 hover:border-[var(--border-h)] hover:-translate-y-1 transition-all duration-300 h-full">
                      <CategoryBadge category={rPost.category} />
                      <h3 className="font-serif text-lg tracking-tight mt-4 mb-3 group-hover:text-gold transition-colors duration-200 line-clamp-2">
                        {rPost.title}
                      </h3>
                      <p className="text-sm text-t-dim leading-relaxed line-clamp-2 mb-3">
                        {rPost.excerpt}
                      </p>
                      <span className="text-xs text-t-dim font-mono">
                        {rPost.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
