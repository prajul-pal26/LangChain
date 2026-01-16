"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

export function Hero() {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            {/* Animated background shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.4]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />
                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.4]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.35]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />
                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.35]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />
                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.35]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Main Title */}
                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="pb-4"
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight font-['Outfit'] whitespace-nowrap text-center flex justify-center items-center leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/70 pb-2">
                                The Generative&nbsp;
                            </span>
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-rose-400 to-amber-400",
                                    "drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] pb-2"
                                )}
                            >
                                Edge
                            </span>
                        </h1>
                    </motion.div>

                    {/* Author */}
                    <motion.p
                        custom={1.5}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-xl md:text-2xl font-medium text-white/50 mb-8 font-['Outfit']"
                    >
                        — by <span className="text-white/70">Pranjul</span>
                    </motion.p>

                    {/* Subtitle */}
                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-white/40 mb-10 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
                            Explore my collection of AI-powered projects using{" "}
                            <span className="text-indigo-400">LangChain</span>,{" "}
                            <span className="text-rose-400">RAG</span>, and{" "}
                            <span className="text-amber-400">intelligent chatbots</span>.
                            Solving real-world problems with cutting-edge technology.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.a
                            href="#projects"
                            className="group px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 text-white font-semibold text-lg shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="flex items-center gap-2">
                                Agentic Workflows
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </span>
                        </motion.a>
                        <motion.a
                            href="#features"
                            className="px-8 py-4 rounded-full border border-white/20 text-white/80 font-semibold text-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📚 Learn More
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 text-white/30"
                >
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <ArrowDown className="w-4 h-4" />
                </motion.div>
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </section>
    );
}
