"use client";

import { motion } from "framer-motion";

export function Divider() {
    return (
        <div className="py-1">
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-[2px] max-w-8xl mx-auto"
            >
                {/* Main gradient line */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

                {/* Secondary glow layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent blur-sm" />

                {/* Center glow effect */}
                <div className="absolute left-1/2 -translate-x-1/2 w-32 h-4 -top-1 bg-gradient-to-r from-indigo-500/20 via-white/30 to-rose-500/20 blur-xl" />
            </motion.div>
        </div>
    );
}
