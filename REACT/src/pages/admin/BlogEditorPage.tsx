"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Save,
    Send,
    Sparkles,
    Image as ImageIcon,
    Tag,
} from "lucide-react";
import {
    getPostById,
    createPost,
    updatePost,
    generateSlug,
    calculateReadTime,
    getDefaultAuthor,
    type BlogStatus,
} from "@/lib/blogStore";
import { categories } from "@/data/blogs";

export function BlogEditorPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
        category: "ai-systems",
        tags: [] as string[],
        isFeatured: false,
        isTrending: false,
        seoTitle: "",
        seoDescription: "",
    });
    const [tagInput, setTagInput] = useState("");

    // Load existing post
    useEffect(() => {
        if (id) {
            const post = getPostById(id);
            if (post) {
                setFormData({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    thumbnail: post.thumbnail,
                    category: post.category,
                    tags: post.tags,
                    isFeatured: post.isFeatured,
                    isTrending: post.isTrending,
                    seoTitle: post.seoTitle || "",
                    seoDescription: post.seoDescription || "",
                });
            }
        }
    }, [id]);

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEditing && formData.title) {
            setFormData((prev) => ({
                ...prev,
                slug: generateSlug(formData.title),
            }));
        }
    }, [formData.title, isEditing]);

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    };

    const handleSave = async (publishStatus: BlogStatus) => {
        setIsSaving(true);

        const postData = {
            ...formData,
            readTime: calculateReadTime(formData.content),
            status: publishStatus,
            author: getDefaultAuthor(),
            publishedAt: publishStatus === "published" ? new Date().toISOString().split("T")[0] : "",
        };

        try {
            if (isEditing && id) {
                updatePost(id, postData);
            } else {
                createPost(postData);
            }
            navigate("/blog-generator/blogs");
        } catch (error) {
            console.error("Error saving post:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        to="/blog-generator/blogs"
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-white/60" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white font-['Outfit']">
                            {isEditing ? "Edit Blog" : "Create New Blog"}
                        </h1>
                        <p className="text-white/50 text-sm">
                            {isEditing ? "Make changes to your post" : "Write something amazing"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleSave("draft")}
                        disabled={isSaving || !formData.title}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSave("published")}
                        disabled={isSaving || !formData.title || !formData.content}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        Publish
                    </button>
                </div>
            </div>

            {/* AI Generate Button */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        <div>
                            <p className="text-white font-medium">AI Blog Generator</p>
                            <p className="text-white/50 text-sm">Generate content using LangGraph</p>
                        </div>
                    </div>
                    <button
                        className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors text-sm font-medium"
                        onClick={() => alert("AI generation coming in Phase 2!")}
                    >
                        Generate with AI
                    </button>
                </div>
            </motion.div>

            {/* Editor Form */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-white/70 text-sm mb-2 font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter a compelling title..."
                            className="w-full px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/10 text-white text-lg placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-white/70 text-sm mb-2 font-medium">
                            Slug
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-white/40 text-sm">/blogs/</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-[#0e0e14] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-white/70 text-sm mb-2 font-medium">
                            Excerpt
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            placeholder="Write a short summary..."
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-white/70 text-sm mb-2 font-medium">
                            Content (Markdown)
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your blog content in Markdown..."
                            rows={20}
                            className="w-full px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none font-mono text-sm"
                        />
                        <p className="text-white/30 text-xs mt-2">
                            Supports Markdown formatting. Read time: {calculateReadTime(formData.content)} min
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Thumbnail */}
                    <div className="p-4 rounded-xl bg-[#0e0e14] border border-white/10">
                        <label className="flex items-center gap-2 text-white/70 text-sm mb-3 font-medium">
                            <ImageIcon className="w-4 h-4" />
                            Cover Image
                        </label>
                        <img
                            src={formData.thumbnail}
                            alt="Cover"
                            className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <input
                            type="text"
                            value={formData.thumbnail}
                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                            placeholder="Image URL..."
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-indigo-500/50"
                        />
                    </div>

                    {/* Category */}
                    <div className="p-4 rounded-xl bg-[#0e0e14] border border-white/10">
                        <label className="block text-white/70 text-sm mb-3 font-medium">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50"
                        >
                            {categories.filter(c => c.id !== "all").map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="p-4 rounded-xl bg-[#0e0e14] border border-white/10">
                        <label className="flex items-center gap-2 text-white/70 text-sm mb-3 font-medium">
                            <Tag className="w-4 h-4" />
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center gap-1"
                                >
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="hover:text-white"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                                placeholder="Add tag..."
                                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-indigo-500/50"
                            />
                            <button
                                onClick={handleAddTag}
                                className="px-3 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="p-4 rounded-xl bg-[#0e0e14] border border-white/10 space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isFeatured}
                                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                className="w-4 h-4 rounded bg-white/10 border-white/20 text-indigo-500 focus:ring-indigo-500"
                            />
                            <span className="text-white/70 text-sm">Featured post</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isTrending}
                                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                                className="w-4 h-4 rounded bg-white/10 border-white/20 text-indigo-500 focus:ring-indigo-500"
                            />
                            <span className="text-white/70 text-sm">Mark as trending</span>
                        </label>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
