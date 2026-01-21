"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, ArrowRight, Check } from "lucide-react";
import { FloatingParticles } from "@/components/ui/floating-particles";

export function NewsletterCTA() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setTimeout(() => {
                setEmail("");
                setIsSubmitted(false);
            }, 3000);
        }
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e14] via-[#0c0c10] to-[#0a0a0e]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08)_0%,_transparent_60%)]" />
            <FloatingParticles count={15} />

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6"
                    >
                        <Mail className="w-8 h-8 text-indigo-400" />
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Outfit']">
                        Get Weekly AI Engineering Insights
                    </h2>

                    {/* Subtitle */}
                    <p className="text-white/50 text-lg mb-8">
                        Join 500+ engineers receiving production-ready AI tips, case studies,
                        and lessons learned every week.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <div className="relative flex-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-300"
                                required
                            />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={isSubmitted}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-70"
                        >
                            {isSubmitted ? (
                                <>
                                    <Check className="w-5 h-5" />
                                    Subscribed!
                                </>
                            ) : (
                                <>
                                    Subscribe
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Trust signals */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-6 mt-8 text-white/30 text-sm"
                    >
                        <span className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4" />
                            No spam, ever
                        </span>
                        <span>•</span>
                        <span>Unsubscribe anytime</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
