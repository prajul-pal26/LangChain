"use client";

import { motion } from "framer-motion";
import { TrendingUp, Code, Star } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { AnimatedDots } from "@/components/ui/animated-dots";
import { FloatingParticles } from "@/components/ui/floating-particles";

interface StatCardProps {
    number: string;
    label: string;
    icon: React.ReactNode;
    delay: number;
    glowColor: string;
}

function StatCard({ number, label, icon, delay, glowColor }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`relative p-8 rounded-3xl bg-[#0c0c12]/80 border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:border-white/20 group ${glowColor}`}
        >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                <div className="mb-4 text-white/30">{icon}</div>
                <div className="text-5xl md:text-6xl font-bold mb-2 font-['Outfit'] bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
                    {number}
                </div>
                <div className="text-white/50 text-sm font-medium uppercase tracking-widest">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}

export function Stats() {
    const stats = [
        {
            number: "3+",
            label: "AI Projects",
            icon: <TrendingUp className="w-6 h-6" />,
            glowColor: "hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]",
        },
        {
            number: "5+",
            label: "Technologies",
            icon: <Code className="w-6 h-6" />,
            glowColor: "hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]",
        },
        {
            number: "100%",
            label: "Open Source",
            icon: <Star className="w-6 h-6" />,
            glowColor: "hover:shadow-[0_0_40px_rgba(244,114,182,0.15)]",
        },
    ];

    return (
        <section className="relative py-24 bg-gradient-to-b from-[#08080c] via-[#0a0a10] to-[#0c0c12]">
            {/* Grid background - same as Technologies section */}
            <GridPattern />
            <AnimatedDots speed={0.4} />
            <FloatingParticles count={15} />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.05)_0%,_transparent_50%)]" />

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={stat.label}
                            {...stat}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
