# EduVistara - Troubleshooting Guide

## Issue: npm install taking too long

### Solutions:

1. **Use npm cache clean**
```bash
npm cache clean --force
npm install
```

2. **Delete node_modules and reinstall**
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

3. **Use faster mirror (if in India)**
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

4. **Install only production dependencies first**
```bash
npm install --production
npm install
```

## Issue: Website shows "Coming Soon" on modules

This means you're running an OLD version of the code. The new modules are already implemented!

### Solution:

1. **Stop all running servers**
   - Press `Ctrl+C` in any terminal running npm
   - Or run: `taskkill /F /IM node.exe`

2. **Clear browser cache**
   - Press `Ctrl+Shift+Delete`
   - Clear cached images and files
   - Or use Incognito mode

3. **Restart the dev server**
   - Double-click `RESTART.bat`
   - Or run: `npm run dev`

4. **Check the correct port**
   - Vite runs on `http://localhost:5173` (NOT 3000!)
   - If you see port 3000, close that tab
   - Open `http://localhost:5173`

## Issue: Port 3000 instead of 5173

You might have another server running or old cached version.

### Solution:

1. **Kill all Node processes**
```bash
taskkill /F /IM node.exe
```

2. **Check what's running on port 3000**
```bash
netstat -ano | findstr :3000
```

3. **Start fresh**
```bash
npm run dev
```

4. **Use the correct URL**
   - Open: `http://localhost:5173`
   - NOT: `http://localhost:3000`

## Issue: .bat file only opens when double-clicked

This is normal behavior for Windows batch files!

### How to use .bat files:

1. **Double-click** `RESTART.bat` to run
2. Or right-click → "Run as administrator"
3. Or open Command Prompt and type: `RESTART.bat`

### Available .bat files:

- `RESTART.bat` - Clean restart (kills old processes)
- `RUN.bat` - Quick start
- `start-dev.bat` - Original start script

## Issue: Modules show placeholder text

If you see "Coming soon..." text, you're viewing old cached files.

### Solution:

1. **Hard refresh the browser**
   - Press `Ctrl+Shift+R` (Chrome/Edge)
   - Or `Ctrl+F5`

2. **Clear browser cache completely**
   - Press `Ctrl+Shift+Delete`
   - Select "Cached images and files"
   - Click "Clear data"

3. **Use Incognito/Private mode**
   - Press `Ctrl+Shift+N` (Chrome/Edge)
   - Navigate to `http://localhost:5173`

4. **Verify files are updated**
   - Check `src/pages/Learning.tsx` - should have ~200+ lines
   - Check `src/pages/Interview.tsx` - should have ~200+ lines
   - Check `src/pages/Assessment.tsx` - should have ~400+ lines

## Issue: Firebase errors

### Error: "auth/configuration-not-found"

**Solution:**
1. Go to Firebase Console
2. Select your project
3. Click "Authentication" in left menu
4. Click "Get Started"
5. Enable "Email/Password" provider
6. Enable "Google" provider

### Error: "Firebase: Error (auth/invalid-api-key)"

**Solution:**
1. Check your `.env` file
2. Verify all Firebase credentials are correct
3. Make sure there are no extra spaces
4. Restart the dev server

## Issue: Page keeps loading forever

### Solution:

1. **Check browser console** (Press F12)
   - Look for red errors
   - Check Network tab for failed requests

2. **Verify Firebase is configured**
   - Check `.env` file exists
   - Check all values are filled in
   - No placeholder text like "your_api_key"

3. **Check AuthContext timeout**
   - The app has a 3-second timeout
   - If it's still loading, check console for errors

## Issue: Google Sign-In doesn't work

### Solution:

1. **Enable Google Sign-In in Firebase**
   - Firebase Console → Authentication
   - Sign-in method → Google
   - Click "Enable"
   - Add your email as test user

2. **Add authorized domains**
   - Firebase Console → Authentication → Settings
   - Authorized domains → Add "localhost"

3. **Check popup blockers**
   - Allow popups for localhost
   - Try in Incognito mode

## Quick Verification Checklist

✅ Node.js installed (v18+)
✅ npm installed (v9+)
✅ `.env` file exists with Firebase credentials
✅ Firebase Authentication enabled
✅ Running on port 5173 (not 3000)
✅ Browser cache cleared
✅ No old Node processes running

## Still Having Issues?

1. **Check file contents**
```bash
# Learning.tsx should be ~200 lines
type src\pages\Learning.tsx | find /c /v ""

# Interview.tsx should be ~200 lines
type src\pages\Interview.tsx | find /c /v ""
```

2. **Verify TypeScript compilation**
```bash
npx tsc --noEmit
# Should show: Exit Code: 0
```

3. **Check for errors**
```bash
npm run dev
# Look for any red error messages
```

4. **Try the simple app**
   - Edit `src/main.tsx`
   - Change `import App from './App'` to `import App from './App.simple'`
   - Restart server

## Getting Help

If none of these solutions work:

1. Check the browser console (F12) for errors
2. Check the terminal for error messages
3. Verify all files are saved
4. Try restarting your computer
5. Make sure you're using the latest code

## Common Mistakes

❌ Using port 3000 instead of 5173
❌ Not clearing browser cache
❌ Old Node processes still running
❌ Missing .env file
❌ Firebase not configured
❌ Popup blockers enabled
❌ Using old cached version

## Success Indicators

✅ URL shows `localhost:5173`
✅ Landing page has blue gradient background
✅ Dashboard shows stats cards
✅ Learning page shows course cards
✅ Interview page shows interview types
✅ Assessment page shows assessment cards
✅ No "Coming soon" messages

---

**Last Updated**: February 27, 2026
