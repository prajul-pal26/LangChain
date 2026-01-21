"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
    Search,
    Filter,
    PlusCircle,
    MoreHorizontal,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    ExternalLink,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
    getAllPosts,
    updatePostStatus,
    hardDeletePost,
    type AdminBlogPost,
    type BlogStatus,
} from "@/lib/blogStore";
import { categories } from "@/data/blogs";

export function BlogListPage() {
    const [searchParams] = useSearchParams();
    const [posts, setPosts] = useState<AdminBlogPost[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<BlogStatus | "all">(
        (searchParams.get("status") as BlogStatus) || "all"
    );
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    useEffect(() => {
        setPosts(getAllPosts());
    }, []);

    // Filter posts
    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || post.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleStatusChange = (id: string, status: BlogStatus) => {
        updatePostStatus(id, status);
        setPosts(getAllPosts());
        setOpenMenuId(null);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this post? This cannot be undone.")) {
            hardDeletePost(id);
            setPosts(getAllPosts());
        }
        setOpenMenuId(null);
    };

    const getCategoryName = (categoryId: string) => {
        return categories.find((c) => c.id === categoryId)?.name || categoryId;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-['Outfit']">All Blogs</h1>
                    <p className="text-white/50 mt-1">
                        Manage your blog posts ({filteredPosts.length} posts)
                    </p>
                </div>
                <Link
                    to="/blog-generator/blogs/new"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                >
                    <PlusCircle className="w-5 h-5" />
                    New Blog
                </Link>
            </div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-[#0e0e14]/80 border border-white/[0.08]"
            >
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-white/40" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as BlogStatus | "all")}
                        className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="disabled">Disabled</option>
                        <option value="scheduled">Scheduled</option>
                    </select>
                </div>

                {/* Category Filter */}
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                >
                    <option value="all">All Categories</option>
                    {categories.filter(c => c.id !== "all").map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                        </option>
                    ))}
                </select>
            </motion.div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl bg-[#0e0e14]/80 border border-white/[0.08] overflow-hidden"
            >
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/[0.08]">
                            <th className="text-left px-6 py-4 text-white/50 text-sm font-medium">
                                Title
                            </th>
                            <th className="text-left px-6 py-4 text-white/50 text-sm font-medium">
                                Status
                            </th>
                            <th className="text-left px-6 py-4 text-white/50 text-sm font-medium hidden md:table-cell">
                                Category
                            </th>
                            <th className="text-left px-6 py-4 text-white/50 text-sm font-medium hidden lg:table-cell">
                                Views
                            </th>
                            <th className="text-left px-6 py-4 text-white/50 text-sm font-medium hidden lg:table-cell">
                                Last Edited
                            </th>
                            <th className="text-right px-6 py-4 text-white/50 text-sm font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map((post, index) => (
                            <motion.tr
                                key={post.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-12 h-12 rounded-lg object-cover hidden sm:block"
                                        />
                                        <div className="min-w-0">
                                            <p className="text-white font-medium truncate max-w-[300px]">
                                                {post.title}
                                            </p>
                                            <p className="text-white/40 text-sm">
                                                {post.readTime} min read
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={post.status} />
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    <span className="text-white/60 text-sm">
                                        {getCategoryName(post.category)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    <span className="text-white/60">
                                        {post.views.toLocaleString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    <span className="text-white/40 text-sm">
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="relative inline-block">
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === post.id ? null : post.id)}
                                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            <MoreHorizontal className="w-5 h-5 text-white/60" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {openMenuId === post.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1a1a24] border border-white/10 shadow-xl z-50"
                                            >
                                                <div className="py-1">
                                                    <Link
                                                        to={`/blog-generator/blogs/edit/${post.id}`}
                                                        className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        to={`/blogs/${post.slug}`}
                                                        target="_blank"
                                                        className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        View
                                                    </Link>
                                                    <div className="border-t border-white/10 my-1" />
                                                    {post.status !== "published" && (
                                                        <button
                                                            onClick={() => handleStatusChange(post.id, "published")}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-emerald-400 hover:bg-white/5 transition-colors"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                            Publish
                                                        </button>
                                                    )}
                                                    {post.status === "published" && (
                                                        <button
                                                            onClick={() => handleStatusChange(post.id, "draft")}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-amber-400 hover:bg-white/5 transition-colors"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                            Unpublish
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleStatusChange(post.id, "disabled")}
                                                        className="w-full flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-white/5 transition-colors"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Disable
                                                    </button>
                                                    <div className="border-t border-white/10 my-1" />
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="w-full flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-rose-500/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-white/40">No posts found</p>
                    </div>
                )}
            </motion.div>

            {/* Click outside to close menu */}
            {openMenuId && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenMenuId(null)}
                />
            )}
        </div>
    );
}
