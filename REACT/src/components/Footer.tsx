"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import { WaveLines } from "@/components/ui/wave-lines";
import { FloatingParticles } from "@/components/ui/floating-particles";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-1 bg-gradient-to-b from-[#060608] to-[#030305] border-t border-white/[0.08] overflow-hidden">
            {/* Animated background */}
            <WaveLines lineCount={3} />
            <FloatingParticles count={10} />

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-8"
                >
                    {/* Social links */}
                    <div className="flex items-center gap-4">
                        <motion.a
                            href="https://github.com/prajul-pal26"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Github className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/in/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Linkedin className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                            href="https://twitter.com/yourhandle"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Twitter className="w-5 h-5" />
                        </motion.a>
                    </div>

                    {/* Copyright */}
                    <p className="text-white/30 text-sm flex items-center gap-2">
                        Built with{" "}
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart className="w-4 h-4 text-rose-500" />
                        </motion.span>{" "}
                        using React & LangChain | © {currentYear} Pranjul
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
