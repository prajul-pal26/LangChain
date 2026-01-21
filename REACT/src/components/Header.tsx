"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PhoneModal, EmailModal } from "@/components/ui/phone-modal";
import { siteConfig } from "@/config/site";
import { Divider } from "@/components/Divider";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    const { name, phone, email, github, linkedin } = siteConfig;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const navLinks = [
        { name: "Home", href: isHomePage ? "#hero" : "/", isRoute: !isHomePage },
        { name: "Projects", href: isHomePage ? "#projects" : "/#projects", isRoute: !isHomePage },
        { name: "Technologies", href: isHomePage ? "#features" : "/#features", isRoute: !isHomePage },
        { name: "Blogs", href: "/blogs", isRoute: true },
        { name: "Admin", href: "/blog-generator", isRoute: true },
        { name: "Launch", href: isHomePage ? "#launch" : "/#launch", isRoute: !isHomePage },
    ];

    const handlePhoneClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPhoneModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const handleEmailClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEmailModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.05]"
                        : "bg-transparent"
                )}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/">
                            <motion.div
                                className="flex items-center gap-2 text-white font-bold text-xl font-['Outfit']"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                                {name.split(' ')[0]}
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                link.isRoute ? (
                                    <Link key={link.name} to={link.href}>
                                        <motion.span
                                            className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium"
                                            whileHover={{ y: -2 }}
                                        >
                                            {link.name}
                                        </motion.span>
                                    </Link>
                                ) : (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-medium"
                                        whileHover={{ y: -2 }}
                                    >
                                        {link.name}
                                    </motion.a>
                                )
                            ))}
                        </nav>

                        {/* Desktop Right Section */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Social Icons */}
                            <div className="flex items-center gap-2">
                                <motion.a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    title="GitHub"
                                >
                                    <Github className="w-4 h-4" />
                                </motion.a>
                                <motion.a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    title="LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </motion.a>
                                <motion.button
                                    onClick={handleEmailClick}
                                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    title="Email"
                                >
                                    <Mail className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    onClick={handlePhoneClick}
                                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    title="Phone"
                                >
                                    <Phone className="w-4 h-4" />
                                </motion.button>
                            </div>

                            {/* CTA Button */}
                            <motion.a
                                href="#projects"
                                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Started
                            </motion.a>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[#030303]/95 backdrop-blur-xl border-t border-white/[0.05]"
                        >
                            <div className="container mx-auto px-4 py-6">
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        link.isRoute ? (
                                            <Link
                                                key={link.name}
                                                to={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium py-2"
                                            >
                                                {link.name}
                                            </Link>
                                        ) : (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium py-2"
                                            >
                                                {link.name}
                                            </a>
                                        )
                                    ))}
                                </nav>

                                {/* Contact Info for Mobile */}
                                <div className="mt-6 pt-6 border-t border-white/[0.05] space-y-3">
                                    <button
                                        onClick={handleEmailClick}
                                        className="flex items-center gap-3 text-white/60 hover:text-white transition-colors w-full text-left"
                                    >
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm">{email}</span>
                                    </button>
                                    <button
                                        onClick={handlePhoneClick}
                                        className="flex items-center gap-3 text-white/60 hover:text-white transition-colors w-full text-left"
                                    >
                                        <Phone className="w-4 h-4" />
                                        <span className="text-sm">{phone}</span>
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/[0.05]">
                                    <a
                                        href={github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <button
                                        onClick={handleEmailClick}
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white"
                                    >
                                        <Mail className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handlePhoneClick}
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white"
                                    >
                                        <Phone className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0">
                    <Divider />
                </div>
            </motion.header>

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
