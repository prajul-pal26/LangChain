export default function SectionBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(184,137,30,0.12) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Scattered Memphis-style geometric shapes */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        {/* Large circle — top right */}
        <circle cx="1250" cy="120" r="80" fill="none" stroke="rgba(184,137,30,0.20)" strokeWidth="2" />
        <circle cx="1250" cy="120" r="50" fill="none" stroke="rgba(184,137,30,0.14)" strokeWidth="1.5" />

        {/* Small filled circle — top left */}
        <circle cx="120" cy="80" r="10" fill="rgba(184,137,30,0.14)" />
        <circle cx="165" cy="55" r="5" fill="rgba(28,28,28,0.08)" />

        {/* Triangle — mid left */}
        <polygon points="80,400 130,320 180,400" fill="none" stroke="rgba(184,137,30,0.18)" strokeWidth="2" />

        {/* Squiggle line — top center */}
        <path
          d="M500,50 Q530,15 560,50 Q590,85 620,50 Q650,15 680,50"
          fill="none"
          stroke="rgba(184,137,30,0.16)"
          strokeWidth="2"
        />

        {/* Cross/plus — right side */}
        <line x1="1320" y1="490" x2="1320" y2="550" stroke="rgba(28,28,28,0.10)" strokeWidth="2.5" />
        <line x1="1290" y1="520" x2="1350" y2="520" stroke="rgba(28,28,28,0.10)" strokeWidth="2.5" />

        {/* Dots cluster — bottom left */}
        <circle cx="200" cy="750" r="5" fill="rgba(184,137,30,0.16)" />
        <circle cx="225" cy="775" r="5" fill="rgba(184,137,30,0.12)" />
        <circle cx="250" cy="750" r="5" fill="rgba(184,137,30,0.16)" />
        <circle cx="175" cy="775" r="3.5" fill="rgba(28,28,28,0.07)" />

        {/* Large ring — bottom right */}
        <circle cx="1100" cy="780" r="70" fill="none" stroke="rgba(28,28,28,0.08)" strokeWidth="1.5" strokeDasharray="8 10" />

        {/* Small square — mid right */}
        <rect x="1340" y="290" width="40" height="40" rx="4" fill="none" stroke="rgba(184,137,30,0.16)" strokeWidth="2" transform="rotate(15 1360 310)" />

        {/* Diamond — center area */}
        <rect x="695" y="195" width="25" height="25" rx="3" fill="none" stroke="rgba(28,28,28,0.08)" strokeWidth="1.5" transform="rotate(45 707 207)" />

        {/* Squiggle — bottom */}
        <path
          d="M800,820 Q835,785 870,820 Q905,855 940,820"
          fill="none"
          stroke="rgba(184,137,30,0.14)"
          strokeWidth="2"
        />

        {/* Small cross — top area */}
        <line x1="400" y1="125" x2="400" y2="160" stroke="rgba(184,137,30,0.16)" strokeWidth="2" />
        <line x1="382" y1="142" x2="418" y2="142" stroke="rgba(184,137,30,0.16)" strokeWidth="2" />

        {/* Half circle — left */}
        <path d="M0,610 A50,50 0 0,1 0,510" fill="none" stroke="rgba(184,137,30,0.14)" strokeWidth="1.5" />

        {/* Zigzag — mid bottom */}
        <polyline
          points="500,700 525,675 550,700 575,675 600,700 625,675"
          fill="none"
          stroke="rgba(28,28,28,0.08)"
          strokeWidth="1.5"
        />

        {/* Extra — small filled triangle top-right area */}
        <polygon points="1050,60 1070,30 1090,60" fill="rgba(184,137,30,0.10)" />

        {/* Extra — ring mid-left */}
        <circle cx="60" cy="250" r="25" fill="none" stroke="rgba(184,137,30,0.12)" strokeWidth="1.5" />
      </svg>

      {/* Subtle warm glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(184,137,30,0.05), transparent 50%)",
        }}
      />
    </div>
  );
}
