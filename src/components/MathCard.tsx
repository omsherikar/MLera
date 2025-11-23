"use client";

import { useEffect, useRef } from "react";

interface MathCardProps {
  equation: string;
  className?: string;
}

declare global {
  interface Window {
    MathJax?: {
      typesetPromise: (elements: HTMLElement[]) => Promise<void>;
      startup?: {
        promise: Promise<void>;
        ready: () => void;
      };
      typeset: (elements?: HTMLElement[]) => void;
    };
  }
}

export default function MathCard({ equation, className = "" }: MathCardProps) {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mathRef.current) return;

    const renderMath = () => {
      if (window.MathJax && mathRef.current) {
        // Set the content first
        mathRef.current.textContent = `$$${equation}$$`;
        
        // Wait for MathJax to be ready
        const typeset = () => {
          if (window.MathJax && mathRef.current) {
            const mathJax = window.MathJax;
            if (mathJax.typesetPromise) {
              mathJax.typesetPromise([mathRef.current])
                .catch((err) => {
                  console.error("MathJax typeset error:", err);
                  // Fallback
                  if (mathJax.typeset) {
                    mathJax.typeset([mathRef.current!]);
                  }
                });
            } else if (mathJax.typeset) {
              mathJax.typeset([mathRef.current]);
            }
          }
        };

        if (window.MathJax.startup && window.MathJax.startup.promise) {
          window.MathJax.startup.promise.then(typeset).catch((err) => {
            console.error("MathJax startup error:", err);
            typeset(); // Try anyway
          });
        } else {
          typeset();
        }
      } else {
        // Retry after a short delay
        setTimeout(renderMath, 100);
      }
    };

    // Initial render attempt
    renderMath();

    // Listen for MathJax loaded event
    const handleMathJaxLoaded = () => {
      renderMath();
    };
    window.addEventListener('mathjax-loaded', handleMathJaxLoaded);

    return () => {
      window.removeEventListener('mathjax-loaded', handleMathJaxLoaded);
    };
  }, [equation]);

  return (
    <div
      className={`rounded-xl p-8 bg-gray-50 dark:bg-[#3A1B5B] border-l-4 border-[#FF8B6B] text-center transition-colors duration-150 ${className}`}
    >
      <div
        ref={mathRef}
        className="text-lg"
        suppressHydrationWarning
      >
        {`$$${equation}$$`}
      </div>
    </div>
  );
}

