"use client";

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Divider } from "@/components/Divider";
import { getBlogBySlug, categories, blogPosts } from "@/data/blogs";
import { BlogCard } from "@/components/blog/BlogCard";

export function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [readingProgress, setReadingProgress] = useState(0);
    const post = getBlogBySlug(slug || "");
    const category = categories.find((c) => c.id === post?.category);

    // Reading progress
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setReadingProgress(Math.min(progress, 100));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!post) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
                    <Link
                        to="/blogs"
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        ← Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = blogPosts
        .filter((p) => p.category === post.category && p.id !== post.id)
        .slice(0, 2);

    // Simple markdown to HTML converter for basic formatting
    const formatContent = (content: string) => {
        return content
            .split("\n")
            .map((line, index) => {
                // Headers
                if (line.startsWith("# ")) {
                    return (
                        <h1 key={index} className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4 font-['Outfit']">
                            {line.substring(2)}
                        </h1>
                    );
                }
                if (line.startsWith("## ")) {
                    return (
                        <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4 font-['Outfit']">
                            {line.substring(3)}
                        </h2>
                    );
                }
                if (line.startsWith("### ")) {
                    return (
                        <h3 key={index} className="text-xl font-semibold text-white mt-6 mb-3 font-['Outfit']">
                            {line.substring(4)}
                        </h3>
                    );
                }
                // Code blocks
                if (line.startsWith("```")) {
                    return null; // Handle code blocks separately
                }
                // Lists
                if (line.startsWith("- ")) {
                    return (
                        <li key={index} className="text-white/70 ml-4 mb-2 list-disc list-inside">
                            {line.substring(2)}
                        </li>
                    );
                }
                // Checkboxes
                if (line.startsWith("- [ ] ")) {
                    return (
                        <li key={index} className="text-white/70 ml-4 mb-2 flex items-center gap-2">
                            <span className="w-4 h-4 border border-white/30 rounded" />
                            {line.substring(6)}
                        </li>
                    );
                }
                // Bold text
                if (line.includes("**")) {
                    const parts = line.split(/\*\*(.*?)\*\*/g);
                    return (
                        <p key={index} className="text-white/70 leading-relaxed mb-4">
                            {parts.map((part, i) =>
                                i % 2 === 1 ? (
                                    <strong key={i} className="text-white font-semibold">
                                        {part}
                                    </strong>
                                ) : (
                                    part
                                )
                            )}
                        </p>
                    );
                }
                // Horizontal rule
                if (line === "---") {
                    return <hr key={index} className="border-white/10 my-8" />;
                }
                // Empty lines
                if (line.trim() === "") {
                    return null;
                }
                // Regular paragraphs
                return (
                    <p key={index} className="text-white/70 leading-relaxed mb-4">
                        {line}
                    </p>
                );
            })
            .filter(Boolean);
    };

    const shareOnTwitter = () => {
        const url = window.location.href;
        const text = `${post.title} by @pranjulpal`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    };

    const shareOnLinkedIn = () => {
        const url = window.location.href;
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-[#030303]">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-[#030303]/50">
                <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            <Header />

            <main className="pt-24">
                {/* Hero */}
                <section className="relative py-12">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c12] to-[#0e0e14]" />

                    <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
                        {/* Back link */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                to="/blogs"
                                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blogs
                            </Link>
                        </motion.div>

                        {/* Category */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
                                {category?.icon} {category?.name}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Outfit'] leading-tight"
                        >
                            {post.title}
                        </motion.h1>

                        {/* Meta */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap items-center gap-4 text-white/50 mb-8"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                    {post.author.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{post.author.name}</p>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readTime} min read
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Featured Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="rounded-2xl overflow-hidden mb-12"
                        >
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-64 md:h-96 object-cover"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-8">
                    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="prose prose-invert prose-lg max-w-none"
                        >
                            {formatContent(post.content)}
                        </motion.article>

                        {/* Tags */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10"
                        >
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </motion.div>

                        {/* Share */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10"
                        >
                            <span className="flex items-center gap-2 text-white/50">
                                <Share2 className="w-4 h-4" />
                                Share this post:
                            </span>
                            <button
                                onClick={shareOnTwitter}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                                title="Share on Twitter/X"
                            >
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button
                                onClick={shareOnLinkedIn}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                                title="Share on LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </button>
                        </motion.div>

                        {/* Author bio */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="mt-12 p-6 rounded-2xl bg-[#0e0e14]/80 border border-white/[0.08]"
                        >
                            <h3 className="text-lg font-semibold text-white mb-2 font-['Outfit']">
                                About the Author
                            </h3>
                            <p className="text-white/60 leading-relaxed">
                                {post.author.bio}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <>
                        <Divider />
                        <section className="py-12">
                            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                                <h2 className="text-2xl font-bold text-white mb-8 font-['Outfit']">
                                    Related Posts
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {relatedPosts.map((relatedPost, index) => (
                                        <BlogCard key={relatedPost.id} post={relatedPost} index={index} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>

            {/* Scroll to top button */}
            {readingProgress > 20 && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-indigo-500/90 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 transition-colors"
                    title="Scroll to top"
                >
                    <ChevronUp className="w-6 h-6" />
                </motion.button>
            )}

            <Footer />
        </div>
    );
}
