"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#16002C] to-[#30004A] dark:from-[#16002C] dark:to-[#30004A] transition-colors duration-300">
      <Navbar />
      <div className="max-w-[1200px] mx-auto px-6 pt-[80px] pb-20">
        <div className="text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Welcome to MLera
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your comprehensive learning platform for machine learning and data science
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/learning-path"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Start Learning
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3 rounded-full border-2 border-gray-400 text-gray-300 font-semibold hover:border-accent-pink transition-colors"
            >
              My Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
