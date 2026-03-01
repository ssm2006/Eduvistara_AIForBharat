export type Language = 'en' | 'hi' | 'mr';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  language: Language;
  educationLevel: string | null;
  careerGoals: string[];
  currentSkills: string[];
  onboardingComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  dataUsageMode: 'normal' | 'lite';
  theme: 'light' | 'dark';
}

export interface LearningRoadmap {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  roadmap: RoadmapData;
}

export interface RoadmapData {
  skillGaps: string[];
  modules: LearningModule[];
  milestones: Milestone[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  skills: string[];
  estimatedHours: number;
  sequence: number;
  completed: boolean;
  completedAt?: Date;
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  contentType: 'video' | 'article' | 'practice';
  duration: number;
  completed: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  requiredModules: string[];
  achieved: boolean;
  achievedAt?: Date;
}

export interface InterviewSession {
  sessionId: string;
  userId: string;
  role: string;
  interviewType: 'technical' | 'hr' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  language: Language;
  status: 'active' | 'completed' | 'abandoned';
  startedAt: Date;
  completedAt?: Date;
  currentQuestionIndex: number;
  score: number;
  averageScore?: number;
  questions: InterviewQuestion[];
  overallFeedback?: OverallFeedback;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  expectedPoints: string[];
  evaluationCriteria: string[];
  askedAt: Date;
  answer?: string;
  answerType?: 'text' | 'voice';
  answeredAt?: Date;
  feedback?: string;
  score?: number;
  strengths?: string[];
  improvements?: string[];
}

export interface OverallFeedback {
  summary: string;
  keyStrengths: string[];
  areasToImprove: string[];
  recommendations: string[];
}

export interface Assessment {
  assessmentId: string;
  title: string;
  description: string;
  skillArea: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  passingScore: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  type: 'mcq' | 'coding' | 'subjective';
  question: string;
  options?: string[];
  correctAnswer?: string;
  testCases?: TestCase[];
  rubric?: string;
  points: number;
  explanation: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

export interface AssessmentAttempt {
  attemptId: string;
  userId: string;
  assessmentId: string;
  skillArea: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'in_progress' | 'completed' | 'abandoned';
  answers: Record<string, any>;
  score: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  feedback: QuestionFeedback[];
}

export interface QuestionFeedback {
  questionId: string;
  correct?: boolean;
  score?: number;
  userAnswer: any;
  correctAnswer?: any;
  explanation: string;
  suggestions?: string[];
  testResults?: TestResult[];
}

export interface TestResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}

export interface UserProgress {
  userId: string;
  skills: Record<string, SkillProgress>;
  overallProgress: number;
  totalAssessments: number;
  certificatesEarned: number;
  learningStreak: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillProgress {
  proficiency: 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentage: number;
  lastAssessed: Date;
  assessmentCount: number;
}

export interface Content {
  contentId: string;
  title: string;
  description: string;
  body: string;
  contentType: 'article' | 'video' | 'tutorial' | 'practice';
  skillArea: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  translations?: Record<Language, ContentTranslation>;
  mediaUrls?: MediaUrls;
  prerequisites?: string[];
  relatedContent?: string[];
}

export interface ContentTranslation {
  title: string;
  description: string;
  body: string;
}

export interface MediaUrls {
  thumbnail?: string;
  video?: string;
  images?: string[];
}
