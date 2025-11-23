"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learning-path", label: "Learning Path" },
  { href: "/challenges", label: "Challenges" },
  { href: "/courses", label: "My Courses" },
  { href: "/achievements", label: "Achievements" },
  { href: "/buddy", label: "Buddy" },
  { href: "/lexicon", label: "Lexicon" },
];

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { theme } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[60px] w-full shadow-sm transition-colors duration-150 ${
      theme === "dark" 
        ? "bg-gradient-to-r from-purple-900 to-purple-800" 
        : "bg-gradient-to-r from-green-100 to-green-50"
    }`}>
      <div className="w-full h-full flex items-center justify-between relative">
        {/* Brand - Leftmost */}
        <Link href="/" className="flex items-center absolute left-0 pl-6">
          <span className="text-4xl font-bold">
            <span className="text-[#FF6B4A]">ML</span>
            <span className={theme === "dark" ? "text-purple-300" : "text-purple-600"}>era</span>
          </span>
        </Link>

        {/* Center Navigation - Centered */}
        <div className="hidden md:flex items-center space-x-6 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 ${
                hoveredLink === link.href
                  ? "text-accent-pink underline"
                  : theme === "dark" 
                    ? "text-white hover:text-accent-pink hover:opacity-80"
                    : "text-gray-700 hover:text-accent-pink hover:opacity-80"
              }`}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side - Rightmost */}
        <div className="flex items-center space-x-4 absolute right-0 pr-6">
          <ThemeToggle />
          <div className="w-10 h-10 rounded-full bg-[#FFB6C1] flex items-center justify-center overflow-hidden relative">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Head - dark skin */}
              <circle cx="16" cy="10" r="5" fill="#8B4513" />
              {/* Body - blue shirt */}
              <rect x="11" y="15" width="10" height="12" rx="1" fill="#4169E1" />
              {/* Beard */}
              <ellipse cx="16" cy="16" rx="4" ry="3" fill="#654321" />
              {/* Face details */}
              <circle cx="14" cy="9" r="0.8" fill="#000" />
              <circle cx="18" cy="9" r="0.8" fill="#000" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}

