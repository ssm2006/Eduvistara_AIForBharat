# 🎓 EduVistara - AI-Powered Multilingual EdTech Platform

EduVistara is a comprehensive educational technology platform designed specifically for Indian students, offering personalized learning experiences, AI-powered interview preparation, and skill assessments in multiple languages.

## ✨ Features

### 📚 Learning Module
- **6 Comprehensive Courses**: Web Development, React.js, Data Structures & Algorithms, Communication Skills, Python Programming, and Database Management
- **Structured Learning Path**: Organized modules with video lessons, articles, quizzes, and coding exercises
- **Progress Tracking**: Real-time tracking of course completion and module progress
- **Interactive Content**: Multiple content types including videos, articles, quizzes, and hands-on coding exercises

### 🎤 Interview Preparation
- **AI-Powered Mock Interviews**: Practice with realistic interview scenarios
- **Multiple Interview Types**: Technical, HR, and Behavioral interviews
- **Difficulty Levels**: Easy, Medium, and Hard difficulty options
- **Detailed Feedback**: Get comprehensive feedback on your answers with strengths and areas for improvement
- **Score Tracking**: Monitor your interview performance over time

### 📊 Skill Assessments
- **Comprehensive Tests**: Assess your skills across various domains
- **Multiple Question Types**: MCQ, coding challenges, and subjective questions
- **Instant Results**: Get immediate feedback with detailed explanations
- **Performance Analytics**: Track your assessment scores and progress
- **Skill-Based Testing**: Targeted assessments for specific skill areas

### 🌐 Multilingual Support
- **3 Languages**: English, Hindi (हिंदी), and Marathi (मराठी)
- **Seamless Switching**: Change language anytime from settings
- **Localized Content**: Full translation of UI and content

### 🔐 Authentication & Security
- **Firebase Authentication**: Secure email/password authentication
- **Google Sign-In**: Quick login with Google account
- **Protected Routes**: Secure access to user-specific content
- **User Profiles**: Personalized user profiles with progress tracking

### 📈 Dashboard & Analytics
- **Real-Time Stats**: Track courses completed, interviews practiced, and assessments taken
- **Progress Visualization**: Visual representation of learning progress
- **Achievement System**: Earn achievements as you complete milestones
- **Learning Streak**: Track your daily learning consistency

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Beautiful, responsive components
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server

### Backend & Services
- **Firebase Authentication** - User authentication
- **Firebase Firestore** - NoSQL database
- **Firebase Storage** - File storage
- **Firebase Analytics** - Usage analytics

### State Management
- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic
- **LocalStorage** - Persistent client-side storage

### Internationalization
- **i18next** - Translation framework
- **react-i18next** - React integration

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Firebase account
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/eduvistara-platform.git
cd eduvistara-platform
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Firebase
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Copy your Firebase configuration

### Step 4: Set Up Environment Variables
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### Step 5: Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

OR 
To run it virtually go to: 
https://main.d3eslsf95fmxji.amplifyapp.com

## 📱 Project Structure

```
eduvistara-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ErrorBoundary.tsx
│   ├── config/              # Configuration files
│   │   ├── firebase.ts      # Firebase configuration
│   │   └── theme.ts         # MUI theme configuration
│   ├── contexts/            # React Context providers
│   │   ├── AppStateContext.tsx    # App state management
│   │   ├── AuthContext.tsx        # Authentication context
│   │   └── LanguageContext.tsx    # Language/i18n context
│   ├── data/                # Static data
│   │   └── coursesData.ts   # Course content
│   ├── pages/               # Page components
│   │   ├── Landing.tsx      # Landing page
│   │   ├── Login.tsx        # Login page
│   │   ├── Signup.tsx       # Signup page
│   │   ├── Dashboard.tsx    # User dashboard
│   │   ├── Learning.tsx     # Courses list
│   │   ├── CourseDetail.tsx # Course detail view
│   │   ├── Interview.tsx    # Interview preparation
│   │   ├── InterviewSession.tsx  # Active interview
│   │   ├── Assessment.tsx   # Assessments list
│   │   ├── TestSession.tsx  # Active assessment
│   │   └── Profile.tsx      # User profile
│   ├── routes/              # Route configuration
│   │   └── index.tsx        # App routes
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── i18n.ts              # i18n configuration
├── public/
│   └── locales/             # Translation files
│       ├── en/              # English translations
│       ├── hi/              # Hindi translations
│       └── mr/              # Marathi translations
├── .env                     # Environment variables (not in git)
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🎯 Usage

### For Students
1. **Sign Up**: Create an account or sign in with Google
2. **Choose Language**: Select your preferred language (English, Hindi, or Marathi)
3. **Complete Onboarding**: Set up your profile and learning goals
4. **Start Learning**: Browse courses and start your learning journey
5. **Practice Interviews**: Prepare for real interviews with AI-powered mock sessions
6. **Take Assessments**: Test your skills and track your progress

### For Developers
1. **Fork the Repository**: Create your own copy
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Changes**: Implement your feature
4. **Commit Changes**: `git commit -m 'Add amazing feature'`
5. **Push to Branch**: `git push origin feature/amazing-feature`
6. **Open Pull Request**: Submit your changes for review

## 🔧 Configuration

### Firebase Setup
See `FIREBASE_SETUP.md` for detailed Firebase configuration instructions.

### Theme Customization
Edit `src/config/theme.ts` to customize colors, typography, and component styles.

### Adding New Languages
1. Create translation files in `public/locales/[language-code]/`
2. Update `src/i18n.ts` to include the new language
3. Add language option in `src/contexts/LanguageContext.tsx`

## 📊 Features in Detail

### Intelligent State Management
- Automatic progress tracking
- LocalStorage persistence
- Real-time stats calculation
- Course completion detection

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces
- Adaptive layouts

### Performance Optimizations
- Code splitting
- Lazy loading
- Optimized bundle size
- Fast page transitions

## 🐛 Known Issues

- Language selection currently only affects auth pages (working on full app translation)
- Learning time tracking not yet implemented
- Streak tracking not yet implemented

## 🗺️ Roadmap

- [ ] Full multilingual support across all pages
- [ ] AI-powered personalized learning paths
- [ ] Video content integration
- [ ] Real-time collaboration features
- [ ] Mobile app (React Native)
- [ ] Offline mode support
- [ ] Gamification features
- [ ] Social learning features
- [ ] Certificate generation
- [ ] Payment integration for premium content

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- Firebase for backend services
- React team for the amazing framework
- All contributors who help improve this project

## 📞 Support

For support, email support@eduvistara.com or join our Slack channel.

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ for Indian Students**
