"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className={`mt-24 border-t backdrop-blur-sm ${theme === 'dark' ? 'border-purple-800/40 bg-[#16002C]/60' : 'border-purple-200 bg-white/70'} transition-colors`}>      
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">MLera</h3>
          <p className="text-sm text-gray-300 leading-relaxed max-w-xs">Interactive machine learning education platform focused on hands-on learning, real streak motivation, and practical model building.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-3">Platform</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/learning-path" className="hover:text-pink-300 transition-colors">Learning Path</Link></li>
            <li><Link href="/learning-path/build-model" className="hover:text-pink-300 transition-colors">Build Model</Link></li>
            <li><Link href="/achievements" className="hover:text-pink-300 transition-colors">Achievements</Link></li>
            <li><Link href="/challenges" className="hover:text-pink-300 transition-colors">Challenges</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/lexicon" className="hover:text-pink-300 transition-colors">ML Lexicon</Link></li>
            <li><Link href="/datasets" className="hover:text-pink-300 transition-colors">Datasets</Link></li>
            <li><Link href="/courses" className="hover:text-pink-300 transition-colors">Courses</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-3">Engagement</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/buddy" className="hover:text-pink-300 transition-colors">Study Buddy</Link></li>
            <li><Link href="/streak" className="hover:text-pink-300 transition-colors">Your Streak</Link></li>
            <li><Link href="/profile" className="hover:text-pink-300 transition-colors">Profile</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-purple-800/40 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} MLera. Learn. Build. Repeat.
      </div>
    </footer>
  );
}
