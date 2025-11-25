"use client";

import { useEffect } from "react";
import { X, Flame, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { useStreak } from "@/context/StreakContext";
import { useTheme } from "@/context/ThemeContext";

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StreakModal({ isOpen, onClose }: StreakModalProps) {
  const { streakData, stats } = useStreak();
  const { theme } = useTheme();

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Get last 30 days of streak data
  const getLast30Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      
      const visitRecord = streakData.visitHistory.find(
        (v) => v.date === dateStr
      );
      
      days.push({
        date: dateStr,
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString("en-US", { month: "short" }),
        hasVisit: !!visitRecord,
        modulesCompleted: visitRecord?.modulesCompleted?.length || 0,
        timeSpent: visitRecord?.timeSpent || 0,
        isToday: dateStr === today.toISOString().split("T")[0],
      });
    }
    
    return days;
  };

  const last30Days = getLast30Days();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#2A0F4A] rounded-2xl shadow-2xl m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-white/20">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Your Streak Journey</h2>
              <p className="text-white/80 mt-1">Keep the momentum going! 🔥</p>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 dark:bg-[#1A0A2E]">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">{stats.currentStreak}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500">{stats.longestStreak}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Longest Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">{stats.totalModulesCompleted}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Modules</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{formatTime(stats.totalTimeSpent)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Time Spent</div>
          </div>
        </div>

        {/* Next Milestone */}
        {stats.nextMilestone && (
          <div className="mx-6 mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Next Milestone</div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {stats.nextMilestone.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {stats.nextMilestone.description}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-500">
                  {stats.nextMilestone.days - stats.currentStreak}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">days to go</div>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Last 30 Days
          </h3>
          
          <div className="grid grid-cols-7 gap-2">
            {last30Days.map((day, index) => {
              const isWeekStart = index % 7 === 0;
              
              return (
                <div key={day.date} className="relative">
                  {/* Month label */}
                  {isWeekStart && (
                    <div className="absolute -top-6 left-0 text-xs font-semibold text-gray-600 dark:text-gray-400">
                      {day.monthName}
                    </div>
                  )}
                  
                  {/* Day card */}
                  <div
                    className={`
                      relative p-3 rounded-lg border-2 transition-all
                      ${day.isToday 
                        ? "border-orange-500 ring-2 ring-orange-500/30" 
                        : day.hasVisit
                        ? "border-green-500 bg-green-500/10"
                        : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1A0A2E]"
                      }
                    `}
                    title={`${day.date}${day.hasVisit ? `\nModules: ${day.modulesCompleted}\nTime: ${formatTime(day.timeSpent)}` : ""}`}
                  >
                    {/* Day name */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-1">
                      {day.dayName}
                    </div>
                    
                    {/* Day number */}
                    <div className="text-lg font-bold text-center text-gray-800 dark:text-white">
                      {day.dayNumber}
                    </div>
                    
                    {/* Status icon */}
                    <div className="flex justify-center mt-1">
                      {day.hasVisit ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    
                    {/* Today indicator */}
                    {day.isToday && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-white dark:border-[#2A0F4A]" />
                    )}
                    
                    {/* Modules count badge */}
                    {day.hasVisit && day.modulesCompleted > 0 && (
                      <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-bold">
                        {day.modulesCompleted}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-green-500 bg-green-500/10" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-orange-500 ring-2 ring-orange-500/30" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1A0A2E]" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Missed</span>
            </div>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-orange-500/10 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-purple-500" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {stats.currentStreak > 0 
                ? `Amazing! You're on a ${stats.currentStreak}-day streak. Keep learning every day! 🚀`
                : "Start your learning streak today! Complete a module to begin. 💪"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
