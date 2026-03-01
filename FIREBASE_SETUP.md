# Firebase Setup Guide

## Error: auth/configuration-not-found

This error means Firebase Authentication is not enabled in your Firebase project.

## Quick Fix Steps

### 1. Go to Firebase Console
Visit: https://console.firebase.google.com/

### 2. Select Your Project
Click on your project name

### 3. Enable Authentication
1. Click on "Authentication" in the left sidebar
2. Click "Get Started" button
3. Go to "Sign-in method" tab

### 4. Enable Sign-in Methods
Enable these methods:

**Email/Password:**
1. Click on "Email/Password"
2. Toggle "Enable" switch
3. Click "Save"

**Google Sign-In:**
1. Click on "Google"
2. Toggle "Enable" switch
3. Add your support email
4. Click "Save"

### 5. Set Up Authorized Domains
1. Go to "Settings" tab in Authentication
2. Under "Authorized domains", add:
   - `localhost` (should be there by default)
   - Your production domain (when deploying)

### 6. Verify Setup
After enabling authentication:
1. Restart your dev server
2. Try signing up again
3. Should work now!

## Additional Setup (Recommended)

### Enable Firestore Database
1. Click "Firestore Database" in sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (closest to you)
5. Click "Enable"

### Enable Storage
1. Click "Storage" in sidebar
2. Click "Get started"
3. Choose "Start in test mode"
4. Click "Done"

## Security Rules (After Testing)

Once your app is working, update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Troubleshooting

### Still getting errors?
1. Check if Authentication is enabled (green checkmark)
2. Verify Email/Password provider is enabled
3. Clear browser cache and try again
4. Check browser console for specific error messages

### Need help?
- Firebase Documentation: https://firebase.google.com/docs/auth
- Firebase Console: https://console.firebase.google.com/
