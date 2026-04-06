"use client";
import { experiences } from "@/data/experience";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";
import SectionBgGrey from "./SectionBgGrey";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 lg:py-36" style={{ background: "var(--color-bg)" }}>
      <SectionBgGrey />
      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-12">
        <RevealOnScroll>
          <SectionHeader label="Experience" />
          <h2 className="font-serif text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.15] mb-4">
            Three roles. <em className="text-gold font-medium">One trajectory:</em> always
            closer to the edge of AI.
          </h2>
          <p className="text-lg text-t-mid max-w-3xl mb-16">
            Every role was a deliberate step — from full-stack foundations to production ML to
            building the autonomous agents reshaping enterprise software.
          </p>
        </RevealOnScroll>

        <div className="space-y-2">
          {experiences.map((exp, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-14 py-12 group hover:pl-3 transition-all duration-300">
                {/* Date */}
                <div>
                  <span className="font-mono text-sm text-gold font-medium">{exp.date}</span>
                  {exp.current && (
                    <span
                      className="ml-3 font-mono text-[11px] uppercase text-gold px-2.5 py-1 rounded-md"
                      style={{
                        background: "var(--gold-pale)",
                        border: "1px solid var(--gold-border)",
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-2">{exp.role}</h3>
                  <p className="text-base text-t-dim mb-5">
                    <strong className="text-t-mid font-medium">{exp.company}</strong> ·{" "}
                    {exp.location}
                  </p>
                  <ul className="space-y-3">
                    {exp.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="text-base text-t-mid leading-relaxed flex gap-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
