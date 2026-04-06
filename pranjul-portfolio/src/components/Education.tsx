"use client";
import { educations } from "@/data/education";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";
import SectionBg from "./SectionBg";

export default function Education() {
  return (
    <section
      id="education"
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
          <SectionHeader label="Education" />
          <h2 className="font-serif text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.15] mb-16 text-[#111111]">
            Strong foundations.{" "}
            <em className="text-[#8B6914] font-medium">Continuous learning.</em>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educations.map((edu, i) => (
            <RevealOnScroll key={i} delay={i * 0.12}>
              <div
                className="rounded-2xl p-10 hover:-translate-y-1 transition-all duration-300 h-full"
                style={{
                  background: "#FFE0B5",
                  border: "1px solid rgba(17,17,17,0.12)",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-sm text-[#8B6914] font-medium">{edu.date}</span>
                  {edu.current && (
                    <span
                      className="font-mono text-[11px] uppercase text-[#8B6914] px-2.5 py-1 rounded-md"
                      style={{
                        background: "rgba(139,105,20,0.10)",
                        border: "1px solid rgba(139,105,20,0.22)",
                      }}
                    >
                      Currently Pursuing
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2 text-[#111111]">{edu.degree}</h3>
                <p className="text-base text-[#666666]">{edu.institution}</p>
                {edu.note && (
                  <p className="font-serif text-base italic text-[#8B6914] mt-4">{edu.note}</p>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
