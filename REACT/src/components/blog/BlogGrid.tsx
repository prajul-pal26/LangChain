"use client";

import { motion } from "framer-motion";
import { BlogCard } from "./BlogCard";
import type { BlogPost } from "@/data/blogs";

interface BlogGridProps {
    posts: BlogPost[];
    title?: string;
}

export function BlogGrid({ posts, title = "Latest Posts" }: BlogGridProps) {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold text-white font-['Outfit']">
                        {title}
                    </h2>
                </motion.div>

                {/* Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <p className="text-white/40 text-lg">
                            No posts found in this category.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
