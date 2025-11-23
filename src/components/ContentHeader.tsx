"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContentHeaderProps {
  title: string;
  currentModule: number;
  totalModules: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function ContentHeader({
  title,
  currentModule,
  totalModules,
  onPrevious,
  onNext,
}: ContentHeaderProps) {
  const progress = (currentModule / totalModules) * 100;

  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-6">
      {/* Title - Centered at top */}
      <h1 
        className="text-5xl md:text-6xl font-black mb-16 pb-8 text-center"
        style={{
          background: 'linear-gradient(to right, #FF6B9D, #A66BFF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: '1.1'
        }}
      >
        {title}
      </h1>
      
      {/* Bottom section - Progress on left, Button on right */}
      <div className="flex items-end justify-between">
        {/* Left side - Progress indicator */}
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-light-text dark:text-gray-300">
            Module progress: {currentModule} / {totalModules}
          </span>
          <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-pink to-orange-500 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Right side - Previous button */}
        <div className="flex items-center space-x-4">
          {onPrevious && (
            <button
              onClick={onPrevious}
              className="px-6 py-2 rounded-full border-2 border-gray-300 dark:border-gray-400 hover:border-accent-pink transition-colors text-light-text dark:text-gray-300 bg-transparent flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Previous</span>
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="px-6 py-2 rounded-full border-2 border-gray-300 dark:border-gray-400 hover:border-accent-pink transition-colors text-light-text dark:text-gray-300 bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      {/* Horizontal line separator */}
      <div className="mt-16 mb-0">
        <hr className="border-t border-gray-200 dark:border-[#40005A]" />
      </div>
    </div>
  );
}

