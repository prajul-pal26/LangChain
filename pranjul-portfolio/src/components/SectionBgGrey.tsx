export default function SectionBgGrey() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Scattered Memphis-style geometric shapes — grey/dark tones */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        {/* Large circle — top left */}
        <circle cx="180" cy="140" r="85" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
        <circle cx="180" cy="140" r="55" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />

        {/* Small filled circle — top right */}
        <circle cx="1300" cy="70" r="10" fill="rgba(255,255,255,0.08)" />
        <circle cx="1340" cy="50" r="5" fill="rgba(240,192,90,0.10)" />

        {/* Triangle — mid right */}
        <polygon points="1300,420 1350,340 1400,420" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />

        {/* Squiggle line — top center-right */}
        <path
          d="M800,60 Q830,25 860,60 Q890,95 920,60 Q950,25 980,60"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="2"
        />

        {/* Cross/plus — left side */}
        <line x1="100" y1="490" x2="100" y2="550" stroke="rgba(240,192,90,0.12)" strokeWidth="2.5" />
        <line x1="70" y1="520" x2="130" y2="520" stroke="rgba(240,192,90,0.12)" strokeWidth="2.5" />

        {/* Dots cluster — bottom right */}
        <circle cx="1200" cy="760" r="5" fill="rgba(255,255,255,0.10)" />
        <circle cx="1225" cy="785" r="5" fill="rgba(255,255,255,0.07)" />
        <circle cx="1250" cy="760" r="5" fill="rgba(255,255,255,0.10)" />
        <circle cx="1175" cy="785" r="3.5" fill="rgba(240,192,90,0.08)" />

        {/* Large ring — bottom left */}
        <circle cx="300" cy="800" r="70" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeDasharray="8 10" />

        {/* Small square — mid left */}
        <rect x="60" y="300" width="40" height="40" rx="4" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2" transform="rotate(-15 80 320)" />

        {/* Diamond — center area */}
        <rect x="750" y="400" width="25" height="25" rx="3" fill="none" stroke="rgba(240,192,90,0.08)" strokeWidth="1.5" transform="rotate(45 762 412)" />

        {/* Squiggle — bottom center */}
        <path
          d="M550,830 Q585,795 620,830 Q655,865 690,830"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />

        {/* Small cross — mid area */}
        <line x1="1000" y1="250" x2="1000" y2="285" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
        <line x1="982" y1="267" x2="1018" y2="267" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />

        {/* Half circle — right */}
        <path d="M1440,400 A50,50 0 0,0 1440,500" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" />

        {/* Zigzag — top area */}
        <polyline
          points="300,100 325,75 350,100 375,75 400,100 425,75"
          fill="none"
          stroke="rgba(240,192,90,0.08)"
          strokeWidth="1.5"
        />

        {/* Extra — small filled triangle bottom area */}
        <polygon points="400,820 420,790 440,820" fill="rgba(255,255,255,0.06)" />

        {/* Extra — ring mid-right */}
        <circle cx="1380" cy="650" r="25" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      </svg>

      {/* Subtle cool glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(100,100,140,0.04), transparent 50%)",
        }}
      />
    </div>
  );
}
