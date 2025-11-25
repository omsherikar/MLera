import { StreakData, VisitRecord, ModuleProgress, StreakMilestone, STREAK_CONFIG, MODULES } from '@/types/streak';

const STORAGE_KEY = 'mlera_streak_data';
const MODULE_PROGRESS_KEY = 'mlera_module_progress';

/**
 * Get current date in YYYY-MM-DD format
 */
function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Calculate days between two dates
 */
function getDaysDifference(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Initialize streak data if it doesn't exist
 */
function initializeStreakData(): StreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastVisitDate: getTodayDate(),
    totalModulesCompleted: 0,
    visitHistory: [],
    streakMilestones: STREAK_CONFIG.MILESTONES.map(m => ({
      ...m,
      achievedAt: null
    }))
  };
}

/**
 * Get streak data from localStorage
 */
export function getStreakData(): StreakData {
  if (typeof window === 'undefined') return initializeStreakData();
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initializeStreakData();
    
    return JSON.parse(stored) as StreakData;
  } catch (error) {
    console.error('Error reading streak data:', error);
    return initializeStreakData();
  }
}

/**
 * Save streak data to localStorage
 */
export function saveStreakData(data: StreakData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving streak data:', error);
  }
}

/**
 * Calculate and update streak based on last visit
 */
export function calculateStreak(streakData: StreakData): StreakData {
  const today = getTodayDate();
  const lastVisit = streakData.lastVisitDate;
  const daysSinceLastVisit = getDaysDifference(lastVisit, today);
  
  let updatedData = { ...streakData };
  
  // If same day, no change needed
  if (daysSinceLastVisit === 0) {
    return updatedData;
  }
  
  // If within grace period (1 day = consecutive)
  if (daysSinceLastVisit === 1) {
    updatedData.currentStreak += 1;
    
    // Update longest streak if current exceeds it
    if (updatedData.currentStreak > updatedData.longestStreak) {
      updatedData.longestStreak = updatedData.currentStreak;
    }
    
    // Check for milestone achievements
    updatedData.streakMilestones = updatedData.streakMilestones.map(milestone => {
      if (milestone.achievedAt === null && updatedData.currentStreak >= milestone.days) {
        return { ...milestone, achievedAt: today };
      }
      return milestone;
    });
  } 
  // If beyond grace period (more than 48 hours), reset streak
  else if (daysSinceLastVisit >= 2) {
    updatedData.currentStreak = 1; // Start fresh with today
  }
  
  updatedData.lastVisitDate = today;
  
  return updatedData;
}

/**
 * Record module completion
 */
export function recordModuleCompletion(
  moduleId: string,
  moduleName: string,
  timeSpent: number = 0
): void {
  if (typeof window === 'undefined') return;
  
  const today = getTodayDate();
  let streakData = getStreakData();
  
  // Check if minimum time requirement is met
  if (timeSpent < STREAK_CONFIG.MIN_TIME_FOR_STREAK) {
    console.log('Module completion not counted: insufficient time spent');
    return;
  }
  
  // Update or create today's visit record
  const todayRecord = streakData.visitHistory.find(v => v.date === today);
  
  if (todayRecord) {
    // Add module if not already completed today
    if (!todayRecord.modulesCompleted.includes(moduleId)) {
      todayRecord.modulesCompleted.push(moduleId);
      todayRecord.timeSpent += timeSpent;
    }
  } else {
    // Create new visit record for today
    streakData.visitHistory.push({
      date: today,
      modulesCompleted: [moduleId],
      timeSpent
    });
  }
  
  // Update total modules completed
  streakData.totalModulesCompleted += 1;
  
  // Calculate and update streak
  streakData = calculateStreak(streakData);
  
  // Save updated data
  saveStreakData(streakData);
  
  // Save module progress
  saveModuleProgress(moduleId, moduleName, timeSpent);
}

/**
 * Register a daily visit (when user opens the app)
 */
export function registerDailyVisit(): StreakData {
  let streakData = getStreakData();
  const today = getTodayDate();
  
  // Only update if it's a new day
  if (streakData.lastVisitDate !== today) {
    streakData = calculateStreak(streakData);
    saveStreakData(streakData);
  }
  
  return streakData;
}

/**
 * Get module progress data
 */
export function getModuleProgress(): ModuleProgress[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(MODULE_PROGRESS_KEY);
    if (!stored) return [];
    
    return JSON.parse(stored) as ModuleProgress[];
  } catch (error) {
    console.error('Error reading module progress:', error);
    return [];
  }
}

/**
 * Save module progress
 */
function saveModuleProgress(
  moduleId: string,
  moduleName: string,
  timeSpent: number
): void {
  if (typeof window === 'undefined') return;
  
  try {
    let progress = getModuleProgress();
    const existingIndex = progress.findIndex(p => p.moduleId === moduleId);
    
    if (existingIndex >= 0) {
      // Update existing progress
      progress[existingIndex] = {
        ...progress[existingIndex],
        completed: true,
        completedAt: new Date().toISOString(),
        timeSpent: progress[existingIndex].timeSpent + timeSpent
      };
    } else {
      // Add new progress
      progress.push({
        moduleId,
        moduleName,
        completed: true,
        completedAt: new Date().toISOString(),
        timeSpent
      });
    }
    
    localStorage.setItem(MODULE_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving module progress:', error);
  }
}

/**
 * Check if module is completed
 */
export function isModuleCompleted(moduleId: string): boolean {
  const progress = getModuleProgress();
  return progress.some(p => p.moduleId === moduleId && p.completed);
}

/**
 * Get recently achieved milestones (last 7 days)
 */
export function getRecentMilestones(days: number = 7): StreakMilestone[] {
  const streakData = getStreakData();
  const today = new Date();
  const cutoffDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
  
  return streakData.streakMilestones
    .filter(m => {
      if (!m.achievedAt) return false;
      const achievedDate = new Date(m.achievedAt);
      return achievedDate >= cutoffDate;
    });
}

/**
 * Reset streak data (for testing or user request)
 */
export function resetStreakData(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(MODULE_PROGRESS_KEY);
}

/**
 * Get streak statistics
 */
export function getStreakStats() {
  const streakData = getStreakData();
  const last7Days = streakData.visitHistory
    .filter(v => getDaysDifference(v.date, getTodayDate()) <= 7)
    .reduce((sum, v) => sum + v.modulesCompleted.length, 0);
  
  const last30Days = streakData.visitHistory
    .filter(v => getDaysDifference(v.date, getTodayDate()) <= 30)
    .reduce((sum, v) => sum + v.modulesCompleted.length, 0);
  
  const totalTimeSpent = streakData.visitHistory
    .reduce((sum, v) => sum + v.timeSpent, 0);
  
  return {
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    totalModulesCompleted: streakData.totalModulesCompleted,
    modulesLast7Days: last7Days,
    modulesLast30Days: last30Days,
    totalTimeSpent,
    nextMilestone: streakData.streakMilestones.find(m => m.achievedAt === null)
  };
}
