const items = [
  "OpenClaw",
  "NemoClaw",
  "CrewAI",
  "LangGraph",
  "LangChain",
  "PyTorch",
  "FastAPI",
  "RAG Pipelines",
  "Multi-Agent Systems",
  "LLM Fine-Tuning",
  "Docker",
  "AWS",
];

function MarqueeRow() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i}>
          <span className="text-t-dim">{item}</span>
          <span className="text-gold/50 mx-5">/</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div
      className="w-full py-5 overflow-hidden"
      style={{
        background: "var(--color-bg-2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="animate-marquee whitespace-nowrap font-mono text-sm uppercase tracking-[2px]">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </div>
  );
}
