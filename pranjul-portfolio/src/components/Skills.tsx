"use client";
import RevealOnScroll from "./RevealOnScroll";
import SectionBgGrey from "./SectionBgGrey";
import TechFinder from "./TechFinder";

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 lg:py-36" style={{ background: "var(--color-bg)" }}>
      <SectionBgGrey />
      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-12">
        <RevealOnScroll>
          <h2 className="font-serif text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.15] mb-4 text-center">
            Tech <em className="text-gold font-medium">Finder</em>
          </h2>
          <p className="text-center text-t-mid text-base mb-12 max-w-2xl mx-auto">
            My personal tech map — grouped by role, with honest notes from real production use. Select any two to compare.
          </p>
        </RevealOnScroll>

        <TechFinder />
      </div>
    </section>
  );
}
