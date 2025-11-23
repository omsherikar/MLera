"use client";

import { Lightbulb } from "lucide-react";

interface DefinitionBoxProps {
  title: string;
  children: React.ReactNode;
}

export default function DefinitionBox({ title, children }: DefinitionBoxProps) {
  return (
    <div className="rounded-xl p-8 bg-gray-50 dark:bg-[#3A1B5B] border-l-4 border-purple-500 dark:border-purple-500 mt-8 mb-6 relative transition-colors duration-150">
      <Lightbulb className="absolute top-2 left-2 w-6 h-6 text-yellow-500 dark:text-yellow-400" />
      <div>
        <h4 className="text-[#FF6B4A] dark:text-[#FF6B4A] font-bold mb-3 text-lg">{title}</h4>
        <div className="text-light-text/80 dark:text-white leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

