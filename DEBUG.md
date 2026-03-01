# Debug Guide - White Screen Issue

## Quick Diagnosis

If you're seeing a white screen, follow these steps:

### Step 1: Open Browser Console
1. Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
2. Click on the "Console" tab
3. Look for red error messages

### Step 2: Common Errors and Fixes

#### Error: "Firebase configuration missing"
**Cause**: `.env` file doesn't exist or is incomplete

**Fix**:
```bash
# Create .env file
copy .env.example .env

# Edit .env and add your Firebase credentials
```

Your `.env` should look like:
```env
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
```

#### Error: "Module not found" or "Cannot find module"
**Cause**: Dependencies not installed

**Fix**:
```bash
npm install
```

#### Error: "Failed to fetch" or Network errors
**Cause**: Firebase project not configured or wrong credentials

**Fix**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. Scroll to "Your apps" section
5. Copy the config values to your `.env` file

### Step 3: Verify Setup

Run the verification script:
```bash
npm run verify
```

This will check:
- ✓ Node.js version
- ✓ .env file exists
- ✓ Firebase credentials configured
- ✓ node_modules installed
- ✓ Critical files present

### Step 4: Clear Cache and Restart

```bash
# Stop the dev server (Ctrl+C)

# Clear Vite cache
rmdir /s /q node_modules\.vite

# Restart
npm run dev
```

### Step 5: Check for Port Conflicts

```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# If in use, kill the process
taskkill /PID <process_id> /F
```

## What You Should See

### ✅ Successful Load
When working correctly, you should see:
1. Browser opens to `http://localhost:3000`
2. EduVistara landing page with:
   - Blue/purple gradient header
   - "Learn. Practice. Excel." tagline
   - Feature cards
   - Sign up button

### ❌ White Screen
If you see a white screen:
1. Open Console (F12)
2. Look for errors
3. Follow fixes above

## Console Error Examples

### Example 1: Missing .env
```
❌ Firebase configuration is missing!
Please create a .env file with your Firebase credentials.
Run: npm run verify
```
**Fix**: Create `.env` file with Firebase credentials

### Example 2: Invalid Firebase Config
```
FirebaseError: Firebase: Error (auth/invalid-api-key)
```
**Fix**: Check your `VITE_FIREBASE_API_KEY` in `.env`

### Example 3: Module Not Found
```
Error: Cannot find module '@/contexts/AuthContext'
```
**Fix**: Run `npm install` and restart dev server

## Still Not Working?

### Option 1: Use Error Boundary
The app now has an error boundary that will show you the exact error on screen instead of a white screen.

### Option 2: Check Network Tab
1. Open DevTools (F12)
2. Go to "Network" tab
3. Reload page
4. Look for failed requests (red)

### Option 3: Disable Browser Extensions
Some extensions can interfere with React apps:
1. Open browser in incognito/private mode
2. Try loading the app again

### Option 4: Check File Permissions
Make sure you have read/write permissions in the project folder.

### Option 5: Try Different Browser
Test in Chrome, Firefox, or Edge to rule out browser-specific issues.

## Getting More Help

If none of the above works:

1. **Run verification**:
   ```bash
   npm run verify
   ```

2. **Check console output** when running `npm run dev`

3. **Share the error** from browser console (F12)

4. **Check these files exist**:
   - `.env` (in root directory)
   - `node_modules/` (folder)
   - `src/main.tsx`
   - `src/App.tsx`
   - `index.html`

## Quick Test

To test if React is working at all, temporarily replace `src/App.tsx` with:

```tsx
function App() {
  return <div>Hello World!</div>;
}

export default App;
```

If you see "Hello World!", then the issue is with Firebase or routing.
If you still see white screen, the issue is with the build setup.

---

**Remember**: The most common cause is missing `.env` file with Firebase credentials!
