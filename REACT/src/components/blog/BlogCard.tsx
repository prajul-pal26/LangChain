"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/blogs";
import { categories } from "@/data/blogs";

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
    index?: number;
}

export function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
    const category = categories.find((c) => c.id === post.category);

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group"
        >
            <Link
                to={`/blogs/${post.slug}`}
                className={`block relative overflow-hidden rounded-2xl bg-[#0e0e14]/80 border border-white/[0.08] backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ${featured ? "h-full" : ""
                    }`}
            >
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm">
                            {category?.icon} {category?.name}
                        </span>
                    </div>

                    {/* Trending badge */}
                    {post.isTrending && (
                        <div className="absolute top-4 right-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30 backdrop-blur-sm">
                                🔥 Trending
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 font-['Outfit'] line-clamp-2 group-hover:text-indigo-300 transition-colors duration-300">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-white/40 text-xs">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime} min read
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
