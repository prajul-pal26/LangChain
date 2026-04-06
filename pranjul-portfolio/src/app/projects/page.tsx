import type { Metadata } from "next";
import Link from "next/link";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects — Pranjul Pal",
  description: "Production AI systems I've built — autonomous agents, RAG pipelines, and multi-agent orchestration.",
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 light-sections">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-100 backdrop-blur-2xl border-b border-[var(--border)]"
        style={{ background: "rgba(46,46,54,0.90)" }}>
        <div className="mx-auto max-w-[1400px] px-8 lg:px-12 h-[72px] flex items-center gap-12">
          <Link href="/" className="font-serif text-2xl tracking-tight shrink-0">
            <span className="text-t">The Generative</span>
            <span className="text-gold"> Edge</span>
          </Link>
          <Link href="/" className="text-sm font-sans text-t-mid hover:text-gold transition-colors">
            Home
          </Link>
          <Link href="/skills" className="text-sm font-sans text-t-mid hover:text-gold transition-colors">
            Tech Stack
          </Link>
        </div>
      </nav>

      <div className="pt-[72px]">
        <Projects />
        <Footer />
      </div>
    </main>
  );
}
