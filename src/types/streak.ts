export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastVisitDate: string; // ISO date string
  totalModulesCompleted: number;
  visitHistory: VisitRecord[];
  streakMilestones: StreakMilestone[];
}

export interface VisitRecord {
  date: string; // ISO date string (YYYY-MM-DD)
  modulesCompleted: string[]; // Array of module IDs completed that day
  timeSpent: number; // Time spent in minutes
}

export interface StreakMilestone {
  days: number;
  achievedAt: string | null; // ISO date string or null if not achieved
  title: string;
  description: string;
}

export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  completed: boolean;
  completedAt: string | null; // ISO date string
  timeSpent: number; // Time spent in minutes
}

export const STREAK_CONFIG = {
  // Minimum time spent on a module to count as valid visit (in minutes)
  MIN_TIME_FOR_STREAK: 5,
  
  // Minimum modules to complete in a day to count towards streak
  MIN_MODULES_PER_DAY: 1,
  
  // Grace period in hours (24 hours = miss one day is okay, reset after 48 hours)
  GRACE_PERIOD_HOURS: 48,
  
  // Timezone for streak calculation
  TIMEZONE: 'America/New_York', // Can be changed based on user preference
  
  // Milestones
  MILESTONES: [
    { days: 3, title: '🔥 3-Day Streak!', description: 'Keep the momentum going!' },
    { days: 7, title: '⚡ Week Warrior!', description: 'One week of consistent learning!' },
    { days: 14, title: '🌟 Two Weeks Strong!', description: 'Halfway to a habit!' },
    { days: 30, title: '🏆 Monthly Master!', description: 'A full month of dedication!' },
    { days: 60, title: '💪 60-Day Champion!', description: 'Unstoppable learner!' },
    { days: 100, title: '👑 Century Club!', description: 'You are a learning legend!' },
    { days: 365, title: '🎯 Year-Long Dedication!', description: 'An entire year of growth!' }
  ]
} as const;

// Module definitions for tracking
export const MODULES = {
  LEARNING_PATH: {
    LINEAR_REGRESSION: 'linear-regression-theory',
    BUILD_MODEL: 'build-linear-regression-model'
  },
  CHALLENGES: {
    // Add challenge IDs here as they are created
  },
  COURSES: {
    // Add course IDs here as they are created
  }
} as const;
