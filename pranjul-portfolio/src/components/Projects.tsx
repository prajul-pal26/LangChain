"use client";
import { projects } from "@/data/projects";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";
import SectionBg from "./SectionBg";

export default function Projects() {
  const flagship = projects.find((p) => p.flagship);
  const others = projects.filter((p) => !p.flagship);

  return (
    <section
      id="projects"
      className="relative py-28 lg:py-36 skin-section"
      style={{
        background: "var(--color-bg-2)",
        borderTop: "1px solid rgba(17,17,17,0.12)",
        borderBottom: "1px solid rgba(17,17,17,0.12)",
      }}
    >
      <SectionBg />
      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-12">
        <RevealOnScroll>
          <SectionHeader label="Projects" />
          <h2 className="font-serif text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.15] mb-4 text-[#111111]">
            Things I built that <em className="text-[#8B6914] font-medium">actually work.</em>
          </h2>
          <p className="text-lg text-[#333333] mb-16">
            Production systems, not toy demos.
          </p>
        </RevealOnScroll>

        {flagship && (
          <RevealOnScroll>
            <ProjectCard project={flagship} />
          </RevealOnScroll>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {others.map((p, i) => (
            <RevealOnScroll key={i} delay={i * 0.12}>
              <ProjectCard project={p} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div
      className="relative rounded-2xl p-10 group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(26,26,46,0.08)] overflow-hidden cursor-pointer"
      style={{
        background: "#FFE0B5",
        border: "1px solid rgba(17,17,17,0.12)",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B6914] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="flex items-start justify-between mb-6">
        <span
          className="font-mono text-[11px] uppercase text-[#8B6914] px-3.5 py-1.5 rounded-md font-medium"
          style={{
            background: "rgba(139,105,20,0.10)",
            border: "1px solid rgba(139,105,20,0.22)",
          }}
        >
          {project.badge}
        </span>
        <span className="text-[#666666] group-hover:text-[#8B6914] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all text-xl">
          &#8599;
        </span>
      </div>

      <h3 className="font-serif text-2xl font-semibold mb-2 leading-snug text-[#111111]">
        {project.title}
      </h3>
      <p className="text-sm text-[#666666] mb-4">{project.org}</p>
      <p className="text-base text-[#333333] leading-relaxed mb-7">{project.description}</p>

      <div className="flex flex-wrap gap-2.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-[#555555] px-4 py-1.5 rounded-full"
            style={{
              background: "#FFEACC",
              border: "1px solid rgba(17,17,17,0.10)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
