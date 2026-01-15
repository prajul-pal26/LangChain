"use client";

import { motion } from "framer-motion";

interface GlowingOrb {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
}

export function GlowingOrbs({ className = "" }: { className?: string }) {
    const orbs: GlowingOrb[] = [
        { id: 1, x: 10, y: 20, size: 300, color: "rgba(99, 102, 241, 0.15)", duration: 20, delay: 0 },
        { id: 2, x: 80, y: 60, size: 250, color: "rgba(244, 114, 182, 0.12)", duration: 25, delay: 2 },
        { id: 3, x: 50, y: 80, size: 200, color: "rgba(6, 182, 212, 0.1)", duration: 18, delay: 1 },
        { id: 4, x: 30, y: 50, size: 180, color: "rgba(139, 92, 246, 0.12)", duration: 22, delay: 3 },
        { id: 5, x: 70, y: 20, size: 220, color: "rgba(251, 146, 60, 0.1)", duration: 24, delay: 1.5 },
    ];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {orbs.map((orb) => (
                <motion.div
                    key={orb.id}
                    className="absolute rounded-full blur-3xl"
                    style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        width: orb.size,
                        height: orb.size,
                        backgroundColor: orb.color,
                        transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -40, 20, 0],
                        scale: [1, 1.2, 0.9, 1],
                        opacity: [0.5, 0.8, 0.4, 0.5],
                    }}
                    transition={{
                        duration: orb.duration,
                        delay: orb.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
