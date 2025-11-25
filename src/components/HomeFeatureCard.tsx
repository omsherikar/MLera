"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";

interface HomeFeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  accent?: string;
}

export default function HomeFeatureCard({ title, description, href, icon, accent = "purple" }: HomeFeatureCardProps) {
  const { theme } = useTheme();
  return (
    <div className={`group relative overflow-hidden rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300
      ${theme === 'dark' ? 'bg-[#2A0F4A]/60 border-purple-500/30 hover:border-purple-400/50' : 'bg-white border-purple-200 hover:shadow-lg'}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-transparent" />
      <div className="flex items-start gap-4 relative">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-white group-hover:tracking-wide transition-all">
            {title}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            {description}
          </p>
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-pink-300 group-hover:text-pink-200 transition-colors"
          >
            Explore <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-500/30 blur-2xl group-hover:scale-110 transition-transform" />
    </div>
  );
}
