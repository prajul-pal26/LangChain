"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle, Mail, Sparkles, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { config } from "@/config/site";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: "phone" | "email";
    value: string;
}

export function ContactModal({ isOpen, onClose, type, value }: ContactModalProps) {
    const [copied, setCopied] = useState(false);

    const isPhone = type === "phone";
    const Icon = isPhone ? Phone : Mail;
    const title = isPhone ? "Let's Connect!" : "Drop Me a Line!";
    const message = isPhone
        ? "I'm always excited to hear about new opportunities, collaborations, or just to connect with fellow developers. Feel free to reach out!"
        : "Have a project idea, collaboration opportunity, or just want to say hi? I'd love to hear from you. Drop me an email anytime!";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-md">
                            {/* Glow effect */}
                            <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-50 animate-pulse ${isPhone
                                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                : "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"
                                }`} />

                            {/* Card */}
                            <div className="relative bg-gradient-to-b from-[#0a0a0f] to-[#050508] border border-white/10 rounded-3xl p-8 shadow-2xl">
                                {/* Close button */}
                                <motion.button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>

                                {/* Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="flex justify-center mb-6"
                                >
                                    <div className="relative">
                                        <div className={`absolute inset-0 rounded-full blur-xl opacity-60 ${isPhone
                                            ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                                            : "bg-gradient-to-r from-cyan-500 to-blue-500"
                                            }`} />
                                        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center ${isPhone
                                            ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                                            : "bg-gradient-to-r from-cyan-500 to-blue-500"
                                            }`}>
                                            <Icon className="w-10 h-10 text-white" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Title */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl md:text-3xl font-bold text-center text-white mb-4 font-['Outfit']"
                                >
                                    {title}
                                    <Sparkles className="inline-block w-6 h-6 ml-2 text-yellow-400" />
                                </motion.h2>

                                {/* Message */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-white/60 text-center mb-8 leading-relaxed"
                                >
                                    {message}
                                </motion.p>

                                {/* Value Display */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
                                >
                                    <p className="text-white/40 text-sm text-center mb-2">
                                        {isPhone ? "Call or WhatsApp" : "Email Address"}
                                    </p>
                                    <div className="flex items-center justify-center gap-3">
                                        <p className={`text-xl md:text-2xl font-bold text-center bg-clip-text text-transparent ${isPhone
                                            ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                                            : "bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400"
                                            }`}>
                                            {value}
                                        </p>
                                        <motion.button
                                            onClick={handleCopy}
                                            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            title="Copy to clipboard"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                        </motion.button>
                                    </div>
                                    {copied && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-green-400 text-xs text-center mt-2"
                                        >
                                            Copied to clipboard!
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Action Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex flex-col sm:flex-row gap-3"
                                >
                                    {isPhone ? (
                                        <>
                                            <motion.a
                                                href={`tel:${value.replace(/[-\s]/g, '')}`}
                                                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Phone className="w-4 h-4" />
                                                Call Now
                                            </motion.a>
                                            <motion.a
                                                href={`https://wa.me/${config.whatsapp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 py-3 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-center flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                WhatsApp
                                            </motion.a>
                                        </>
                                    ) : (
                                        <>
                                            <motion.a
                                                href={`mailto:${value}`}
                                                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Mail className="w-4 h-4" />
                                                Open Email Client
                                            </motion.a>
                                            <motion.a
                                                href={`https://mail.google.com/mail/?view=cm&to=${value}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 py-3 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-center flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Gmail
                                            </motion.a>
                                        </>
                                    )}
                                </motion.div>

                                {/* Alternative */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-white/30 text-sm text-center mt-6 flex items-center justify-center gap-2"
                                >
                                    {isPhone ? (
                                        <>
                                            <Mail className="w-4 h-4" />
                                            Or email me at {config.email}
                                        </>
                                    ) : (
                                        <>
                                            <Phone className="w-4 h-4" />
                                            Or call me at {config.phone}
                                        </>
                                    )}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Backward compatible exports
export function PhoneModal({ isOpen, onClose, phoneNumber }: { isOpen: boolean; onClose: () => void; phoneNumber: string }) {
    return <ContactModal isOpen={isOpen} onClose={onClose} type="phone" value={phoneNumber} />;
}

export function EmailModal({ isOpen, onClose, email }: { isOpen: boolean; onClose: () => void; email: string }) {
    return <ContactModal isOpen={isOpen} onClose={onClose} type="email" value={email} />;
}
