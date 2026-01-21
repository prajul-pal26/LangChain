"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Divider } from "@/components/Divider";
import { BlogHero } from "@/components/blog/BlogHero";
import { TrendingBlogs } from "@/components/blog/TrendingBlogs";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { getBlogsByCategory } from "@/data/blogs";

export function BlogsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const filteredPosts = getBlogsByCategory(selectedCategory);

    return (
        <div className="min-h-screen bg-[#030303]">
            <Header />
            <main>
                <BlogHero />
                <Divider />
                <TrendingBlogs />
                <Divider />
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
                <BlogGrid posts={filteredPosts} title="All Posts" />
                <Divider />
                <NewsletterCTA />
            </main>
            <Footer />
        </div>
    );
}
