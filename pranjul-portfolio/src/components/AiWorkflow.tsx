"use client";
import { motion } from "framer-motion";

export default function AiWorkflow() {
  const cx = 260;
  const cy = 260;
  const r = 190;

  const nodes = [
    { label: "AI", sub: "Anthropic", angle: 0, type: "claude" },
    { label: "Think", sub: "Reasoning", angle: 90, type: "emoji", icon: "🧠" },
    { label: "Agents", sub: "OpenClaw", angle: 180, type: "openclaw" },
    { label: "Automate", sub: "Workflows", angle: 270, type: "emoji", icon: "⚡" },
  ];

  const positions = nodes.map((node) => {
    const rad = ((node.angle - 90) * Math.PI) / 180;
    return { ...node, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  function arcPath(i: number) {
    // Points along the orbit circle, offset from node edges
    const fromAngle = nodes[i].angle + 18; // start past the node
    const toAngle = nodes[(i + 1) % 4].angle - 18; // end before next node
    const arcR = r + 8; // slightly outside the node centers

    const fromRad = ((fromAngle - 90) * Math.PI) / 180;
    const toRad = ((toAngle - 90) * Math.PI) / 180;

    const fx = cx + arcR * Math.cos(fromRad);
    const fy = cy + arcR * Math.sin(fromRad);
    const tx = cx + arcR * Math.cos(toRad);
    const ty = cy + arcR * Math.sin(toRad);

    // SVG arc: large-arc=0, sweep=1 for clockwise
    return `M${fx},${fy} A${arcR},${arcR} 0 0,1 ${tx},${ty}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
      className="w-full flex justify-center"
    >
      <svg viewBox="0 0 520 520" className="w-full h-auto" style={{ maxWidth: 560 }}>
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--color-gold)" opacity="0.8" />
          </marker>
        </defs>

        {/* Orbit rings */}
        <motion.circle cx={cx} cy={cy} r={r + 35} fill="none" stroke="var(--color-gold)"
          strokeWidth="0.6" strokeDasharray="4 8" strokeOpacity="0.12"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 0.2 }} />
        <motion.circle cx={cx} cy={cy} r={r - 35} fill="none" stroke="var(--color-gold)"
          strokeWidth="0.4" strokeDasharray="2 6" strokeOpacity="0.08"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.4 }} />

        {/* Clockwise arrows */}
        {positions.map((_, i) => (
          <motion.path key={`a${i}`} d={arcPath(i)}
            fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeOpacity="0.4"
            markerEnd="url(#arr)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 + i * 0.18 }}
          />
        ))}

        {/* Center — Agentic System */}
        <motion.g initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <circle cx={cx} cy={cy} r="36" fill="var(--color-bg)" stroke="var(--color-gold)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={cx} y={cy - 5} textAnchor="middle" className="fill-gold font-mono" fontSize="10" fontWeight="700" letterSpacing="1">AGENTIC</text>
          <text x={cx} y={cy + 9} textAnchor="middle" className="fill-t-dim font-mono" fontSize="8" letterSpacing="0.5">SYSTEM</text>
        </motion.g>

        {/* Nodes */}
        {positions.map((node, i) => (
          <motion.g key={node.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 + i * 0.14 }}
          >
            <rect x={node.x - 48} y={node.y - 40} width="96" height="80" rx="18"
              fill="var(--color-bg)" stroke="var(--color-gold)" strokeWidth="1.2" strokeOpacity="0.3" />

            {/* Claude sparkle icon — official Anthropic mark */}
            {node.type === "claude" && (
              <g transform={`translate(${node.x - 14}, ${node.y - 30})`}>
                <svg width="28" height="28" viewBox="0 0 16 16" fill="#D4956B">
                  <path d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212 2.736-.75.096-.324-.302.04-.496.154-.162 1.267-.871z" />
                </svg>
              </g>
            )}

            {/* OpenClaw official icon */}
            {node.type === "openclaw" && (
              <g transform={`translate(${node.x - 12}, ${node.y - 28})`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd"
                    d="M16.877 1.912c.58-.27 1.14-.323 1.616-.037a.317.317 0 01-.326.542c-.227-.136-.547-.153-1.022.068-.352.165-.765.45-1.234.866 2.683 1.17 4.4 3.5 5.148 5.921a6.421 6.421 0 00-.704.184c-.578.016-1.174.204-1.502.735-.338.55-.268 1.276.072 2.069l.005.012.007.014c.523 1.045 1.318 1.91 2.2 2.284-.912 3.274-3.44 6.144-5.972 6.988v2.109h-2.11v-2.11c-1.043.417-2.086.01-2.11 0v2.11h-2.11v-2.11c-2.531-.843-5.061-3.713-5.973-6.987.882-.373 1.678-1.238 2.2-2.284l.007-.014.006-.012c.34-.793.41-1.518.071-2.069-.327-.531-.923-.719-1.503-.735a6.409 6.409 0 00-.704-.183c.749-2.421 2.466-4.751 5.149-5.922-.47-.416-.88-.701-1.234-.866-.474-.221-.794-.204-1.021-.068a.318.318 0 01-.435-.109.317.317 0 01.109-.433c.476-.286 1.036-.233 1.615.037.49.229 1.031.628 1.621 1.182A9.924 9.924 0 0112 2.568c1.199 0 2.284.19 3.256.526.59-.554 1.13-.953 1.62-1.182zM8.835 6.577a1.266 1.266 0 100 2.532 1.266 1.266 0 000-2.532zm6.33 0a1.267 1.267 0 100 2.533 1.267 1.267 0 000-2.533z"
                    fill="#EF0011" />
                  <path d="M.395 13.118c-.966-1.932-.163-3.863 2.41-3.365l.05.01c.084.018.17.038.26.06l.1.027c.084.022.168.048.255.076l.09.027c.528 0 .95.158 1.16.501.212.343.212.87-.105 1.61a5.1 5.1 0 01-.276.489l-.01.017a4.967 4.967 0 01-.62.791l-.019.02c-1.092 1.117-2.496 1.336-3.295-.262z" fill="#EF0011" />
                  <path d="M21.193 9.753c2.574-.5 3.378 1.433 2.411 3.365-.58 1.159-1.476 1.361-2.342.96l-.011-.005a2.419 2.419 0 01-.114-.056l-.019-.01a2.751 2.751 0 01-.115-.067l-.023-.014a2.86 2.86 0 01-.106-.068l-.05-.035c-.55-.388-1.062-1.007-1.44-1.76-.276-.647-.311-1.132-.174-1.472.176-.439.636-.639 1.23-.639l.099-.03c.08-.026.16-.05.238-.072l.117-.03a5.502 5.502 0 01.3-.067z" fill="#EF0011" />
                </svg>
              </g>
            )}

            {/* Emoji icons */}
            {node.type === "emoji" && (
              <text x={node.x} y={node.y - 8} textAnchor="middle" fontSize="26">{node.icon}</text>
            )}

            <text x={node.x} y={node.y + 14} textAnchor="middle" className="fill-t font-mono" fontSize="12" fontWeight="600">
              {node.label}
            </text>
            <text x={node.x} y={node.y + 27} textAnchor="middle" className="fill-t-dim font-mono" fontSize="8">
              {node.sub}
            </text>
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
