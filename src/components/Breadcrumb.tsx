"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full pt-[60px] transition-colors duration-150 ${
      theme === "dark" ? "bg-[#1A0533]" : "bg-white"
    }`}>
      <div className="w-full px-6 py-2">
        <nav className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && (
                <ChevronRight className={`w-4 h-4 ${
                  theme === "dark" ? "text-[#A66BFF]" : "text-purple-600"
                }`} />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    theme === "dark" 
                      ? "text-[#A66BFF] hover:text-[#B88AFF]" 
                      : "text-purple-600 hover:text-purple-700"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={theme === "dark" ? "text-[#A66BFF]" : "text-purple-600"}>
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

