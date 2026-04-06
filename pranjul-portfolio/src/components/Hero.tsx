"use client";
import { motion } from "framer-motion";
import SectionBgGrey from "./SectionBgGrey";
import AiWorkflow from "./AiWorkflow";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] as const },
});

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <SectionBgGrey />

      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 xl:gap-20 items-center z-10">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <motion.div {...fadeUp(0.15)} className="flex items-center gap-3 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse-gold" />
            <span className="font-mono text-xs text-gold uppercase tracking-[3px] font-medium">
              Building the next wave of AI
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.3)}
            className="font-serif text-[clamp(40px,5.2vw,72px)] font-bold leading-[1.08] mb-7"
          >
            I teach machines to{" "}
            <em className="text-gold font-medium not-italic">think,</em> decide, and{" "}
            <em className="text-gold font-medium not-italic">act</em> on their own.
          </motion.h1>

          <motion.p
            {...fadeUp(0.45)}
            className="text-lg text-t-mid leading-relaxed mb-10 max-w-xl"
          >
            AI Engineer at <strong className="text-t font-semibold">DeepVidya.ai</strong> —
            designing autonomous agents with{" "}
            <strong className="text-t font-semibold">OpenClaw</strong>,{" "}
            <strong className="text-t font-semibold">NemoClaw</strong> &{" "}
            <strong className="text-t font-semibold">CrewAI</strong> that execute complex
            enterprise workflows without human intervention.
          </motion.p>

          <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 bg-t text-bg font-sans text-base font-semibold px-8 py-4 rounded-xl hover:brightness-95 hover:scale-[1.02] transition-all"
            >
              See what I&apos;ve built <span aria-hidden className="text-lg">&#8595;</span>
            </a>
            <a
              href="mailto:pranjulpal04@gmail.com"
              className="inline-flex items-center gap-2.5 border border-[var(--border-h)] text-t-mid font-sans text-base px-8 py-4 rounded-xl hover:border-gold hover:text-gold transition-all"
            >
              pranjulpal04@gmail.com
            </a>
          </motion.div>
        </div>

        {/* AI Workflow Diagram */}
        <div className="order-1 lg:order-2">
          <AiWorkflow />
        </div>
      </div>
    </section>
  );
}
