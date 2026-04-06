"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionBg from "./SectionBg";

const cards = [
  {
    title: "Tech Stack",
    description: "The tools, frameworks, and platforms I use to build production AI systems — from LangChain to AWS.",
    href: "/skills",
    icon: "⚡",
    tags: ["LangChain", "CrewAI", "OpenClaw", "PyTorch", "FastAPI", "AWS"],
  },
  {
    title: "Projects",
    description: "Real systems I've shipped — autonomous agents, RAG pipelines, and multi-agent orchestration in production.",
    href: "/projects",
    icon: "🚀",
    tags: ["Autonomous Agents", "RAG", "LangGraph", "Multi-Agent"],
  },
];

export default function ExploreCards() {
  return (
    <section
      className="relative py-24 lg:py-32 skin-section"
      style={{
        background: "var(--color-bg-2)",
        borderTop: "1px solid rgba(17,17,17,0.12)",
        borderBottom: "1px solid rgba(17,17,17,0.12)",
      }}
    >
      <SectionBg />
      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.15] text-[#111111] mb-4">
            Explore my <em className="text-[#8B6914] font-medium">work</em>
          </h2>
          <p className="text-lg text-[#333333] max-w-xl mx-auto">
            Dive deeper into what I build and the tools I build with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link href={card.href} className="group block h-full">
                <div
                  className="relative h-full rounded-3xl p-10 lg:p-12 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(26,26,46,0.12)]"
                  style={{
                    background: "#FFE0B5",
                    border: "1px solid rgba(17,17,17,0.10)",
                  }}
                >
                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#8B6914] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Icon */}
                  <div className="text-4xl mb-6">{card.icon}</div>

                  {/* Title + arrow */}
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-serif text-3xl font-bold text-[#111111]">
                      {card.title}
                    </h3>
                    <span className="text-[#666666] text-2xl group-hover:text-[#8B6914] group-hover:translate-x-2 transition-all duration-300">
                      →
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[#333333] text-base leading-relaxed mb-8">
                    {card.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-[#555555] px-3.5 py-1.5 rounded-full"
                        style={{
                          background: "#FFEACC",
                          border: "1px solid rgba(17,17,17,0.08)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
