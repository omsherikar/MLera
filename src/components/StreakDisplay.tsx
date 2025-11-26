'use client';

import { useStreak } from '@/context/StreakContext';
import { useTheme } from '@/context/ThemeContext';
import { Flame, Trophy, Target, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StreakDisplay() {
  const { stats } = useStreak();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`rounded-xl p-4 border transition-colors duration-150 ${
        theme === 'dark' 
          ? 'bg-[#2B0B4B] border-purple-500/30' 
          : 'bg-white border-gray-300'
      }`}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
              <Flame className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>0</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Day Streak</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-4 border transition-colors duration-150 ${
      theme === 'dark' 
        ? 'bg-[#2B0B4B] border-purple-500/30' 
        : 'bg-white border-gray-300'
    }`}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Current Streak */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-100'
          }`}>
            <Flame className={`w-6 h-6 ${
              stats.currentStreak > 0 ? 'text-orange-500' : 'text-gray-400'
            }`} />
          </div>
          <div>
            <p className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {stats.currentStreak}
            </p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Day Streak
            </p>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-yellow-500/20' : 'bg-yellow-100'
          }`}>
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {stats.longestStreak}
            </p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Best Streak
            </p>
          </div>
        </div>

        {/* Total Modules */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <Target className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <p className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {stats.totalModulesCompleted}
            </p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Modules Done
            </p>
          </div>
        </div>

        {/* Time Spent */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {Math.floor(stats.totalTimeSpent / 60)}h
            </p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Learning Time
            </p>
          </div>
        </div>
      </div>

      {/* Next Milestone */}
      {stats.nextMilestone && (
        <div className={`mt-4 pt-4 border-t ${
          theme === 'dark' ? 'border-purple-500/30' : 'border-gray-300'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Next Milestone:
            </span>
            <span className={`text-sm ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}>
              {stats.nextMilestone.title} ({stats.nextMilestone.days - stats.currentStreak} days to go)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
