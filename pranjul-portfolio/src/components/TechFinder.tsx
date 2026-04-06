"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techCategories, type Tech } from "@/data/techstack";
import { TechIcon } from "@/data/techicons";

function TechCard({
  tech,
  isSelected,
  onSelect,
}: {
  tech: Tech;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-2xl p-5 transition-all duration-200 ${
        isSelected ? "ring-2 ring-[var(--color-gold)] shadow-lg scale-[1.02]" : "hover:-translate-y-1"
      }`}
      style={{
        background: "var(--color-bg)",
        border: isSelected ? "1px solid var(--color-gold)" : "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "var(--gold-pale)", border: "1px solid var(--gold-border)" }}
        >
          <TechIcon name={tech.name} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-semibold text-t">{tech.name}</div>
          <div className="font-mono text-[10px] text-t-dim uppercase tracking-wider">{tech.useCase.slice(0, 50)}...</div>
        </div>
        <span
          className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
            tech.level === "Core" ? "text-gold bg-[var(--gold-pale)]" : "text-t-dim"
          }`}
        >
          {tech.level}
        </span>
      </div>
    </button>
  );
}

function DetailPanel({ tech }: { tech: Tech }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div
        className="rounded-2xl p-8 mt-6"
        style={{ background: "var(--color-bg)", border: "1px solid var(--color-gold)" }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--gold-pale)", border: "1px solid var(--gold-border)" }}
          >
            <TechIcon name={tech.name} size={28} />
          </div>
          <div>
            <h3 className="font-mono text-xl font-bold text-t">{tech.name}</h3>
            <span className={`font-mono text-xs uppercase tracking-wider ${tech.level === "Core" ? "text-gold" : "text-t-dim"}`}>
              {tech.level} Skill
            </span>
          </div>
        </div>

        {/* Note */}
        <div className="mb-6">
          <span className="font-mono text-[10px] text-gold uppercase tracking-widest block mb-2">Notes</span>
          <p className="text-t-mid text-sm leading-relaxed">{tech.note}</p>
        </div>

        {/* Use case */}
        <div className="mb-6">
          <span className="font-mono text-[10px] text-gold uppercase tracking-widest block mb-2">Best For</span>
          <p className="text-t text-sm font-medium">{tech.useCase}</p>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <span className="font-mono text-[10px] text-green-500 uppercase tracking-widest block mb-3">Strengths</span>
            {tech.pros.map((p) => (
              <div key={p} className="flex items-start gap-2 mb-2">
                <span className="text-green-500 text-xs mt-0.5 shrink-0">✓</span>
                <span className="text-sm text-t-mid">{p}</span>
              </div>
            ))}
          </div>
          <div>
            <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest block mb-3">Trade-offs</span>
            {tech.cons.map((c) => (
              <div key={c} className="flex items-start gap-2 mb-2">
                <span className="text-red-400 text-xs mt-0.5 shrink-0">✗</span>
                <span className="text-sm text-t-mid">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CompareView({ techs }: { techs: Tech[] }) {
  const [a, b] = techs;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-2xl overflow-hidden mt-6"
      style={{ background: "var(--color-bg)", border: "1px solid var(--color-gold)" }}
    >
      <div className="px-6 py-4 font-mono text-xs uppercase tracking-widest text-gold" style={{ background: "var(--gold-pale)" }}>
        Comparison
      </div>
      <div className="grid grid-cols-2 divide-x divide-[var(--border)]">
        {[a, b].map((tech) => (
          <div key={tech.name} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TechIcon name={tech.name} size={20} />
              <span className="font-mono text-sm font-bold text-t">{tech.name}</span>
            </div>
            <div className="mb-4">
              <span className="font-mono text-[10px] text-t-dim uppercase block mb-1">Best for</span>
              <span className="text-xs text-t-mid">{tech.useCase}</span>
            </div>
            <div className="mb-4">
              <span className="font-mono text-[10px] text-green-500 uppercase block mb-2">Pros</span>
              {tech.pros.map((p) => (
                <div key={p} className="flex items-start gap-2 mb-1.5">
                  <span className="text-green-500 text-xs mt-0.5">✓</span>
                  <span className="text-xs text-t-mid">{p}</span>
                </div>
              ))}
            </div>
            <div>
              <span className="font-mono text-[10px] text-red-400 uppercase block mb-2">Trade-offs</span>
              {tech.cons.map((c) => (
                <div key={c} className="flex items-start gap-2 mb-1.5">
                  <span className="text-red-400 text-xs mt-0.5">✗</span>
                  <span className="text-xs text-t-mid">{c}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function TechFinder() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const category = techCategories[activeCategory];

  function toggleSelect(name: string) {
    setSelected((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      if (prev.length >= 2) return [prev[1], name];
      return [...prev, name];
    });
  }

  function handleCategoryChange(i: number) {
    setActiveCategory(i);
    setSelected([]);
  }

  const selectedTechs = category.techs.filter((t) => selected.includes(t.name));
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected.length > 0 && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 350);
    }
  }, [selected]);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {techCategories.map((cat, i) => (
          <button
            key={cat.title}
            onClick={() => handleCategoryChange(i)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
              activeCategory === i
                ? "bg-gold text-bg font-semibold shadow-md"
                : "text-t-mid hover:text-t"
            }`}
            style={
              activeCategory !== i
                ? { background: "var(--color-bg)", border: "1px solid var(--border)" }
                : undefined
            }
          >
            <span>{cat.icon}</span>
            {cat.title}
          </button>
        ))}
      </div>

      {/* Description + hint */}
      <p className="text-t-mid text-sm mb-2 max-w-2xl">{category.description}</p>
      <p className="text-t-dim font-mono text-[11px] mb-6 uppercase tracking-wider">
        {selected.length === 0
          ? "↓ Tap a tech to see details · Select 2 to compare"
          : selected.length === 1
          ? "↓ Details below · Select one more to compare"
          : "↓ Comparison below"}
      </p>

      {/* Tech grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {category.techs.map((tech) => (
          <TechCard
            key={tech.name}
            tech={tech}
            isSelected={selected.includes(tech.name)}
            onSelect={() => toggleSelect(tech.name)}
          />
        ))}
      </div>

      {/* Detail or Compare panel */}
      <div ref={detailRef} />
      <AnimatePresence mode="wait">
        {selectedTechs.length === 1 && (
          <DetailPanel key={selectedTechs[0].name} tech={selectedTechs[0]} />
        )}
        {selectedTechs.length === 2 && (
          <CompareView key={`${selectedTechs[0].name}-${selectedTechs[1].name}`} techs={selectedTechs} />
        )}
      </AnimatePresence>
    </div>
  );
}
