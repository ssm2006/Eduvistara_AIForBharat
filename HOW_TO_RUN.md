# How to Run EduVistara

## Prerequisites
1. Node.js (v16 or higher)
2. npm or yarn
3. Firebase project with Authentication enabled

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase
1. Copy `.env.example` to `.env`
```bash
cp .env.example .env
```

2. Add your Firebase configuration to `.env`:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

3. Enable Firebase Authentication:
   - Go to Firebase Console
   - Select your project
   - Navigate to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google Sign-In

### 3. Run Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

## Available Features

### ✅ Completed Modules
1. **Landing Page** - Modern landing page with background patterns
2. **Authentication** - Email/Password and Google Sign-In
3. **Dashboard** - User dashboard with stats and quick actions
4. **Learning Module** - Course catalog with progress tracking
5. **Interview Practice** - AI-powered mock interviews (UI ready)
6. **Assessment Module** - Skill assessments with scoring
7. **Profile Page** - User profile with settings and progress

### 🔄 In Progress
- AI Interview integration (requires backend)
- Course content management
- Real-time progress tracking
- Certificate generation

## Troubleshooting

### Issue: Page keeps loading
- Check if Firebase Authentication is enabled
- Verify `.env` file has correct Firebase credentials
- Clear browser cache and reload

### Issue: Google Sign-In doesn't work
- Enable Google Sign-In in Firebase Console
- Add authorized domains in Firebase Console
- Check browser console for errors

### Issue: Build errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (should be v16+)
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Project Structure
```
src/
├── pages/           # All page components
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   ├── Learning.tsx
│   ├── Interview.tsx
│   ├── Assessment.tsx
│   └── Profile.tsx
├── contexts/        # React contexts
│   ├── AuthContext.tsx
│   └── LanguageContext.tsx
├── config/          # Configuration files
│   ├── firebase.ts
│   └── theme.ts
├── routes/          # Routing configuration
│   └── index.tsx
└── types/           # TypeScript types
    └── index.ts
```

## Next Steps
1. Implement AI interview backend with Google Gemini API
2. Add course content and lessons
3. Implement real-time progress tracking
4. Add certificate generation
5. Deploy to production

## Support
For issues or questions, check:
- `FIREBASE_SETUP.md` - Firebase configuration guide
- `QUICKSTART.md` - Quick start guide
- `PROJECT_STATUS.md` - Current project status
