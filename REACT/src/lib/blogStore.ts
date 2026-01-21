// Blog Store - LocalStorage-based CRUD operations
// Ready to swap for API integration later

import { blogPosts as initialBlogPosts, author } from "@/data/blogs";

export type BlogStatus = "published" | "draft" | "disabled" | "scheduled";

export interface AdminBlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    category: string;
    tags: string[];
    readTime: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    isFeatured: boolean;
    isTrending: boolean;
    status: BlogStatus;
    views: number;
    seoTitle?: string;
    seoDescription?: string;
    scheduledFor?: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
}

const STORAGE_KEY = "blog_admin_posts";

// Initialize store with existing blog posts
function initializeStore(): AdminBlogPost[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }

    // Convert initial blog posts to admin format
    const adminPosts: AdminBlogPost[] = initialBlogPosts.map((post) => ({
        ...post,
        status: "published" as BlogStatus,
        views: Math.floor(Math.random() * 1000) + 100, // Mock views
        createdAt: post.publishedAt,
        updatedAt: post.publishedAt,
    }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(adminPosts));
    return adminPosts;
}

// Get all posts
export function getAllPosts(): AdminBlogPost[] {
    return initializeStore();
}

// Get post by ID
export function getPostById(id: string): AdminBlogPost | undefined {
    const posts = getAllPosts();
    return posts.find((p) => p.id === id);
}

// Get post by slug
export function getPostBySlug(slug: string): AdminBlogPost | undefined {
    const posts = getAllPosts();
    return posts.find((p) => p.slug === slug);
}

// Get posts by status
export function getPostsByStatus(status: BlogStatus): AdminBlogPost[] {
    const posts = getAllPosts();
    return posts.filter((p) => p.status === status);
}

// Get published posts (for public blog)
export function getPublishedPosts(): AdminBlogPost[] {
    return getPostsByStatus("published");
}

// Create new post
export function createPost(post: Omit<AdminBlogPost, "id" | "createdAt" | "updatedAt" | "views">): AdminBlogPost {
    const posts = getAllPosts();
    const newPost: AdminBlogPost = {
        ...post,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
    };
    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
}

// Update post
export function updatePost(id: string, updates: Partial<AdminBlogPost>): AdminBlogPost | undefined {
    const posts = getAllPosts();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    posts[index] = {
        ...posts[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return posts[index];
}

// Update post status
export function updatePostStatus(id: string, status: BlogStatus): AdminBlogPost | undefined {
    return updatePost(id, {
        status,
        publishedAt: status === "published" ? new Date().toISOString().split("T")[0] : undefined,
    });
}

// Delete post (soft delete - sets status to disabled)
export function softDeletePost(id: string): boolean {
    const result = updatePost(id, { status: "disabled" });
    return result !== undefined;
}

// Hard delete post
export function hardDeletePost(id: string): boolean {
    const posts = getAllPosts();
    const filtered = posts.filter((p) => p.id !== id);
    if (filtered.length === posts.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
}

// Increment view count
export function incrementViews(id: string): void {
    const posts = getAllPosts();
    const index = posts.findIndex((p) => p.id === id);
    if (index !== -1) {
        posts[index].views += 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
}

// Get stats
export function getStats(): {
    total: number;
    published: number;
    drafts: number;
    disabled: number;
    scheduled: number;
    totalViews: number;
    mostViewed: AdminBlogPost | null;
    recentlyEdited: AdminBlogPost[];
    oldDrafts: AdminBlogPost[];
} {
    const posts = getAllPosts();
    const published = posts.filter((p) => p.status === "published");
    const drafts = posts.filter((p) => p.status === "draft");
    const disabled = posts.filter((p) => p.status === "disabled");
    const scheduled = posts.filter((p) => p.status === "scheduled");

    // Most viewed
    const mostViewed = published.length > 0
        ? published.reduce((max, p) => (p.views > max.views ? p : max))
        : null;

    // Recently edited (top 5)
    const recentlyEdited = [...posts]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5);

    // Old drafts (older than 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const oldDrafts = drafts.filter(
        (p) => new Date(p.updatedAt) < sevenDaysAgo
    );

    return {
        total: posts.length,
        published: published.length,
        drafts: drafts.length,
        disabled: disabled.length,
        scheduled: scheduled.length,
        totalViews: posts.reduce((sum, p) => sum + p.views, 0),
        mostViewed,
        recentlyEdited,
        oldDrafts,
    };
}

// Generate slug from title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

// Calculate read time (rough estimate: 200 words per minute)
export function calculateReadTime(content: string): number {
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
}

// Get default author
export function getDefaultAuthor() {
    return author;
}

// Reset store (for testing)
export function resetStore(): void {
    localStorage.removeItem(STORAGE_KEY);
    initializeStore();
}
