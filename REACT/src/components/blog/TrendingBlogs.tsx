"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { getTrendingBlogs, categories } from "@/data/blogs";

export function TrendingBlogs() {
    const trendingPosts = getTrendingBlogs().slice(0, 3);

    return (
        <section className="py-12 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e14] via-[#0c0c10] to-[#0e0e14]" />

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-8"
                >
                    <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <TrendingUp className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white font-['Outfit']">
                        Trending This Week
                    </h2>
                    <span className="text-orange-400">🔥</span>
                </motion.div>

                {/* Trending cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trendingPosts.map((post, index) => {
                        const category = categories.find((c) => c.id === post.category);
                        return (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <Link
                                    to={`/blogs/${post.slug}`}
                                    className="block relative overflow-hidden rounded-2xl bg-[#141420]/80 border border-white/[0.08] backdrop-blur-sm transition-all duration-500 hover:border-orange-500/30 hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.2)]"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#141420] via-[#141420]/50 to-transparent" />

                                        {/* Rank badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="w-8 h-8 rounded-full bg-orange-500/90 text-white text-sm font-bold flex items-center justify-center">
                                                #{index + 1}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        {/* Category */}
                                        <span className="text-xs text-orange-400 font-medium mb-2 block">
                                            {category?.icon} {category?.name}
                                        </span>

                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-white mb-3 font-['Outfit'] line-clamp-2 group-hover:text-orange-300 transition-colors duration-300">
                                            {post.title}
                                        </h3>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-white/40 text-xs">
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {post.readTime} min read
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
