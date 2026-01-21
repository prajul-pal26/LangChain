"use client";

import { motion } from "framer-motion";
import { Bot, Search, Rocket, FileEdit } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedDots } from "@/components/ui/animated-dots";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { GlowingOrbs } from "@/components/ui/glowing-orbs";

export function LaunchSection() {
    return (
        <section id="launch" className="relative py-24 bg-gradient-to-b from-[#0c0c10] via-[#0a0a0e] to-[#08080c] overflow-hidden">
            {/* Layered animated backgrounds */}
            <GlowingOrbs />
            <AnimatedDots speed={0.6} />
            <FloatingParticles count={30} />

            {/* Central glow effect */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08)_0%,_transparent_60%)]" />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(244,114,182,0.1) 40%, transparent 70%)",
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Outfit']">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                            Launch a Project
                        </span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Click below to explore the available projects
                    </p>
                </motion.div>

                {/* Launch buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-6"
                >
                    <motion.button
                        onClick={(e) => e.preventDefault()}
                        className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.5)]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center gap-3">
                            <Bot className="w-6 h-6" />
                            Launch Chatbot
                            <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </motion.button>

                    <motion.button
                        onClick={(e) => e.preventDefault()}
                        className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.5)]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center gap-3">
                            <Search className="w-6 h-6" />
                            Launch RAG
                            <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </motion.button>

                    <Link to="/blog-generator">
                        <motion.div
                            className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.5)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center gap-3">
                                <FileEdit className="w-6 h-6" />
                                Launch Blog Generator
                                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
