"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FileText,
    Eye,
    TrendingUp,
    Clock,
    PlusCircle,
    Sparkles,
    AlertTriangle,
    ArrowRight,
} from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getStats } from "@/lib/blogStore";

export function DashboardPage() {
    const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null);

    useEffect(() => {
        setStats(getStats());
    }, []);

    if (!stats) return null;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-['Outfit']">Dashboard</h1>
                    <p className="text-white/50 mt-1">Welcome back! Here's your content overview.</p>
                </div>
                <Link
                    to="/blog-generator/blogs/new"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                >
                    <PlusCircle className="w-5 h-5" />
                    New Blog
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Blogs"
                    value={stats.total}
                    icon={FileText}
                    color="indigo"
                    delay={0}
                />
                <StatsCard
                    title="Published"
                    value={stats.published}
                    icon={TrendingUp}
                    color="emerald"
                    delay={0.1}
                />
                <StatsCard
                    title="Drafts"
                    value={stats.drafts}
                    icon={Clock}
                    color="amber"
                    delay={0.2}
                />
                <StatsCard
                    title="Total Views"
                    value={stats.totalViews.toLocaleString()}
                    icon={Eye}
                    color="cyan"
                    delay={0.3}
                />
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* AI Generate Card */}
                <Link
                    to="/blog-generator/blogs/new"
                    className="group p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                            <Sparkles className="w-8 h-8 text-indigo-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white font-['Outfit']">
                                Generate with AI
                            </h3>
                            <p className="text-white/50 text-sm">
                                Use LangGraph to create SEO-optimized blogs
                            </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                    </div>
                </Link>

                {/* Manage Blogs Card */}
                <Link
                    to="/blog-generator/blogs"
                    className="group p-6 rounded-2xl bg-[#0e0e14]/80 border border-white/[0.08] hover:border-white/20 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-white/5">
                            <FileText className="w-8 h-8 text-white/60" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white font-['Outfit']">
                                Manage Blogs
                            </h3>
                            <p className="text-white/50 text-sm">
                                Edit, publish, or delete existing posts
                            </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                    </div>
                </Link>
            </motion.div>

            {/* Alerts & Nudges */}
            {stats.oldDrafts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-4"
                >
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-amber-400 font-medium">
                            {stats.oldDrafts.length} draft{stats.oldDrafts.length > 1 ? "s" : ""} older than 7 days
                        </p>
                        <p className="text-white/50 text-sm">
                            Consider finishing or deleting old drafts
                        </p>
                    </div>
                    <Link
                        to="/blog-generator/blogs?status=draft"
                        className="text-amber-400 text-sm font-medium hover:underline"
                    >
                        View Drafts
                    </Link>
                </motion.div>
            )}

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recently Edited */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="p-6 rounded-2xl bg-[#0e0e14]/80 border border-white/[0.08]"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 font-['Outfit'] flex items-center gap-2">
                        <Clock className="w-5 h-5 text-white/50" />
                        Recently Edited
                    </h3>
                    <div className="space-y-3">
                        {stats.recentlyEdited.map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog-generator/blogs/edit/${post.id}`}
                                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate group-hover:text-indigo-400 transition-colors">
                                        {post.title}
                                    </p>
                                    <p className="text-white/40 text-sm">
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <StatusBadge status={post.status} size="sm" />
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Most Viewed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="p-6 rounded-2xl bg-[#0e0e14]/80 border border-white/[0.08]"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 font-['Outfit'] flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-white/50" />
                        Top Performer
                    </h3>
                    {stats.mostViewed ? (
                        <Link
                            to={`/blog-generator/blogs/edit/${stats.mostViewed.id}`}
                            className="block p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <img
                                    src={stats.mostViewed.thumbnail}
                                    alt={stats.mostViewed.title}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-semibold mb-1 line-clamp-2">
                                        {stats.mostViewed.title}
                                    </p>
                                    <div className="flex items-center gap-4 text-white/50 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {stats.mostViewed.views.toLocaleString()} views
                                        </span>
                                        <span>{stats.mostViewed.readTime} min read</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <p className="text-white/40 text-center py-8">
                            No published posts yet
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
