"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogs, categoryColors, type BlogCategory } from "@/data/blogs";

const categories: BlogCategory[] = [
  "Research",
  "Product",
  "Announcements",
  "Tutorial",
  "Case Study",
  "Deep Dive",
];

function CategoryBadge({ category }: { category: BlogCategory }) {
  return (
    <span
      className={`inline-block text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full border ${categoryColors[category]}`}
    >
      {category}
    </span>
  );
}

export default function BlogFilters() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogs.filter((post) => {
    const matchesCategory = !activeCategory || post.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="mx-auto max-w-[1400px] px-8 lg:px-12 py-20">
      <div className="flex items-center gap-5 mb-12">
        <span className="font-mono text-sm text-gold font-medium">02</span>
        <div className="w-10 h-px bg-[var(--border-h)]" />
        <span className="font-mono text-xs tracking-[3px] uppercase text-t-dim">
          All Posts
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-xs font-mono tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
              !activeCategory
                ? "bg-gold/15 text-gold border-gold/30"
                : "text-t-dim border-[var(--border)] hover:border-[var(--border-h)] hover:text-t-mid"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={`text-xs font-mono tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gold/15 text-gold border-gold/30"
                  : "text-t-dim border-[var(--border)] hover:border-[var(--border-h)] hover:text-t-mid"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="lg:ml-auto">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-72 bg-bg-2 border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-t placeholder:text-t-dim font-mono focus:outline-none focus:border-gold/30 transition-colors"
          />
        </div>
      </div>

      {/* Post List */}
      <div className="space-y-0">
        {filteredPosts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="grid grid-cols-1 md:grid-cols-[140px_160px_1fr] gap-4 md:gap-8 items-baseline py-6 border-b border-[var(--border)] hover:bg-bg-2/50 px-4 -mx-4 rounded-lg transition-colors duration-200">
                <span className="text-sm text-t-dim font-mono whitespace-nowrap">
                  {post.date}
                </span>
                <div>
                  <CategoryBadge category={post.category} />
                </div>
                <div>
                  <h3 className="font-serif text-xl tracking-tight group-hover:text-gold transition-colors duration-200 mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-t-dim leading-relaxed line-clamp-1 hidden md:block">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-t-dim font-mono text-sm">
              No posts found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
