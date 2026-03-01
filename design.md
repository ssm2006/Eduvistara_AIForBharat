# EduVistara - Design Document

## 1. System Overview

EduVistara is a cloud-native, AI-powered multilingual EdTech platform built on Google Cloud Platform (GCP) and Firebase ecosystem. The system leverages Google Gemini API for AI capabilities, Firebase for authentication and real-time data management, and follows a serverless architecture for scalability and cost-effectiveness.

### 1.1 Design Principles

- **Mobile-First**: UI/UX optimized for mobile devices with progressive enhancement for larger screens
- **Offline-First**: Core functionality available offline with background synchronization
- **Serverless Architecture**: Cloud Functions for backend logic, eliminating server management
- **Microservices Pattern**: Modular services for independent scaling and maintenance
- **API-First Design**: RESTful APIs with clear contracts between frontend and backend
- **Security by Default**: Authentication, authorization, and encryption at every layer
- **Progressive Web App (PWA)**: Installable, app-like experience without app store friction
- **Responsive & Adaptive**: Content and UI adapt to device capabilities and network conditions

### 1.2 Technology Stack

**Frontend:**
- Framework: React with TypeScript (or Flutter for native mobile experience)
- Development Environment: Project IDX (Google's cloud-based IDE)
- State Management: Redux Toolkit or Zustand
- UI Library: Material-UI (MUI) or Tailwind CSS
- PWA: Workbox for service workers and offline caching
- Internationalization: i18next for multilingual support
- Code Editor: Monaco Editor for coding playground

**Backend:**
- Authentication: Firebase Authentication (Email/Password, Google Sign-In, Phone)
- Database: Cloud Firestore (NoSQL, real-time)
- Storage: Firebase Cloud Storage (user uploads, offline content)
- Functions: Firebase Cloud Functions (Node.js/TypeScript)
- Hosting: Firebase Hosting with CDN
- Analytics: Firebase Analytics and Google Analytics 4

**AI & ML:**
- AI Model: Google Gemini API (gemini-pro, gemini-pro-vision)
- Natural Language Processing: Gemini for interview conversations, content generation
- Translation: Cloud Translation API for multilingual content
- Text-to-Speech: Cloud Text-to-Speech API for audio support
- Speech-to-Text: Cloud Speech-to-Text API for voice interviews

**DevOps & Monitoring:**
- Version Control: Git with GitHub/GitLab
- CI/CD: GitHub Actions or Cloud Build
- Monitoring: Firebase Crashlytics, Cloud Monitoring
- Logging: Cloud Logging
- Performance: Firebase Performance Monitoring


## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   React/     │  │   Service    │  │   IndexedDB  │          │
│  │   Flutter    │◄─┤   Worker     │◄─┤   (Offline)  │          │
│  │   Frontend   │  │   (PWA)      │  │   Storage    │          │
│  └──────┬───────┘  └──────────────┘  └──────────────┘          │
│         │                                                         │
└─────────┼─────────────────────────────────────────────────────┘
          │ HTTPS/REST API
          │
┌─────────▼─────────────────────────────────────────────────────┐
│                    FIREBASE SERVICES LAYER                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Firebase   │  │   Firebase   │  │   Firebase   │          │
│  │     Auth     │  │   Hosting    │  │   Storage    │          │
│  └──────┬───────┘  └──────────────┘  └──────────────┘          │
│         │                                                         │
└─────────┼─────────────────────────────────────────────────────┘
          │
┌─────────▼─────────────────────────────────────────────────────┐
│                  CLOUD FUNCTIONS LAYER (Backend)                │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   User       │  │   Learning   │  │   Interview  │          │
│  │   Service    │  │   Service    │  │   Service    │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                  │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐          │
│  │  Assessment  │  │   Content    │  │  Analytics   │          │
│  │   Service    │  │   Service    │  │   Service    │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                  │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          │                  │                  ▼
          │                  │         ┌──────────────┐
          │                  │         │   Google     │
          │                  └────────►│   Gemini     │
          │                            │   API        │
          │                            └──────────────┘
          │
┌─────────▼─────────────────────────────────────────────────────┐
│                      DATA LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Cloud Firestore (NoSQL)                      │  │
│  ├──────────────┬──────────────┬──────────────┬─────────────┤  │
│  │    Users     │   Learning   │  Interviews  │ Assessments │  │
│  │  Collection  │  Collection  │  Collection  │ Collection  │  │
│  └──────────────┴──────────────┴──────────────┴─────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow Architecture

**Primary User Flow:**
```
User Action → Frontend → Firebase Auth (if needed) → Cloud Function → 
Gemini API (if AI needed) → Firestore (read/write) → Cloud Function → 
Frontend → User Interface Update
```

**Example: AI Interview Flow**
```
1. User starts interview → Frontend sends request
2. Cloud Function (interviewService) validates user token
3. Function calls Gemini API with interview context
4. Gemini generates interview question
5. Function stores question in Firestore
6. Frontend receives question and displays to user
7. User submits answer → Frontend sends to Cloud Function
8. Function sends answer to Gemini for evaluation
9. Gemini returns feedback and score
10. Function updates Firestore with results
11. Frontend displays feedback to user
```

### 2.3 Component Architecture

**Frontend Components Hierarchy:**
```
App
├── AuthProvider (Firebase Auth context)
├── LanguageProvider (i18next context)
├── ThemeProvider (UI theme)
└── Router
    ├── PublicRoutes
    │   ├── Landing Page
    │   ├── Login/Signup
    │   └── Language Selection
    └── ProtectedRoutes
        ├── Dashboard
        ├── Learning Module
        │   ├── Roadmap View
        │   ├── Course Content
        │   └── Practice Playground
        ├── Interview Module
        │   ├── Interview Setup
        │   ├── Interview Session
        │   └── Interview Results
        ├── Assessment Module
        │   ├── Test List
        │   ├── Test Session
        │   └── Results Dashboard
        └── Profile Module
            ├── Progress Tracking
            ├── Certificates
            └── Settings
```


## 3. Module Design

### 3.1 User Onboarding & Language Selection Module

**Purpose:** Seamless user registration, authentication, and language preference setup.

**Components:**
- Language Selection Screen (pre-auth)
- Authentication Forms (Email/Phone/Google)
- Onboarding Questionnaire
- Profile Setup

**Technical Implementation:**

```typescript
// Frontend: Language Selection Component
interface LanguageOption {
  code: 'mr' | 'hi' | 'en';
  name: string;
  nativeName: string;
}

// Cloud Function: User Profile Creation
exports.createUserProfile = functions.auth.user().onCreate(async (user) => {
  const userProfile = {
    uid: user.uid,
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    language: 'en', // default, updated during onboarding
    onboardingComplete: false,
    educationLevel: null,
    careerGoals: [],
    currentSkills: []
  };
  
  await admin.firestore().collection('users').doc(user.uid).set(userProfile);
});

// Cloud Function: Complete Onboarding
exports.completeOnboarding = functions.https.onCall(async (data, context) => {
  // Validate authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { language, educationLevel, careerGoals, currentSkills } = data;
  
  // Update user profile
  await admin.firestore().collection('users').doc(context.auth.uid).update({
    language,
    educationLevel,
    careerGoals,
    currentSkills,
    onboardingComplete: true,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  // Generate personalized learning roadmap
  const roadmap = await generateLearningRoadmap(educationLevel, careerGoals, currentSkills);
  
  return { success: true, roadmap };
});
```

**Firestore Schema:**
```javascript
users/{userId}
  - uid: string
  - email: string
  - phoneNumber: string (optional)
  - displayName: string
  - language: 'mr' | 'hi' | 'en'
  - educationLevel: string
  - careerGoals: string[]
  - currentSkills: string[]
  - onboardingComplete: boolean
  - createdAt: timestamp
  - updatedAt: timestamp
  - preferences: {
      notifications: boolean,
      dataUsageMode: 'normal' | 'lite',
      theme: 'light' | 'dark'
    }
```

**Key Features:**
- Pre-authentication language selection (stored in localStorage)
- Multi-step onboarding wizard with progress indicator
- Skip option for optional questions
- Auto-save progress to prevent data loss
- Validation with helpful error messages in selected language

### 3.2 Personalized Learning Roadmap Module

**Purpose:** AI-generated, adaptive learning paths tailored to individual goals and skills.

**Components:**
- Roadmap Generator (AI-powered)
- Visual Roadmap Display
- Progress Tracker
- Skill Gap Analyzer
- Milestone Manager

**Technical Implementation:**

```typescript
// Cloud Function: Generate Learning Roadmap
exports.generateLearningRoadmap = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { educationLevel, careerGoals, currentSkills } = data;
  
  // Prepare prompt for Gemini
  const prompt = `
    Generate a personalized learning roadmap for a student with:
    - Education Level: ${educationLevel}
    - Career Goals: ${careerGoals.join(', ')}
    - Current Skills: ${currentSkills.join(', ')}
    
    Create a structured roadmap with:
    1. Skill gaps to fill
    2. Learning modules in sequence
    3. Estimated time for each module
    4. Milestones and checkpoints
    5. Recommended resources
    
    Format as JSON with clear structure.
  `;
  
  // Call Gemini API
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const roadmapText = result.response.text();
  
  // Parse and structure roadmap
  const roadmap = parseRoadmapFromAI(roadmapText);
  
  // Store in Firestore
  const roadmapDoc = {
    userId: context.auth.uid,
    roadmap: roadmap,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    status: 'active',
    progress: 0
  };
  
  await admin.firestore()
    .collection('learningRoadmaps')
    .doc(context.auth.uid)
    .set(roadmapDoc);
  
  return { success: true, roadmap };
});

// Cloud Function: Update Progress
exports.updateRoadmapProgress = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { moduleId, completed } = data;
  
  const roadmapRef = admin.firestore()
    .collection('learningRoadmaps')
    .doc(context.auth.uid);
  
  await roadmapRef.update({
    [`roadmap.modules.${moduleId}.completed`]: completed,
    [`roadmap.modules.${moduleId}.completedAt`]: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  // Recalculate overall progress
  const roadmapDoc = await roadmapRef.get();
  const roadmap = roadmapDoc.data();
  const totalModules = Object.keys(roadmap.roadmap.modules).length;
  const completedModules = Object.values(roadmap.roadmap.modules)
    .filter((m: any) => m.completed).length;
  const progress = (completedModules / totalModules) * 100;
  
  await roadmapRef.update({ progress });
  
  return { success: true, progress };
});
```

**Firestore Schema:**
```javascript
learningRoadmaps/{userId}
  - userId: string
  - createdAt: timestamp
  - updatedAt: timestamp
  - status: 'active' | 'completed' | 'paused'
  - progress: number (0-100)
  - roadmap: {
      skillGaps: string[],
      modules: [
        {
          id: string,
          title: string,
          description: string,
          skills: string[],
          estimatedHours: number,
          sequence: number,
          completed: boolean,
          completedAt: timestamp,
          topics: [
            {
              id: string,
              title: string,
              contentType: 'video' | 'article' | 'practice',
              duration: number,
              completed: boolean
            }
          ]
        }
      ],
      milestones: [
        {
          id: string,
          title: string,
          description: string,
          requiredModules: string[],
          achieved: boolean,
          achievedAt: timestamp
        }
      ]
    }
```

**Key Features:**
- AI-generated roadmap based on user profile
- Visual timeline with dependencies
- Adaptive difficulty based on performance
- Skill gap identification and recommendations
- Progress tracking with visual indicators
- Milestone celebrations and badges
- Ability to regenerate roadmap when goals change


### 3.3 AI Interview Practice Module

**Purpose:** Realistic mock interviews with AI-powered feedback and performance analysis.

**Components:**
- Interview Setup (role, type, difficulty)
- Real-time Interview Session
- AI Interviewer (Gemini-powered)
- Speech Recognition (optional)
- Performance Analyzer
- Interview History & Analytics

**Technical Implementation:**

```typescript
// Cloud Function: Start Interview Session
exports.startInterview = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { role, interviewType, difficulty, language } = data;
  
  // Create interview session
  const sessionId = admin.firestore().collection('interviews').doc().id;
  
  const session = {
    sessionId,
    userId: context.auth.uid,
    role,
    interviewType, // 'technical' | 'hr' | 'behavioral'
    difficulty, // 'easy' | 'medium' | 'hard'
    language,
    status: 'active',
    startedAt: admin.firestore.FieldValue.serverTimestamp(),
    questions: [],
    currentQuestionIndex: 0,
    score: 0
  };
  
  await admin.firestore().collection('interviews').doc(sessionId).set(session);
  
  // Generate first question using Gemini
  const firstQuestion = await generateInterviewQuestion(role, interviewType, difficulty, language, 0);
  
  await admin.firestore().collection('interviews').doc(sessionId).update({
    questions: admin.firestore.FieldValue.arrayUnion(firstQuestion)
  });
  
  return { success: true, sessionId, question: firstQuestion };
});

// Cloud Function: Generate Interview Question
async function generateInterviewQuestion(
  role: string,
  type: string,
  difficulty: string,
  language: string,
  questionNumber: number
) {
  const prompt = `
    You are conducting a ${type} interview for a ${role} position.
    Generate question number ${questionNumber + 1} at ${difficulty} difficulty level.
    Language: ${language}
    
    Provide:
    1. The interview question
    2. Key points the answer should cover
    3. Evaluation criteria
    
    Format as JSON.
  `;
  
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const questionData = JSON.parse(result.response.text());
  
  return {
    id: `q${questionNumber}`,
    question: questionData.question,
    expectedPoints: questionData.keyPoints,
    evaluationCriteria: questionData.criteria,
    askedAt: admin.firestore.FieldValue.serverTimestamp()
  };
}

// Cloud Function: Submit Answer and Get Feedback
exports.submitAnswer = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { sessionId, questionId, answer, answerType } = data; // answerType: 'text' | 'voice'
  
  // Get interview session
  const sessionRef = admin.firestore().collection('interviews').doc(sessionId);
  const sessionDoc = await sessionRef.get();
  const session = sessionDoc.data();
  
  // Get current question
  const currentQuestion = session.questions[session.currentQuestionIndex];
  
  // Evaluate answer using Gemini
  const evaluation = await evaluateAnswer(
    currentQuestion.question,
    answer,
    currentQuestion.expectedPoints,
    currentQuestion.evaluationCriteria,
    session.language
  );
  
  // Update question with answer and feedback
  const updatedQuestions = [...session.questions];
  updatedQuestions[session.currentQuestionIndex] = {
    ...currentQuestion,
    answer,
    answerType,
    answeredAt: admin.firestore.FieldValue.serverTimestamp(),
    feedback: evaluation.feedback,
    score: evaluation.score,
    strengths: evaluation.strengths,
    improvements: evaluation.improvements
  };
  
  // Update session
  await sessionRef.update({
    questions: updatedQuestions,
    score: session.score + evaluation.score
  });
  
  return { 
    success: true, 
    feedback: evaluation.feedback,
    score: evaluation.score,
    strengths: evaluation.strengths,
    improvements: evaluation.improvements
  };
});

// Cloud Function: Evaluate Answer
async function evaluateAnswer(
  question: string,
  answer: string,
  expectedPoints: string[],
  criteria: string[],
  language: string
) {
  const prompt = `
    Interview Question: ${question}
    Candidate's Answer: ${answer}
    Expected Key Points: ${expectedPoints.join(', ')}
    Evaluation Criteria: ${criteria.join(', ')}
    
    Evaluate the answer and provide:
    1. Overall feedback (in ${language})
    2. Score out of 10
    3. Strengths in the answer
    4. Areas for improvement
    5. Suggestions for better response
    
    Be constructive and encouraging. Format as JSON.
  `;
  
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const evaluation = JSON.parse(result.response.text());
  
  return evaluation;
}

// Cloud Function: Get Next Question
exports.getNextQuestion = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { sessionId } = data;
  
  const sessionRef = admin.firestore().collection('interviews').doc(sessionId);
  const sessionDoc = await sessionRef.get();
  const session = sessionDoc.data();
  
  const nextIndex = session.currentQuestionIndex + 1;
  
  // Check if interview should end (e.g., after 5 questions)
  if (nextIndex >= 5) {
    await endInterview(sessionId, session);
    return { success: true, interviewComplete: true };
  }
  
  // Generate next question
  const nextQuestion = await generateInterviewQuestion(
    session.role,
    session.interviewType,
    session.difficulty,
    session.language,
    nextIndex
  );
  
  await sessionRef.update({
    questions: admin.firestore.FieldValue.arrayUnion(nextQuestion),
    currentQuestionIndex: nextIndex
  });
  
  return { success: true, question: nextQuestion, interviewComplete: false };
});

// Cloud Function: End Interview
async function endInterview(sessionId: string, session: any) {
  const totalScore = session.score;
  const averageScore = totalScore / session.questions.length;
  
  // Generate overall feedback
  const overallFeedback = await generateOverallFeedback(session);
  
  await admin.firestore().collection('interviews').doc(sessionId).update({
    status: 'completed',
    completedAt: admin.firestore.FieldValue.serverTimestamp(),
    averageScore,
    overallFeedback
  });
  
  // Update user's interview history
  await admin.firestore().collection('users').doc(session.userId).update({
    [`interviewHistory.${sessionId}`]: {
      role: session.role,
      type: session.interviewType,
      score: averageScore,
      completedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  });
}
```

**Firestore Schema:**
```javascript
interviews/{sessionId}
  - sessionId: string
  - userId: string
  - role: string
  - interviewType: 'technical' | 'hr' | 'behavioral'
  - difficulty: 'easy' | 'medium' | 'hard'
  - language: 'mr' | 'hi' | 'en'
  - status: 'active' | 'completed' | 'abandoned'
  - startedAt: timestamp
  - completedAt: timestamp
  - currentQuestionIndex: number
  - score: number
  - averageScore: number
  - questions: [
      {
        id: string,
        question: string,
        expectedPoints: string[],
        evaluationCriteria: string[],
        askedAt: timestamp,
        answer: string,
        answerType: 'text' | 'voice',
        answeredAt: timestamp,
        feedback: string,
        score: number,
        strengths: string[],
        improvements: string[]
      }
    ]
  - overallFeedback: {
      summary: string,
      keyStrengths: string[],
      areasToImprove: string[],
      recommendations: string[]
    }
```

**Key Features:**
- Dynamic question generation based on role and difficulty
- Real-time answer evaluation with constructive feedback
- Support for text and voice responses
- Performance scoring and analytics
- Interview history tracking
- Personalized improvement suggestions
- Multi-language support for questions and feedback


### 3.4 Skill Assessments & Progress Tracking Module

**Purpose:** Evaluate skill proficiency, track learning progress, and provide actionable insights.

**Components:**
- Assessment Builder
- Test Session Manager
- Auto-grading Engine
- Progress Dashboard
- Analytics & Insights
- Certificate Generator

**Technical Implementation:**

```typescript
// Cloud Function: Get Assessment
exports.getAssessment = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { assessmentId, skillArea } = data;
  
  // Fetch assessment from Firestore
  const assessmentDoc = await admin.firestore()
    .collection('assessments')
    .doc(assessmentId)
    .get();
  
  if (!assessmentDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'Assessment not found');
  }
  
  const assessment = assessmentDoc.data();
  
  // Create user attempt record
  const attemptId = admin.firestore().collection('assessmentAttempts').doc().id;
  
  await admin.firestore().collection('assessmentAttempts').doc(attemptId).set({
    attemptId,
    userId: context.auth.uid,
    assessmentId,
    skillArea,
    startedAt: admin.firestore.FieldValue.serverTimestamp(),
    status: 'in_progress',
    answers: {},
    score: 0
  });
  
  return { success: true, attemptId, assessment };
});

// Cloud Function: Submit Assessment
exports.submitAssessment = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { attemptId, answers } = data;
  
  // Get attempt and assessment
  const attemptRef = admin.firestore().collection('assessmentAttempts').doc(attemptId);
  const attemptDoc = await attemptRef.get();
  const attempt = attemptDoc.data();
  
  const assessmentDoc = await admin.firestore()
    .collection('assessments')
    .doc(attempt.assessmentId)
    .get();
  const assessment = assessmentDoc.data();
  
  // Grade assessment
  const results = await gradeAssessment(assessment, answers);
  
  // Update attempt
  await attemptRef.update({
    answers,
    score: results.score,
    percentage: results.percentage,
    correctAnswers: results.correctAnswers,
    totalQuestions: results.totalQuestions,
    status: 'completed',
    completedAt: admin.firestore.FieldValue.serverTimestamp(),
    feedback: results.feedback
  });
  
  // Update user progress
  await updateUserProgress(context.auth.uid, attempt.skillArea, results.percentage);
  
  // Check if certificate should be awarded
  if (results.percentage >= 80) {
    await generateCertificate(context.auth.uid, attempt.assessmentId, results.percentage);
  }
  
  return { success: true, results };
});

// Helper: Grade Assessment
async function gradeAssessment(assessment: any, answers: any) {
  let correctAnswers = 0;
  const totalQuestions = assessment.questions.length;
  const feedback: any[] = [];
  
  for (const question of assessment.questions) {
    const userAnswer = answers[question.id];
    
    if (question.type === 'mcq') {
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctAnswers++;
      
      feedback.push({
        questionId: question.id,
        correct: isCorrect,
        userAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      });
    } else if (question.type === 'coding') {
      // Run test cases for coding questions
      const testResults = await runCodeTests(userAnswer, question.testCases);
      const passedTests = testResults.filter((r: any) => r.passed).length;
      const score = passedTests / question.testCases.length;
      
      correctAnswers += score;
      
      feedback.push({
        questionId: question.id,
        score,
        testResults,
        explanation: question.explanation
      });
    } else if (question.type === 'subjective') {
      // Use Gemini to evaluate subjective answers
      const evaluation = await evaluateSubjectiveAnswer(
        question.question,
        userAnswer,
        question.rubric
      );
      
      correctAnswers += evaluation.score;
      
      feedback.push({
        questionId: question.id,
        score: evaluation.score,
        feedback: evaluation.feedback,
        suggestions: evaluation.suggestions
      });
    }
  }
  
  const score = correctAnswers;
  const percentage = (correctAnswers / totalQuestions) * 100;
  
  return {
    score,
    percentage,
    correctAnswers,
    totalQuestions,
    feedback
  };
}

// Cloud Function: Get User Progress
exports.getUserProgress = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  // Get user's progress document
  const progressDoc = await admin.firestore()
    .collection('userProgress')
    .doc(context.auth.uid)
    .get();
  
  if (!progressDoc.exists) {
    return { success: true, progress: null };
  }
  
  const progress = progressDoc.data();
  
  // Get recent activity
  const recentAttempts = await admin.firestore()
    .collection('assessmentAttempts')
    .where('userId', '==', context.auth.uid)
    .orderBy('completedAt', 'desc')
    .limit(10)
    .get();
  
  const recentActivity = recentAttempts.docs.map(doc => doc.data());
  
  // Get learning streak
  const streak = await calculateLearningStreak(context.auth.uid);
  
  return {
    success: true,
    progress,
    recentActivity,
    streak
  };
});

// Helper: Update User Progress
async function updateUserProgress(userId: string, skillArea: string, percentage: number) {
  const progressRef = admin.firestore().collection('userProgress').doc(userId);
  const progressDoc = await progressRef.get();
  
  const proficiencyLevel = getProficiencyLevel(percentage);
  
  if (!progressDoc.exists) {
    await progressRef.set({
      userId,
      skills: {
        [skillArea]: {
          proficiency: proficiencyLevel,
          percentage,
          lastAssessed: admin.firestore.FieldValue.serverTimestamp(),
          assessmentCount: 1
        }
      },
      overallProgress: percentage,
      totalAssessments: 1,
      certificatesEarned: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } else {
    const progress = progressDoc.data();
    const skillData = progress.skills[skillArea] || { assessmentCount: 0 };
    
    await progressRef.update({
      [`skills.${skillArea}`]: {
        proficiency: proficiencyLevel,
        percentage,
        lastAssessed: admin.firestore.FieldValue.serverTimestamp(),
        assessmentCount: skillData.assessmentCount + 1
      },
      totalAssessments: admin.firestore.FieldValue.increment(1),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
}

// Helper: Get Proficiency Level
function getProficiencyLevel(percentage: number): string {
  if (percentage >= 90) return 'Expert';
  if (percentage >= 75) return 'Advanced';
  if (percentage >= 60) return 'Intermediate';
  if (percentage >= 40) return 'Beginner';
  return 'Novice';
}
```

**Firestore Schema:**
```javascript
assessments/{assessmentId}
  - assessmentId: string
  - title: string
  - description: string
  - skillArea: string
  - difficulty: 'easy' | 'medium' | 'hard'
  - duration: number (minutes)
  - passingScore: number
  - questions: [
      {
        id: string,
        type: 'mcq' | 'coding' | 'subjective',
        question: string,
        options: string[] (for mcq),
        correctAnswer: string (for mcq),
        testCases: [] (for coding),
        rubric: string (for subjective),
        points: number,
        explanation: string
      }
    ]

assessmentAttempts/{attemptId}
  - attemptId: string
  - userId: string
  - assessmentId: string
  - skillArea: string
  - startedAt: timestamp
  - completedAt: timestamp
  - status: 'in_progress' | 'completed' | 'abandoned'
  - answers: object
  - score: number
  - percentage: number
  - correctAnswers: number
  - totalQuestions: number
  - feedback: array

userProgress/{userId}
  - userId: string
  - skills: {
      [skillArea]: {
        proficiency: 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
        percentage: number,
        lastAssessed: timestamp,
        assessmentCount: number
      }
    }
  - overallProgress: number
  - totalAssessments: number
  - certificatesEarned: number
  - learningStreak: number
  - createdAt: timestamp
  - updatedAt: timestamp
```

**Key Features:**
- Multiple question types (MCQ, coding, subjective)
- Automated grading for objective questions
- AI-powered evaluation for subjective answers
- Real-time code execution and testing
- Detailed feedback and explanations
- Skill proficiency tracking
- Progress visualization
- Certificate generation for achievements
- Learning streak gamification


### 3.5 Content & Recommendation Engine Module

**Purpose:** Deliver personalized, multilingual content and intelligent recommendations.

**Components:**
- Content Management System
- Translation Service
- Recommendation Algorithm
- Content Caching & Delivery
- Search & Discovery

**Technical Implementation:**

```typescript
// Cloud Function: Get Personalized Content
exports.getPersonalizedContent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { contentType, limit = 10 } = data;
  
  // Get user profile and progress
  const userDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
  const user = userDoc.data();
  
  const progressDoc = await admin.firestore()
    .collection('userProgress')
    .doc(context.auth.uid)
    .get();
  const progress = progressDoc.exists ? progressDoc.data() : null;
  
  // Get recommendations using AI
  const recommendations = await generateRecommendations(
    user.careerGoals,
    user.currentSkills,
    progress,
    contentType,
    limit
  );
  
  // Fetch content in user's preferred language
  const content = await fetchContentInLanguage(recommendations, user.language);
  
  return { success: true, content };
});

// Helper: Generate Recommendations
async function generateRecommendations(
  careerGoals: string[],
  currentSkills: string[],
  progress: any,
  contentType: string,
  limit: number
) {
  const prompt = `
    User Profile:
    - Career Goals: ${careerGoals.join(', ')}
    - Current Skills: ${currentSkills.join(', ')}
    - Progress: ${JSON.stringify(progress?.skills || {})}
    
    Recommend ${limit} ${contentType} items that will help the user progress toward their goals.
    Consider skill gaps and learning progression.
    
    Return as JSON array with: id, title, skillArea, difficulty, relevanceScore
  `;
  
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const recommendations = JSON.parse(result.response.text());
  
  return recommendations;
}

// Helper: Fetch Content in Language
async function fetchContentInLanguage(recommendations: any[], language: string) {
  const contentPromises = recommendations.map(async (rec) => {
    const contentDoc = await admin.firestore()
      .collection('content')
      .doc(rec.id)
      .get();
    
    if (!contentDoc.exists) return null;
    
    const content = contentDoc.data();
    
    // Get translated version if not in English
    if (language !== 'en' && !content.translations?.[language]) {
      const translated = await translateContent(content, language);
      
      // Cache translation
      await admin.firestore().collection('content').doc(rec.id).update({
        [`translations.${language}`]: translated
      });
      
      return { ...content, ...translated };
    }
    
    return language === 'en' ? content : { ...content, ...content.translations[language] };
  });
  
  const content = await Promise.all(contentPromises);
  return content.filter(c => c !== null);
}

// Helper: Translate Content
async function translateContent(content: any, targetLanguage: string) {
  const { Translate } = require('@google-cloud/translate').v2;
  const translate = new Translate();
  
  const [titleTranslation] = await translate.translate(content.title, targetLanguage);
  const [descriptionTranslation] = await translate.translate(content.description, targetLanguage);
  const [bodyTranslation] = await translate.translate(content.body, targetLanguage);
  
  return {
    title: titleTranslation,
    description: descriptionTranslation,
    body: bodyTranslation
  };
}

// Cloud Function: Search Content
exports.searchContent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { query, filters } = data;
  
  // Get user language
  const userDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
  const language = userDoc.data()?.language || 'en';
  
  // Search in Firestore (in production, use Algolia or Elasticsearch)
  let searchQuery = admin.firestore().collection('content');
  
  if (filters?.skillArea) {
    searchQuery = searchQuery.where('skillArea', '==', filters.skillArea);
  }
  
  if (filters?.difficulty) {
    searchQuery = searchQuery.where('difficulty', '==', filters.difficulty);
  }
  
  const results = await searchQuery.limit(20).get();
  
  // Filter by search query (simple text matching)
  const filteredResults = results.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(content => {
      const searchText = `${content.title} ${content.description} ${content.tags?.join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
  
  // Translate if needed
  const translatedResults = await Promise.all(
    filteredResults.map(async (content) => {
      if (language !== 'en' && content.translations?.[language]) {
        return { ...content, ...content.translations[language] };
      }
      return content;
    })
  );
  
  return { success: true, results: translatedResults };
});
```

**Firestore Schema:**
```javascript
content/{contentId}
  - contentId: string
  - title: string
  - description: string
  - body: string (markdown or HTML)
  - contentType: 'article' | 'video' | 'tutorial' | 'practice'
  - skillArea: string
  - difficulty: 'easy' | 'medium' | 'hard'
  - estimatedTime: number (minutes)
  - tags: string[]
  - author: string
  - createdAt: timestamp
  - updatedAt: timestamp
  - views: number
  - likes: number
  - translations: {
      mr: { title, description, body },
      hi: { title, description, body }
    }
  - mediaUrls: {
      thumbnail: string,
      video: string,
      images: string[]
    }
  - prerequisites: string[]
  - relatedContent: string[]
```

**Key Features:**
- AI-powered personalized recommendations
- Automatic content translation with caching
- Multi-language search
- Content filtering by skill area and difficulty
- Related content suggestions
- View and engagement tracking
- Offline content caching
- Progressive content loading


## 4. Data Flow Explanation

### 4.1 User Authentication Flow

```
1. User opens app → Service Worker checks cache → Loads cached UI
2. User clicks "Sign In" → Frontend shows auth options
3. User selects method (Email/Google/Phone)
4. Frontend calls Firebase Auth SDK
5. Firebase Auth validates credentials
6. On success: Firebase returns ID token
7. Frontend stores token in localStorage
8. Frontend calls Cloud Function with token
9. Cloud Function verifies token with Firebase Admin SDK
10. Cloud Function fetches/creates user profile from Firestore
11. Frontend receives user data and updates state
12. User redirected to dashboard
```

### 4.2 Learning Content Flow

```
1. User navigates to learning module
2. Frontend checks IndexedDB for cached content
3. If cached and fresh → Display immediately
4. If not cached or stale:
   a. Frontend calls getPersonalizedContent Cloud Function
   b. Function authenticates user via Firebase Auth
   c. Function fetches user profile and progress from Firestore
   d. Function calls Gemini API for recommendations
   e. Function fetches content from Firestore
   f. Function checks if translation exists
   g. If no translation → Call Cloud Translation API
   h. Function caches translation in Firestore
   i. Function returns content to frontend
5. Frontend displays content
6. Frontend caches content in IndexedDB
7. Service Worker caches for offline access
```

### 4.3 AI Interview Flow

```
1. User starts interview → Frontend calls startInterview
2. Cloud Function creates session in Firestore
3. Function calls Gemini API to generate first question
4. Question stored in Firestore and returned to frontend
5. Frontend displays question to user
6. User types/speaks answer
7. If voice → Frontend uses Web Speech API to convert to text
8. Frontend calls submitAnswer with answer text
9. Cloud Function retrieves question context from Firestore
10. Function sends question + answer to Gemini for evaluation
11. Gemini returns feedback and score
12. Function updates Firestore with results
13. Function returns feedback to frontend
14. Frontend displays feedback
15. User clicks "Next Question"
16. Repeat steps 2-14 for each question
17. After final question → Function calculates overall score
18. Function generates summary feedback via Gemini
19. Function updates user's interview history
20. Frontend displays interview results
```

### 4.4 Assessment Flow

```
1. User selects assessment → Frontend calls getAssessment
2. Cloud Function fetches assessment from Firestore
3. Function creates attempt record
4. Frontend receives questions and displays
5. User answers questions (MCQ/Coding/Subjective)
6. For coding questions:
   a. User writes code in Monaco Editor
   b. Frontend provides syntax highlighting
   c. User can test code locally (optional)
7. User submits assessment → Frontend calls submitAssessment
8. Cloud Function retrieves assessment and attempt
9. For each question:
   a. MCQ → Compare with correct answer
   b. Coding → Execute code with test cases
   c. Subjective → Send to Gemini for evaluation
10. Function calculates total score
11. Function updates attempt record in Firestore
12. Function updates user progress
13. If score >= 80% → Generate certificate
14. Function returns results to frontend
15. Frontend displays detailed results with feedback
```

### 4.5 Offline Sync Flow

```
1. User performs action while offline
2. Frontend stores action in IndexedDB queue
3. Service Worker intercepts network requests
4. Service Worker returns cached responses
5. When connection restored:
   a. Service Worker detects online status
   b. Frontend processes IndexedDB queue
   c. Frontend sends queued actions to Cloud Functions
   d. Cloud Functions process and update Firestore
   e. Frontend receives confirmations
   f. Frontend updates local cache
   g. Frontend clears processed items from queue
6. Background sync ensures data consistency
```

## 5. Security Considerations

### 5.1 Authentication & Authorization

**Implementation:**
- Firebase Authentication for user identity management
- JWT tokens for API authentication
- Token refresh mechanism for long sessions
- Role-based access control (RBAC) in Firestore Security Rules

**Security Rules Example:**
```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only read/write their own learning roadmap
    match /learningRoadmaps/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only read/write their own interview sessions
    match /interviews/{sessionId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Users can only read/write their own assessment attempts
    match /assessmentAttempts/{attemptId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Content is read-only for authenticated users
    match /content/{contentId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins via Cloud Functions
    }
    
    // Assessments are read-only for authenticated users
    match /assessments/{assessmentId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins via Cloud Functions
    }
  }
}
```

### 5.2 Data Protection

**Encryption:**
- TLS 1.3 for all data in transit
- Firestore automatic encryption at rest
- Sensitive data (PII) encrypted with additional layer
- API keys stored in Firebase Environment Config

**Privacy:**
- Minimal data collection (only necessary information)
- User consent for data processing
- Data anonymization for analytics
- Right to data deletion (GDPR compliance)
- No sharing of personal data with third parties

### 5.3 API Security

**Cloud Functions Security:**
```typescript
// Middleware for authentication
function authenticate(context: functions.https.CallableContext) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }
  return context.auth.uid;
}

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each user to 100 requests per windowMs
});

// Input validation
function validateInput(data: any, schema: any) {
  const { error } = schema.validate(data);
  if (error) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      error.details[0].message
    );
  }
}
```

**API Key Management:**
- Gemini API key stored in Secret Manager
- Environment-specific keys (dev, staging, prod)
- Key rotation policy (every 90 days)
- Usage monitoring and alerts

### 5.4 Content Security

**XSS Prevention:**
- Content sanitization before rendering
- CSP (Content Security Policy) headers
- DOMPurify for HTML sanitization

**Code Execution Security:**
- Sandboxed code execution for coding assessments
- Resource limits (CPU, memory, time)
- Restricted system calls
- Output sanitization

## 6. Scalability Considerations

### 6.1 Database Optimization

**Firestore Best Practices:**
- Denormalization for read-heavy operations
- Composite indexes for complex queries
- Pagination for large result sets
- Batch operations for bulk updates
- Subcollections for hierarchical data

**Caching Strategy:**
```typescript
// Multi-level caching
1. Browser Cache (Service Worker) → 1 hour
2. CDN Cache (Firebase Hosting) → 24 hours
3. Application Cache (IndexedDB) → 7 days
4. Firestore Cache → Real-time updates
```

### 6.2 Cloud Functions Optimization

**Performance:**
- Cold start mitigation (keep functions warm)
- Connection pooling for external APIs
- Async/await for parallel operations
- Timeout configuration (max 540s)
- Memory allocation based on workload

**Example:**
```typescript
// Optimized Cloud Function
exports.optimizedFunction = functions
  .runWith({
    timeoutSeconds: 60,
    memory: '512MB',
    minInstances: 1 // Keep warm
  })
  .https.onCall(async (data, context) => {
    // Parallel operations
    const [user, progress, content] = await Promise.all([
      getUser(context.auth.uid),
      getProgress(context.auth.uid),
      getContent(data.contentId)
    ]);
    
    return { user, progress, content };
  });
```

### 6.3 Frontend Optimization

**Performance Techniques:**
- Code splitting (lazy loading routes)
- Image optimization (WebP, lazy loading)
- Virtual scrolling for long lists
- Debouncing for search inputs
- Memoization for expensive computations
- Service Worker for offline support

**Bundle Size Optimization:**
```javascript
// Dynamic imports
const InterviewModule = lazy(() => import('./modules/Interview'));
const AssessmentModule = lazy(() => import('./modules/Assessment'));

// Tree shaking
import { specific } from 'library'; // Instead of import * as lib

// Compression
// Gzip/Brotli compression enabled on Firebase Hosting
```

### 6.4 Gemini API Optimization

**Cost & Performance:**
- Request batching where possible
- Response caching for common queries
- Prompt optimization (shorter, clearer)
- Model selection (gemini-pro vs gemini-pro-vision)
- Rate limiting to prevent abuse
- Fallback mechanisms for API failures

**Example:**
```typescript
// Cache Gemini responses
const cache = new Map();

async function getCachedGeminiResponse(prompt: string) {
  const cacheKey = hashPrompt(prompt);
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const response = await callGeminiAPI(prompt);
  cache.set(cacheKey, response);
  
  return response;
}
```

### 6.5 Monitoring & Auto-scaling

**Metrics to Monitor:**
- Cloud Function execution time
- Firestore read/write operations
- API error rates
- User session duration
- Page load times
- Gemini API usage and costs

**Auto-scaling:**
- Firebase automatically scales Cloud Functions
- Firestore automatically scales with usage
- CDN automatically handles traffic spikes
- Set budget alerts for cost control


## 7. Mobile-First & Low-Bandwidth Design

### 7.1 Progressive Web App (PWA) Implementation

**Service Worker Strategy:**
```javascript
// service-worker.js
const CACHE_NAME = 'eduvistara-v1';
const OFFLINE_URL = '/offline.html';

// Cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image' || 
      event.request.destination === 'style' ||
      event.request.destination === 'script') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
  
  // Network-first strategy for API calls
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncOfflineData());
  }
});
```

**Manifest Configuration:**
```json
{
  "name": "EduVistara",
  "short_name": "EduVistara",
  "description": "AI-powered multilingual learning platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4285f4",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 7.2 Data Usage Optimization

**Lite Mode Features:**
- Disable auto-play videos
- Load low-resolution images
- Reduce animation and transitions
- Compress API responses
- Limit background sync frequency
- Show data usage warnings

**Implementation:**
```typescript
// Data usage tracking
class DataUsageTracker {
  private totalBytes = 0;
  
  trackRequest(size: number) {
    this.totalBytes += size;
    localStorage.setItem('dataUsage', this.totalBytes.toString());
    
    // Warn user if exceeding threshold
    if (this.totalBytes > 50 * 1024 * 1024) { // 50MB
      this.showDataWarning();
    }
  }
  
  getUsage() {
    return {
      total: this.totalBytes,
      formatted: this.formatBytes(this.totalBytes)
    };
  }
  
  private formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
}
```

### 7.3 Offline Functionality

**Offline-First Architecture:**
```typescript
// Offline queue manager
class OfflineQueue {
  private queue: any[] = [];
  
  async addToQueue(action: any) {
    this.queue.push({
      ...action,
      timestamp: Date.now(),
      id: generateId()
    });
    
    await this.saveQueue();
  }
  
  async processQueue() {
    if (!navigator.onLine) return;
    
    const queue = await this.loadQueue();
    
    for (const action of queue) {
      try {
        await this.executeAction(action);
        await this.removeFromQueue(action.id);
      } catch (error) {
        console.error('Failed to process action:', error);
        // Keep in queue for retry
      }
    }
  }
  
  private async saveQueue() {
    const db = await openDB('eduvistara');
    await db.put('queue', this.queue, 'actions');
  }
  
  private async loadQueue() {
    const db = await openDB('eduvistara');
    return await db.get('queue', 'actions') || [];
  }
}
```

**Downloadable Content:**
```typescript
// Content download manager
class ContentDownloader {
  async downloadForOffline(contentId: string) {
    const content = await fetchContent(contentId);
    
    // Store in IndexedDB
    const db = await openDB('eduvistara');
    await db.put('content', content, contentId);
    
    // Cache associated media
    if (content.mediaUrls) {
      await this.cacheMedia(content.mediaUrls);
    }
    
    return { success: true, size: this.calculateSize(content) };
  }
  
  async getOfflineContent() {
    const db = await openDB('eduvistara');
    return await db.getAll('content');
  }
  
  async deleteOfflineContent(contentId: string) {
    const db = await openDB('eduvistara');
    await db.delete('content', contentId);
  }
}
```

### 7.4 Responsive UI Design

**Mobile-First CSS:**
```css
/* Base styles for mobile */
.container {
  padding: 16px;
  max-width: 100%;
}

.button {
  min-height: 48px; /* Touch-friendly */
  padding: 12px 24px;
  font-size: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 24px;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
  
  .sidebar {
    display: block; /* Show sidebar on desktop */
  }
}
```

**Touch Optimization:**
```typescript
// Touch gesture handling
class TouchHandler {
  private startX = 0;
  private startY = 0;
  
  handleTouchStart(e: TouchEvent) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }
  
  handleTouchEnd(e: TouchEvent) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = endX - this.startX;
    const diffY = endY - this.startY;
    
    // Swipe detection
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        this.onSwipeRight();
      } else {
        this.onSwipeLeft();
      }
    }
  }
}
```

## 8. Internationalization (i18n) Implementation

### 8.1 Language Management

**i18next Configuration:**
```typescript
// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'mr'],
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
```

**Translation Files Structure:**
```
/public/locales/
  /en/
    common.json
    auth.json
    learning.json
    interview.json
  /hi/
    common.json
    auth.json
    learning.json
    interview.json
  /mr/
    common.json
    auth.json
    learning.json
    interview.json
```

**Example Translation File:**
```json
// /public/locales/hi/common.json
{
  "welcome": "स्वागत है",
  "dashboard": "डैशबोर्ड",
  "learning": "सीखना",
  "interview": "साक्षात्कार",
  "assessment": "मूल्यांकन",
  "profile": "प्रोफ़ाइल",
  "logout": "लॉग आउट",
  "continue": "जारी रखें",
  "submit": "जमा करें",
  "cancel": "रद्द करें"
}
```

### 8.2 Dynamic Content Translation

**Translation Service:**
```typescript
// Cloud Function: Translate content on-demand
exports.translateContent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { text, targetLanguage } = data;
  
  // Check cache first
  const cacheKey = `${hashText(text)}_${targetLanguage}`;
  const cached = await getCachedTranslation(cacheKey);
  
  if (cached) {
    return { success: true, translation: cached };
  }
  
  // Translate using Cloud Translation API
  const { Translate } = require('@google-cloud/translate').v2;
  const translate = new Translate();
  
  const [translation] = await translate.translate(text, targetLanguage);
  
  // Cache translation
  await cacheTranslation(cacheKey, translation);
  
  return { success: true, translation };
});
```

## 9. Testing Strategy

### 9.1 Frontend Testing

**Unit Tests (Jest + React Testing Library):**
```typescript
// Example: LanguageSelector.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from './LanguageSelector';

describe('LanguageSelector', () => {
  test('renders all language options', () => {
    render(<LanguageSelector />);
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('हिंदी')).toBeInTheDocument();
    expect(screen.getByText('मराठी')).toBeInTheDocument();
  });
  
  test('changes language on selection', () => {
    const onLanguageChange = jest.fn();
    render(<LanguageSelector onChange={onLanguageChange} />);
    
    fireEvent.click(screen.getByText('हिंदी'));
    expect(onLanguageChange).toHaveBeenCalledWith('hi');
  });
});
```

**Integration Tests:**
```typescript
// Example: Interview flow test
describe('Interview Flow', () => {
  test('complete interview session', async () => {
    const { getByText, getByRole } = render(<InterviewModule />);
    
    // Start interview
    fireEvent.click(getByText('Start Interview'));
    
    // Answer questions
    const answerInput = getByRole('textbox');
    fireEvent.change(answerInput, { target: { value: 'My answer' } });
    fireEvent.click(getByText('Submit Answer'));
    
    // Wait for feedback
    await waitFor(() => {
      expect(getByText(/feedback/i)).toBeInTheDocument();
    });
    
    // Complete interview
    fireEvent.click(getByText('Next Question'));
    // ... continue for all questions
  });
});
```

### 9.2 Backend Testing

**Cloud Functions Tests:**
```typescript
// Example: Cloud Function test
import * as admin from 'firebase-admin';
import * as test from 'firebase-functions-test';

const testEnv = test();

describe('generateLearningRoadmap', () => {
  afterAll(() => {
    testEnv.cleanup();
  });
  
  test('generates roadmap for valid input', async () => {
    const wrapped = testEnv.wrap(generateLearningRoadmap);
    
    const data = {
      educationLevel: 'undergraduate',
      careerGoals: ['software-developer'],
      currentSkills: ['html', 'css']
    };
    
    const context = {
      auth: { uid: 'test-user-123' }
    };
    
    const result = await wrapped(data, context);
    
    expect(result.success).toBe(true);
    expect(result.roadmap).toBeDefined();
    expect(result.roadmap.modules).toBeInstanceOf(Array);
  });
});
```

### 9.3 End-to-End Testing

**Cypress Tests:**
```typescript
// Example: E2E test
describe('User Onboarding', () => {
  it('completes onboarding flow', () => {
    cy.visit('/');
    
    // Select language
    cy.contains('मराठी').click();
    
    // Sign up
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('Sign Up').click();
    
    // Complete onboarding
    cy.contains('Education Level').click();
    cy.contains('Undergraduate').click();
    
    cy.contains('Career Goals').click();
    cy.contains('Software Developer').click();
    
    cy.contains('Continue').click();
    
    // Verify dashboard
    cy.url().should('include', '/dashboard');
    cy.contains('डैशबोर्ड').should('be.visible');
  });
});
```


## 10. Deployment Architecture

### 10.1 Environment Setup

**Development Environment:**
- Local Firebase Emulator Suite
- Project IDX for cloud-based development
- Hot reload for rapid iteration
- Mock Gemini API responses for testing

**Staging Environment:**
- Separate Firebase project
- Limited Gemini API quota
- Test data and users
- Performance monitoring enabled

**Production Environment:**
- Production Firebase project
- Full Gemini API quota
- Real user data
- Enhanced monitoring and alerting
- CDN optimization

### 10.2 CI/CD Pipeline

**GitHub Actions Workflow:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase

on:
  push:
    branches:
      - main
      - develop

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run lint
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v2
        with:
          name: build
          path: build/
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/download-artifact@v2
        with:
          name: build
          path: build/
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: eduvistara-prod
```

### 10.3 Monitoring & Logging

**Firebase Performance Monitoring:**
```typescript
// Initialize Performance Monitoring
import { getPerformance } from 'firebase/performance';

const perf = getPerformance(app);

// Custom traces
const trace = perf.trace('load_learning_content');
trace.start();
// ... load content
trace.stop();

// Automatic monitoring
// - Page load times
// - Network requests
// - App startup time
```

**Error Tracking:**
```typescript
// Crashlytics for error tracking
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics(app);

// Log custom events
logEvent(analytics, 'interview_completed', {
  role: 'software-developer',
  score: 85,
  duration: 1200
});

// Error logging
window.addEventListener('error', (event) => {
  logEvent(analytics, 'exception', {
    description: event.message,
    fatal: false
  });
});
```

**Cloud Monitoring Dashboard:**
- Function execution times
- Error rates by function
- Firestore read/write operations
- Gemini API usage and costs
- User engagement metrics
- System health indicators

## 11. Future Enhancements

### 11.1 Phase 2 Features (6-12 months)

**Advanced AI Features:**
- Video-based mock interviews with facial expression analysis
- AI-powered code review and suggestions
- Personalized study schedule optimization
- Predictive analytics for job placement success
- Adaptive learning difficulty based on real-time performance

**Social Learning:**
- Peer-to-peer learning groups
- Discussion forums by topic
- Live doubt-solving sessions
- Mentor matching system
- Collaborative coding challenges

**Career Services:**
- Job board integration
- Resume builder with AI suggestions
- Company-specific interview preparation
- Salary negotiation guidance
- Career path exploration tool

**Content Expansion:**
- More regional languages (Tamil, Telugu, Bengali, Gujarati)
- Domain-specific tracks (Data Science, Web Dev, Mobile Dev, etc.)
- Industry certifications preparation
- Soft skills training modules
- English communication improvement

### 11.2 Phase 3 Features (12-24 months)

**Advanced Platform Features:**
- Live instructor-led classes
- Virtual reality (VR) learning experiences
- Gamification with leaderboards and competitions
- Corporate training partnerships
- University curriculum integration

**AI Enhancements:**
- Custom AI tutors for each subject
- Emotion detection for engagement tracking
- Learning style adaptation (visual, auditory, kinesthetic)
- Automated content generation from textbooks
- Multi-modal learning (text, audio, video, interactive)

**Mobile Native Apps:**
- Native iOS app (Swift/SwiftUI)
- Native Android app (Kotlin/Jetpack Compose)
- Offline-first architecture
- Push notifications for reminders
- Background content sync

**Analytics & Insights:**
- Detailed learning analytics dashboard
- Skill gap analysis with industry trends
- Personalized career recommendations
- Learning efficiency metrics
- Comparative performance insights

### 11.3 Technical Improvements

**Performance Optimization:**
- Edge computing for faster response times
- GraphQL API for efficient data fetching
- Server-side rendering (SSR) for better SEO
- Advanced caching strategies
- Database sharding for scalability

**AI Model Improvements:**
- Fine-tuned models for Indian education context
- Custom speech recognition for regional accents
- Improved translation quality with context awareness
- Reduced latency with model optimization
- Cost optimization through model selection

**Infrastructure:**
- Multi-region deployment for global reach
- Advanced DDoS protection
- Automated backup and disaster recovery
- Blue-green deployment for zero downtime
- Kubernetes for container orchestration (if needed)

### 11.4 Business Features

**Monetization:**
- Freemium model with premium features
- Subscription tiers (Basic, Pro, Enterprise)
- One-time course purchases
- Corporate training packages
- Affiliate partnerships with educational institutions

**Admin Dashboard:**
- Content management system
- User management and analytics
- Revenue and subscription tracking
- A/B testing framework
- Feature flag management

**Compliance & Accessibility:**
- WCAG 2.1 AAA compliance
- Screen reader optimization
- Keyboard navigation improvements
- High contrast mode
- Dyslexia-friendly fonts

## 12. Development Roadmap

### 12.1 MVP (Months 1-3)

**Core Features:**
- User authentication and onboarding
- Language selection (Marathi, Hindi, English)
- Basic learning content (3-5 career paths)
- Simple AI interview practice (text-based)
- Basic skill assessments (MCQ only)
- Progress tracking dashboard
- Mobile-responsive UI

**Technical Setup:**
- Firebase project setup
- Gemini API integration
- Basic Cloud Functions
- Firestore schema design
- Frontend scaffolding (React)
- PWA configuration

### 12.2 Beta Release (Months 4-6)

**Enhanced Features:**
- Personalized learning roadmap
- Advanced AI interviews (voice support)
- Coding assessments with auto-grading
- Content recommendation engine
- Offline mode
- Performance optimization
- Security hardening

**Testing & Refinement:**
- Beta user testing (500-1000 users)
- Bug fixes and improvements
- Performance optimization
- Content quality review
- User feedback integration

### 12.3 Public Launch (Month 6)

**Launch Preparation:**
- Marketing website
- User documentation
- Tutorial videos
- Support system
- Analytics setup
- Monitoring and alerting

**Post-Launch:**
- User acquisition campaigns
- Content expansion
- Feature iterations based on feedback
- Performance monitoring
- Bug fixes and updates

## 13. Success Metrics & KPIs

### 13.1 Technical Metrics

- **Uptime**: 99.5%+
- **Page Load Time**: <3s on 3G
- **API Response Time**: <200ms (p95)
- **Error Rate**: <0.1%
- **Crash-Free Rate**: >99.9%

### 13.2 User Metrics

- **User Registrations**: 50,000 in 6 months
- **DAU/MAU Ratio**: >30%
- **Session Duration**: >20 minutes average
- **Retention (30-day)**: >40%
- **NPS Score**: >40

### 13.3 Business Metrics

- **Free-to-Paid Conversion**: >10%
- **CAC**: <₹500
- **LTV:CAC Ratio**: >3:1
- **MRR Growth**: >15% month-over-month
- **Churn Rate**: <5% monthly

### 13.4 Learning Outcome Metrics

- **Course Completion**: >60%
- **Skill Improvement**: 70% show measurable improvement
- **Interview Confidence**: 60% report improvement
- **Job Placement**: Track success stories
- **User Satisfaction**: >4.2 star rating

---

## 14. Conclusion

EduVistara's design leverages modern cloud technologies, AI capabilities, and mobile-first principles to create an accessible, scalable, and effective learning platform. The architecture prioritizes:

1. **User Experience**: Mobile-first, offline-capable, multilingual
2. **Scalability**: Serverless architecture, auto-scaling, efficient caching
3. **Security**: Authentication, authorization, encryption, privacy
4. **Performance**: Optimized loading, efficient data usage, fast responses
5. **Maintainability**: Modular design, comprehensive testing, monitoring

The phased development approach ensures rapid MVP delivery while maintaining flexibility for future enhancements based on user feedback and market demands.

---

**Document Version**: 1.0  
**Last Updated**: February 9, 2026  
**Status**: Ready for Implementation  
**Next Steps**: Create tasks.md with detailed implementation tasks
