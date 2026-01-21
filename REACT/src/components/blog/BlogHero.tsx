"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen } from "lucide-react";
import { AnimatedDots } from "@/components/ui/animated-dots";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { GlowingOrbs } from "@/components/ui/glowing-orbs";

export function BlogHero() {
    return (
        <section className="relative pt-32 pb-16 overflow-hidden">
            {/* Layered animated backgrounds */}
            <GlowingOrbs />
            <AnimatedDots speed={0.4} />
            <FloatingParticles count={20} />

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c12] via-[#0a0a0e] to-[#0e0e14]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.1)_0%,_transparent_50%)]" />

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Engineering Stories from the AI Frontier
                    </motion.div>

                    {/* Main headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-['Outfit']">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                            The{" "}
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                            Blog
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-white/50 mb-8 leading-relaxed">
                        Real engineering stories. Production lessons.
                        <br className="hidden md:block" />
                        No tutorials, no marketing—just honest insights.
                    </p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center justify-center gap-8 text-white/40"
                    >
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-indigo-400" />
                            <span className="text-sm">4 Articles</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="text-sm">
                            Topics: <span className="text-white/60">RAG, LangChain, Production AI</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
