"use client";

import { motion } from "framer-motion";
import { AnimatedDots } from "@/components/ui/animated-dots";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { GridPattern } from "@/components/ui/grid-pattern";

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group p-6 rounded-2xl bg-[#0c0c12]/80 border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:bg-[#0e0e16]/90 hover:border-white/20 text-center"
        >
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h4 className="text-lg font-semibold text-white mb-2 font-['Outfit']">
                {title}
            </h4>
            <p className="text-white/40 text-sm">
                {description}
            </p>
        </motion.div>
    );
}

export function Features() {
    const features = [
        { icon: "🦜", title: "LangChain", description: "Building LLM-powered applications" },
        { icon: "🔍", title: "RAG", description: "Retrieval Augmented Generation" },
        { icon: "🤖", title: "AI Agents", description: "Autonomous task execution" },
        { icon: "🌐", title: "LangGraph", description: "Stateful AI workflows" },
        { icon: "🔬", title: "LangSmith", description: "LLM observability & tracing" },
        { icon: "⚡", title: "FastAPI", description: "High-performance Python APIs" },
        { icon: "☁️", title: "AWS", description: "Cloud infrastructure & services" },
        { icon: "🗄️", title: "Redis", description: "Fast caching & memory" },
    ];

    return (
        <section id="features" className="relative py-24 bg-gradient-to-b from-[#101018] via-[#0e0e14] to-[#0c0c10]">
            {/* Layered animated backgrounds */}
            <GridPattern />
            <AnimatedDots speed={0.3} />
            <FloatingParticles count={25} />

            {/* Subtle mesh gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.05)_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.05)_0%,_transparent_50%)]" />

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Outfit']">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                            Technologies
                        </span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Building AI solutions with modern tools and frameworks
                    </p>
                </motion.div>

                {/* Features grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            {...feature}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
