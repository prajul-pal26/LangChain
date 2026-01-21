"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color: "indigo" | "emerald" | "amber" | "rose" | "cyan";
    delay?: number;
}

const colorStyles = {
    indigo: {
        bg: "from-indigo-500/20 to-indigo-500/5",
        border: "border-indigo-500/30",
        icon: "text-indigo-400",
        trend: "text-indigo-400",
    },
    emerald: {
        bg: "from-emerald-500/20 to-emerald-500/5",
        border: "border-emerald-500/30",
        icon: "text-emerald-400",
        trend: "text-emerald-400",
    },
    amber: {
        bg: "from-amber-500/20 to-amber-500/5",
        border: "border-amber-500/30",
        icon: "text-amber-400",
        trend: "text-amber-400",
    },
    rose: {
        bg: "from-rose-500/20 to-rose-500/5",
        border: "border-rose-500/30",
        icon: "text-rose-400",
        trend: "text-rose-400",
    },
    cyan: {
        bg: "from-cyan-500/20 to-cyan-500/5",
        border: "border-cyan-500/30",
        icon: "text-cyan-400",
        trend: "text-cyan-400",
    },
};

export function StatsCard({ title, value, icon: Icon, trend, color, delay = 0 }: StatsCardProps) {
    const styles = colorStyles[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${styles.bg} border ${styles.border} backdrop-blur-sm`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${styles.icon}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <span
                        className={`text-sm font-medium ${trend.isPositive ? "text-emerald-400" : "text-rose-400"
                            }`}
                    >
                        {trend.isPositive ? "+" : "-"}{trend.value}%
                    </span>
                )}
            </div>
            <div>
                <p className="text-white/50 text-sm mb-1">{title}</p>
                <p className="text-3xl font-bold text-white font-['Outfit']">{value}</p>
            </div>
        </motion.div>
    );
}
