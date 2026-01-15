"use client";

import { motion } from "framer-motion";

export function GridPattern({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Animated grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    </pattern>
                    <linearGradient id="fade" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="white" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fade-mask)" />
            </svg>

            {/* Moving highlight on grid */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full bg-gradient-radial from-white/10 to-transparent blur-3xl"
                animate={{
                    x: ["-20%", "120%"],
                    y: ["0%", "100%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
}
