"use client";

import { useEffect, useRef, useState } from "react";

interface MathCardProps {
  equation: string;
  className?: string;
}

declare global {
  interface Window {
    katex?: any;
  }
}

export default function MathCard({ equation, className = "" }: MathCardProps) {
  const mathRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined" || !mathRef.current) return;

    let attempts = 0;
    const maxAttempts = 50;

    const renderMath = () => {
      if (window.katex && mathRef.current) {
        try {
          window.katex.render(equation, mathRef.current, {
            displayMode: true,
            throwOnError: false,
          });
        } catch (error) {
          console.error("KaTeX error:", error);
        }
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(renderMath, 100);
        }
      }
    };

    const timer = setTimeout(renderMath, 100);

    const handleKaTeXLoaded = () => renderMath();
    window.addEventListener('katex-loaded', handleKaTeXLoaded);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('katex-loaded', handleKaTeXLoaded);
    };
  }, [equation, mounted]);

  if (!mounted) {
    return (
      <div className={`rounded-xl p-8 bg-gray-50 dark:bg-[#3A1B5B] border-l-4 border-[#FF8B6B] text-center transition-colors duration-150 ${className}`}>
        <div className="text-lg min-h-[60px]" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl p-8 bg-gray-50 dark:bg-[#3A1B5B] border-l-4 border-[#FF8B6B] text-center transition-colors duration-150 ${className}`}
    >
      <div
        ref={mathRef}
        className="text-lg"
        suppressHydrationWarning
      />
    </div>
  );
}

