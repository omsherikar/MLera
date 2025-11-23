"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionCardProps {
  number: number;
  title: string;
  children: ReactNode;
}

export default function SectionCard({
  number,
  title,
  children,
}: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="max-w-[1200px] mx-auto px-6 mb-12"
    >
      <div className="rounded-2xl p-6 bg-white dark:bg-dark-card shadow-sm relative overflow-hidden transition-colors duration-150">
        <div className="flex items-start space-x-4 mb-4 mt-2">
          <div className="w-8 h-8 rounded-full bg-[#FF8B6B] dark:bg-[#FF8B6B] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">{number}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#FF8B6B] dark:text-[#FF8B6B]">
            {title}
          </h2>
        </div>
        {/* Separator line below title - extends below number */}
        <div className="mb-4">
          <hr className="border-t border-purple-200 dark:border-[#4A2B6B] border-[1px]" />
        </div>
        <div className="text-light-text/80 dark:text-white space-y-4 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

