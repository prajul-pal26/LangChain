"use client";

import { motion } from "framer-motion";
import { Bot, Search, ExternalLink, FileEdit } from "lucide-react";
import { AnimatedDots } from "@/components/ui/animated-dots";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { GlowingOrbs } from "@/components/ui/glowing-orbs";

interface ProjectCardProps {
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    description: string;
    tags: { name: string; variant: "primary" | "secondary" }[];
    status: string;
    link: string;
    delay: number;
}

function ProjectCard({ icon, iconBg, title, description, tags, status, link, delay }: ProjectCardProps) {
    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative block p-8 rounded-3xl bg-[#0e0e14]/80 border border-white/[0.08] backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
        >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    {icon}
                </div>

                {/* Title with external link */}
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-2xl font-bold text-white font-['Outfit']">{title}</h3>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                </div>

                {/* Description */}
                <p className="text-white/50 leading-relaxed mb-6">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                        <span
                            key={tag.name}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium ${tag.variant === "primary"
                                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                                }`}
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-medium">{status}</span>
                </div>
            </div>
        </motion.a>
    );
}

export function Projects() {
    const projects = [
        {
            icon: <Bot className="w-8 h-8 text-indigo-400" />,
            iconBg: "bg-gradient-to-br from-indigo-500/20 to-indigo-500/5",
            title: "AI Chatbot",
            description: "An intelligent conversational AI assistant built with LangChain and Streamlit. Features beautiful UI, real-time responses, and memory persistence.",
            tags: [
                { name: "LangChain", variant: "primary" as const },
                { name: "Streamlit", variant: "secondary" as const },
                { name: "Python", variant: "primary" as const },
            ],
            status: "Live & Running",
            link: "#projects",
        },
        {
            icon: <Search className="w-8 h-8 text-cyan-400" />,
            iconBg: "bg-gradient-to-br from-cyan-500/20 to-cyan-500/5",
            title: "RAG Document Assistant",
            description: "Upload any document (PDF/TXT) and chat with it. Uses RAG technology to provide context-aware answers based on your data.",
            tags: [
                { name: "RAG", variant: "primary" as const },
                { name: "Vector DB", variant: "secondary" as const },
                { name: "Embeddings", variant: "primary" as const },
            ],
            status: "Live & Running",
            link: "#projects",
        },
        {
            icon: <FileEdit className="w-8 h-8 text-emerald-400" />,
            iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5",
            title: "Blog Generator",
            description: "AI-powered SEO blog generator using LangGraph workflows. Researches keywords, generates content, evaluates quality, and optimizes for search rankings.",
            tags: [
                { name: "LangGraph", variant: "primary" as const },
                { name: "LangSmith", variant: "secondary" as const },
                { name: "SEO", variant: "primary" as const },
            ],
            status: "Live & Running",
            link: "/blog-generator",
        },
    ];

    return (
        <section id="projects" className="relative py-24 bg-gradient-to-b from-[#0c0c12] via-[#0e0e16] to-[#101018]">
            {/* Layered animated backgrounds */}
            <GlowingOrbs />
            <AnimatedDots />
            <FloatingParticles count={15} />

            {/* Background gradient accents */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.04)_0%,_transparent_60%)]" />

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
                            Applications
                        </span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Hands-on AI projects that solve real problems and demonstrate practical applications
                    </p>
                </motion.div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            {...project}
                            delay={index * 0.15}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
