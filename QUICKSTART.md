# EduVistara Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Firebase account
- Git (optional)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Firebase

1. **Create a Firebase project** at https://console.firebase.google.com

2. **Enable Authentication:**
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"
   - Enable "Google"

3. **Enable Firestore:**
   - Go to Firestore Database
   - Create database in production mode
   - Start collection (will be created automatically)

4. **Get your Firebase config:**
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Copy the Firebase configuration

5. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

6. **Add your Firebase credentials to `.env`:**
   ```
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

### Step 3: Run the Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Step 4: Test the Application

1. **Visit the landing page** - Should see the hero section with background pattern
2. **Click "Get Started Free"** - Navigate to signup
3. **Create an account** - Use email/password or Google Sign-In
4. **Explore the dashboard** - See all modules
5. **Try each module:**
   - Learning - Browse courses
   - Interview - Practice sessions
   - Assessment - Take tests
   - Profile - View settings

## 🎯 Available Pages

| Page | URL | Description |
|------|-----|-------------|
| Landing | `/` | Home page with features |
| Login | `/login` | Sign in page |
| Signup | `/signup` | Create account |
| Language | `/language` | Select language |
| Dashboard | `/dashboard` | Main dashboard (protected) |
| Learning | `/learning` | Course catalog (protected) |
| Interview | `/interview` | Interview practice (protected) |
| Assessment | `/assessment` | Skill tests (protected) |
| Profile | `/profile` | User profile (protected) |

## 🔧 Common Issues & Solutions

### Issue: "Firebase configuration not found"
**Solution**: Make sure you've created the `.env` file and added all Firebase credentials.

### Issue: "Authentication not enabled"
**Solution**: Enable Email/Password and Google authentication in Firebase Console.

### Issue: Page keeps loading
**Solution**: Check browser console for errors. Make sure Firebase is properly configured.

### Issue: Google Sign-In doesn't work
**Solution**: 
1. Enable Google authentication in Firebase Console
2. Add authorized domains in Firebase Console > Authentication > Settings
3. For localhost, it should work by default

### Issue: Build errors
**Solution**: Run `npm install` again to ensure all dependencies are installed.

## 📦 Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

## 🧪 Testing

Currently using mock data for all modules. To test:

1. **Authentication**: Create account and sign in
2. **Dashboard**: View stats and quick actions
3. **Learning**: Browse courses and see progress
4. **Interview**: View interview sessions
5. **Assessment**: See available tests
6. **Profile**: Edit profile and settings

## 🌐 Multilingual Support

The app supports three languages:
- English (EN)
- Hindi (HI)
- Marathi (MR)

Change language from:
- Landing page header (language button)
- Language selection page (`/language`)
- Profile settings

## 🎨 Customization

### Change Theme Colors
Edit `src/config/theme.ts`:
```typescript
primary: {
  main: '#4169E1', // Change this to your color
}
```

### Add New Courses
Edit `src/pages/Learning.tsx` and add to the `courses` array.

### Add New Interview Sessions
Edit `src/pages/Interview.tsx` and add to the `sessions` array.

### Add New Assessments
Edit `src/pages/Assessment.tsx` and add to the `assessments` array.

## 📱 Mobile Testing

The app is responsive. Test on mobile by:
1. Opening Chrome DevTools (F12)
2. Click the device toolbar icon
3. Select a mobile device
4. Refresh the page

## 🔐 Security Notes

- Never commit `.env` file to Git
- Keep Firebase credentials secure
- Use environment variables for all sensitive data
- Enable Firebase security rules in production

## 📚 Next Steps

1. **Add Real Content**: Replace mock data with actual courses
2. **Implement AI**: Set up Cloud Functions for AI features
3. **Add Analytics**: Track user behavior
4. **Deploy**: Host on Firebase Hosting or Vercel
5. **Mobile App**: Consider React Native version

## 🆘 Need Help?

- Check `PROJECT_STATUS.md` for detailed status
- Check `FIREBASE_SETUP.md` for Firebase setup
- Check browser console for errors
- Review Firebase Console for auth/database issues

---

**Ready to start?** Run `npm run dev` and visit `http://localhost:5173`!
