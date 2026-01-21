"use client";

import { motion } from "framer-motion";
import { categories as allCategories } from "@/data/blogs";

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <section className="py-8">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide"
                >
                    {allCategories.map((category, index) => (
                        <motion.button
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => onCategoryChange(category.id)}
                            className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${selectedCategory === category.id
                                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25"
                                : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <span className="mr-1.5">{category.icon}</span>
                            {category.name}
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
