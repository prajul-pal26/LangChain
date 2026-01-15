"use client";

import { motion } from "framer-motion";

interface WaveLinesProps {
    className?: string;
    lineCount?: number;
}

export function WaveLines({ className = "", lineCount = 5 }: WaveLinesProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {Array.from({ length: lineCount }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute left-0 right-0 h-[1px]"
                    style={{
                        top: `${20 + i * 15}%`,
                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.1 + i * 0.02}), transparent)`,
                    }}
                    animate={{
                        scaleX: [0.3, 1, 0.3],
                        opacity: [0.2, 0.5, 0.2],
                        x: ["-20%", "20%", "-20%"],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                    }}
                />
            ))}

            {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 w-[1px]"
                    style={{
                        left: `${30 + i * 20}%`,
                        background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)`,
                    }}
                    animate={{
                        scaleY: [0.5, 1, 0.5],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 10 + i * 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 1.5,
                    }}
                />
            ))}
        </div>
    );
}
