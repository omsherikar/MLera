'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { StreakData } from '@/types/streak';
import { 
  getStreakData, 
  registerDailyVisit, 
  recordModuleCompletion,
  getStreakStats 
} from '@/utils/streakManager';

interface StreakContextType {
  streakData: StreakData;
  stats: ReturnType<typeof getStreakStats>;
  completeModule: (moduleId: string, moduleName: string, timeSpent?: number) => void;
  refreshStreak: () => void;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export function StreakProvider({ children }: { children: ReactNode }) {
  const [streakData, setStreakData] = useState<StreakData>(() => {
    if (typeof window !== 'undefined') {
      return getStreakData();
    }
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastVisitDate: new Date().toISOString().split('T')[0],
      totalModulesCompleted: 0,
      visitHistory: [],
      streakMilestones: []
    };
  });

  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined') {
      return getStreakStats();
    }
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalModulesCompleted: 0,
      modulesLast7Days: 0,
      modulesLast30Days: 0,
      totalTimeSpent: 0,
      nextMilestone: undefined
    };
  });

  // Register daily visit on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updatedData = registerDailyVisit();
      setStreakData(updatedData);
      setStats(getStreakStats());
    }
  }, []);

  const completeModule = (moduleId: string, moduleName: string, timeSpent: number = 5) => {
    recordModuleCompletion(moduleId, moduleName, timeSpent);
    setStreakData(getStreakData());
    setStats(getStreakStats());
  };

  const refreshStreak = () => {
    setStreakData(getStreakData());
    setStats(getStreakStats());
  };

  return (
    <StreakContext.Provider value={{ streakData, stats, completeModule, refreshStreak }}>
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak() {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error('useStreak must be used within a StreakProvider');
  }
  return context;
}
