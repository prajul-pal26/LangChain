"use client";

import type { BlogStatus } from "@/lib/blogStore";

interface StatusBadgeProps {
    status: BlogStatus;
    size?: "sm" | "md";
}

const statusStyles: Record<BlogStatus, { bg: string; text: string; label: string }> = {
    published: {
        bg: "bg-emerald-500/20",
        text: "text-emerald-400",
        label: "Published",
    },
    draft: {
        bg: "bg-amber-500/20",
        text: "text-amber-400",
        label: "Draft",
    },
    disabled: {
        bg: "bg-rose-500/20",
        text: "text-rose-400",
        label: "Disabled",
    },
    scheduled: {
        bg: "bg-cyan-500/20",
        text: "text-cyan-400",
        label: "Scheduled",
    },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
    const styles = statusStyles[status];
    const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full font-medium ${styles.bg} ${styles.text} ${sizeClasses}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${status === "published" ? "bg-emerald-400" : status === "draft" ? "bg-amber-400" : status === "disabled" ? "bg-rose-400" : "bg-cyan-400"}`} />
            {styles.label}
        </span>
    );
}
