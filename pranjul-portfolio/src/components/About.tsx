"use client";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";
import SectionBg from "./SectionBg";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pranjul-pal-2666p/" },
  { label: "GitHub", href: "https://github.com/prajul-pal26" },
  { label: "Blog", href: "https://www.generativedge.com" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 lg:py-36 skin-section"
      style={{
        background: "var(--color-bg-2)",
        borderTop: "1px solid rgba(17,17,17,0.12)",
        borderBottom: "1px solid rgba(17,17,17,0.12)",
      }}
    >
      <SectionBg />
      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 xl:gap-24">
        {/* Left — sticky */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <RevealOnScroll>
            <SectionHeader label="About" />
            <h2 className="font-serif text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.15] mb-8 text-[#111111]">
              Not just another
              <br />
              AI engineer.
              <br />
              <em className="text-[#8B6914] font-medium">The one who ships.</em>
            </h2>
            <div className="flex flex-col gap-4 mt-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[#111111] font-semibold hover:gap-4 inline-flex items-center gap-2 transition-all group underline decoration-[#8B6914] decoration-2 underline-offset-4"
                >
                  {l.label}{" "}
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* Right — body */}
        <div className="space-y-7">
          <RevealOnScroll>
            <p className="text-[17px] text-[#333333] leading-[1.9]">
              Most AI engineers stop at the notebook. I don&apos;t. I take models from research
              papers to{" "}
              <strong className="text-[#111111] font-semibold">
                production systems that handle real users, real scale, and real business outcomes.
              </strong>
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <blockquote className="border-l-2 border-[#8B6914] pl-8 my-10">
              <p className="font-serif text-2xl italic text-[#111111] leading-relaxed">
                &ldquo;I don&apos;t just use AI tools — I architect the agents that replace
                entire workflows.&rdquo;
              </p>
            </blockquote>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <p className="text-[17px] text-[#333333] leading-[1.9]">
              At <strong className="text-[#111111] font-semibold">DeepVidya.ai</strong>, I&apos;m
              building the next generation of autonomous AI products. My work with{" "}
              <strong className="text-[#111111] font-semibold">OpenClaw</strong> and{" "}
              <strong className="text-[#111111] font-semibold">NemoClaw</strong> focuses on creating
              agents that don&apos;t just respond — they reason, plan, and execute multi-step
              workflows across enterprise systems. Using{" "}
              <strong className="text-[#111111] font-semibold">CrewAI</strong> for multi-agent
              orchestration, I design systems where specialized agents collaborate to solve
              problems no single model could handle alone.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-[17px] text-[#333333] leading-[1.9]">
              Before this, I cut my teeth at{" "}
              <strong className="text-[#111111] font-semibold">OpenCV University</strong> building
              scalable learning platforms, and at{" "}
              <strong className="text-[#111111] font-semibold">CaseDocker</strong> applying NLP to
              legal tech. I&apos;m also pursuing an{" "}
              <strong className="text-[#111111] font-semibold">
                Executive Diploma in ML & AI from IIIT Bangalore
              </strong>{" "}
              with a specialization in Generative AI — because the field moves fast, and I
              intend to stay ahead of it.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
