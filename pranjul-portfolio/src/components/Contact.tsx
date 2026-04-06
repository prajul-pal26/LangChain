"use client";
import RevealOnScroll from "./RevealOnScroll";
import SectionBgGrey from "./SectionBgGrey";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pranjul-pal-2666p/" },
  { label: "GitHub", href: "https://github.com/prajul-pal26" },
  { label: "GenerativeEdge", href: "https://www.generativedge.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-36 lg:py-44 overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <SectionBgGrey />
      {/* Warm glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          bottom: "-25%",
          background: "radial-gradient(circle, rgba(184,137,30,0.06) 0%, transparent 65%)",
          filter: "blur(140px)",
        }}
      />

      <div className="mx-auto max-w-[680px] px-8 text-center relative z-10">
        <RevealOnScroll>
          <span className="font-mono text-xs text-gold uppercase tracking-[3px] mb-7 block font-medium">
            Open to opportunities
          </span>
          <h2 className="font-serif text-[clamp(34px,4.5vw,56px)] font-bold leading-[1.1] mb-6">
            Let&apos;s build the{" "}
            <em className="text-gold font-medium">next generation</em> of AI together.
          </h2>
          <p className="text-lg text-t-dim mb-12 leading-relaxed">
            Currently open to AI engineering roles, agentic AI consulting, and collaboration
            on cutting-edge autonomous systems. Let&apos;s talk.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="mailto:pranjulpal04@gmail.com"
              className="bg-t text-bg font-sans text-base font-semibold px-8 py-4 rounded-xl hover:brightness-95 hover:scale-[1.02] transition-all"
            >
              pranjulpal04@gmail.com
            </a>
            <a
              href="tel:+919548136921"
              className="border border-[var(--border-h)] text-t-mid font-sans text-base px-8 py-4 rounded-xl hover:border-gold hover:text-gold transition-all"
            >
              +91 954-813-6921
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.25}>
          <div className="flex justify-center gap-10">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-t-dim hover:text-gold transition-colors duration-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
