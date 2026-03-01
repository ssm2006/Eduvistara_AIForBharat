import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CourseProgress {
  courseId: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  lastAccessed: Date;
}

interface InterviewResult {
  id: string;
  type: string;
  difficulty: string;
  score: number;
  date: Date;
  questionsAnswered: number;
}

interface AssessmentResult {
  id: string;
  title: string;
  score: number;
  percentage: number;
  date: Date;
  questionsTotal: number;
  questionsCorrect: number;
}

interface AppState {
  coursesProgress: CourseProgress[];
  interviewResults: InterviewResult[];
  assessmentResults: AssessmentResult[];
  updateCourseProgress: (courseId: string, progress: number, completedModules: number, totalModules: number) => void;
  addInterviewResult: (result: Omit<InterviewResult, 'id' | 'date'>) => void;
  addAssessmentResult: (result: Omit<AssessmentResult, 'id' | 'date'>) => void;
  getStats: () => {
    coursesCompleted: number;
    coursesInProgress: number;
    interviewsCompleted: number;
    averageInterviewScore: number;
    assessmentsCompleted: number;
    averageAssessmentScore: number;
    overallProgress: number;
    totalLearningTime: string;
  };
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [coursesProgress, setCoursesProgress] = useState<CourseProgress[]>(() => {
    const saved = localStorage.getItem('coursesProgress');
    return saved ? JSON.parse(saved) : [];
  });

  const [interviewResults, setInterviewResults] = useState<InterviewResult[]>(() => {
    const saved = localStorage.getItem('interviewResults');
    return saved ? JSON.parse(saved).map((r: any) => ({ ...r, date: new Date(r.date) })) : [];
  });

  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>(() => {
    const saved = localStorage.getItem('assessmentResults');
    return saved ? JSON.parse(saved).map((r: any) => ({ ...r, date: new Date(r.date) })) : [];
  });

  useEffect(() => {
    localStorage.setItem('coursesProgress', JSON.stringify(coursesProgress));
  }, [coursesProgress]);

  useEffect(() => {
    localStorage.setItem('interviewResults', JSON.stringify(interviewResults));
  }, [interviewResults]);

  useEffect(() => {
    localStorage.setItem('assessmentResults', JSON.stringify(assessmentResults));
  }, [assessmentResults]);

  const updateCourseProgress = (courseId: string, progress: number, completedModules: number, totalModules: number) => {
    setCoursesProgress(prev => {
      const existing = prev.find(c => c.courseId === courseId);
      if (existing) {
        return prev.map(c =>
          c.courseId === courseId
            ? { ...c, progress, completedModules, totalModules, lastAccessed: new Date() }
            : c
        );
      }
      return [...prev, { courseId, progress, completedModules, totalModules, lastAccessed: new Date() }];
    });
  };

  const addInterviewResult = (result: Omit<InterviewResult, 'id' | 'date'>) => {
    const newResult: InterviewResult = {
      ...result,
      id: Date.now().toString(),
      date: new Date(),
    };
    setInterviewResults(prev => [...prev, newResult]);
  };

  const addAssessmentResult = (result: Omit<AssessmentResult, 'id' | 'date'>) => {
    const newResult: AssessmentResult = {
      ...result,
      id: Date.now().toString(),
      date: new Date(),
    };
    setAssessmentResults(prev => [...prev, newResult]);
  };

  const getStats = () => {
    const coursesCompleted = coursesProgress.filter(c => c.progress === 100).length;
    const coursesInProgress = coursesProgress.filter(c => c.progress > 0 && c.progress < 100).length;
    const interviewsCompleted = interviewResults.length;
    const averageInterviewScore = interviewResults.length > 0
      ? interviewResults.reduce((sum, r) => sum + r.score, 0) / interviewResults.length
      : 0;
    const assessmentsCompleted = assessmentResults.length;
    const averageAssessmentScore = assessmentResults.length > 0
      ? assessmentResults.reduce((sum, r) => sum + r.percentage, 0) / assessmentResults.length
      : 0;
    
    const totalProgress = coursesProgress.reduce((sum, c) => sum + c.progress, 0);
    const overallProgress = coursesProgress.length > 0 ? totalProgress / coursesProgress.length : 0;
    
    const totalModulesCompleted = coursesProgress.reduce((sum, c) => sum + c.completedModules, 0);
    const totalMinutes = (totalModulesCompleted * 5) + (interviewsCompleted * 10) + (assessmentsCompleted * 15);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const totalLearningTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

    return {
      coursesCompleted,
      coursesInProgress,
      interviewsCompleted,
      averageInterviewScore: Math.round(averageInterviewScore),
      assessmentsCompleted,
      averageAssessmentScore: Math.round(averageAssessmentScore),
      overallProgress: Math.round(overallProgress),
      totalLearningTime,
    };
  };

  return (
    <AppStateContext.Provider
      value={{
        coursesProgress,
        interviewResults,
        assessmentResults,
        updateCourseProgress,
        addInterviewResult,
        addAssessmentResult,
        getStats,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}
