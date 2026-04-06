"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Tech Stack", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Education", href: "#education" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setVisible(y < 80 || y < lastY.current);
        setScrolled(y > 20);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-100 transition-all duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
        background: scrolled ? "rgba(42,42,48,0.90)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-8 lg:px-12 h-[72px] flex items-center gap-12">
        <a href="#" className="font-serif text-2xl tracking-tight shrink-0">
          <span className="text-t">The Generative</span>
          <span className="text-gold"> Edge</span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-sans text-t-mid hover:text-gold transition-colors duration-200"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-sans text-t-mid hover:text-gold transition-colors duration-200"
              >
                {l.label}
              </a>
            )
          )}
        </div>

        <a
          href="#contact"
          className="ml-auto font-mono text-xs bg-t text-bg px-5 py-2.5 rounded-lg font-medium hover:brightness-95 hover:scale-[1.02] transition-all uppercase tracking-wider shrink-0"
        >
          Let&apos;s Connect
        </a>
      </div>
    </nav>
  );
}
