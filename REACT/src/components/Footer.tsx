"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { WaveLines } from "@/components/ui/wave-lines";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { PhoneModal, EmailModal } from "@/components/ui/phone-modal";
import { siteConfig } from "@/config/site";

export function Footer() {
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    const { name, email, phone, github, linkedin } = siteConfig;

    const handlePhoneClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPhoneModalOpen(true);
    };

    const handleEmailClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEmailModalOpen(true);
    };

    return (
        <>
            <footer className="relative py-5 bg-gradient-to-b from-[#060608] to-[#030305] border-t border-white/[0.08] overflow-hidden">
                {/* Animated background */}
                <WaveLines lineCount={3} />
                <FloatingParticles count={10} />

                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Main Footer Content */}
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            {/* Brand Section */}
                            <div className="text-center md:text-left">
                                <h3 className="text-white font-bold text-xl mb-2 font-['Outfit']">{name}</h3>
                                <p className="text-white/40 text-sm">
                                    Building AI-powered solutions with LangChain & Modern Web Technologies
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div className="text-center">
                                <h4 className="text-white/70 font-semibold text-sm uppercase tracking-wider mb-4">Get in Touch</h4>
                                <div className="space-y-2">
                                    <button
                                        onClick={handleEmailClick}
                                        className="flex items-center justify-center md:justify-start gap-2 text-white/50 hover:text-white transition-colors text-sm w-full"
                                    >
                                        <Mail className="w-4 h-4" />
                                        {email}
                                    </button>
                                    <button
                                        onClick={handlePhoneClick}
                                        className="flex items-center justify-center md:justify-start gap-2 text-white/50 hover:text-white transition-colors text-sm w-full"
                                    >
                                        <Phone className="w-4 h-4" />
                                        {phone}
                                    </button>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="text-center md:text-right">
                                <h4 className="text-white/70 font-semibold text-sm uppercase tracking-wider mb-4">Connect</h4>
                                <div className="flex items-center justify-center md:justify-end gap-3">
                                    <motion.a
                                        href={github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        title="GitHub"
                                    >
                                        <Github className="w-5 h-5" />
                                    </motion.a>
                                    <motion.a
                                        href={linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        title="LinkedIn"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </motion.a>
                                    <motion.button
                                        onClick={handleEmailClick}
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        title="Email"
                                    >
                                        <Mail className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        onClick={handlePhoneClick}
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        title="Phone"
                                    >
                                        <Phone className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </footer>

            {/* Modals */}
            <PhoneModal
                isOpen={isPhoneModalOpen}
                onClose={() => setIsPhoneModalOpen(false)}
                phoneNumber={phone}
            />
            <EmailModal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                email={email}
            />
        </>
    );
}
