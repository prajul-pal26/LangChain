"use client";

import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    Settings,
    BarChart3,
    ChevronLeft,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const sidebarLinks = [
    { name: "Dashboard", href: "/blog-generator", icon: LayoutDashboard, end: true },
    { name: "All Blogs", href: "/blog-generator/blogs", icon: FileText },
    { name: "Create New", href: "/blog-generator/blogs/new", icon: PlusCircle },
    { name: "Analytics", href: "/blog-generator/analytics", icon: BarChart3, disabled: true },
    { name: "Settings", href: "/blog-generator/settings", icon: Settings, disabled: true },
];

export function AdminLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#030303] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0a0a0e] border-r border-white/[0.05] flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-white/[0.05]">
                    <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm">Back to Site</span>
                    </Link>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold font-['Outfit']">Blog Admin</h1>
                            <p className="text-white/40 text-xs">Content Platform</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;

                        if (link.disabled) {
                            return (
                                <div
                                    key={link.name}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/20 cursor-not-allowed"
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{link.name}</span>
                                    <span className="ml-auto text-xs bg-white/5 px-2 py-0.5 rounded">Soon</span>
                                </div>
                            );
                        }

                        return (
                            <NavLink
                                key={link.name}
                                to={link.href}
                                end={link.end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                        ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{link.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/[0.05]">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                        <p className="text-white/60 text-xs mb-2">AI-Powered</p>
                        <p className="text-white text-sm font-medium">Generate blogs with LangGraph</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
}
