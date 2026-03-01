# GitHub Export Guide for EduVistara

## Prerequisites
- Git installed on your system
- GitHub account created
- GitHub Desktop (optional, but recommended for beginners)

## Method 1: Using Git Command Line

### Step 1: Initialize Git Repository (if not already done)
```bash
git init
```

### Step 2: Add All Files
```bash
git add .
```

### Step 3: Create Initial Commit
```bash
git commit -m "Initial commit: EduVistara EdTech Platform"
```

### Step 4: Create GitHub Repository
1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `eduvistara-platform` (or your preferred name)
5. Choose Public or Private
6. DO NOT initialize with README (we already have files)
7. Click "Create repository"

### Step 5: Link Local Repository to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/eduvistara-platform.git
```

### Step 6: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## Method 2: Using GitHub Desktop (Easier)

### Step 1: Download GitHub Desktop
- Download from: https://desktop.github.com/
- Install and sign in with your GitHub account

### Step 2: Add Repository
1. Open GitHub Desktop
2. Click "File" → "Add Local Repository"
3. Browse to your project folder
4. If Git is not initialized, it will ask to create a repository - click "Create Repository"

### Step 3: Commit Changes
1. You'll see all your files in the "Changes" tab
2. Add a commit message: "Initial commit: EduVistara EdTech Platform"
3. Click "Commit to main"

### Step 4: Publish to GitHub
1. Click "Publish repository" button at the top
2. Choose repository name: `eduvistara-platform`
3. Add description (optional)
4. Choose Public or Private
5. Click "Publish Repository"

## Important: Protect Your Secrets

### Before Pushing to GitHub, Check .gitignore

Your `.gitignore` file should include:
```
# dependencies
node_modules/

# production
dist/
build/

# environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

### CRITICAL: Never Commit .env File
Your `.env` file contains Firebase credentials. Make sure it's in `.gitignore`!

If you accidentally committed it:
```bash
git rm --cached .env
git commit -m "Remove .env from tracking"
git push
```

Then go to Firebase Console and regenerate your API keys!

## After Pushing to GitHub

### Update README.md
Create a proper README with:
- Project description
- Features
- Setup instructions
- Technologies used
- Screenshots

### Add .env.example
Create `.env.example` with placeholder values:
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

## Deploying to Production

### Option 1: Vercel (Recommended)
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Add environment variables from .env
6. Click "Deploy"

### Option 2: Netlify
1. Go to https://netlify.com
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add environment variables
8. Click "Deploy"

### Option 3: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Useful Git Commands

### Check Status
```bash
git status
```

### View Commit History
```bash
git log --oneline
```

### Create New Branch
```bash
git checkout -b feature-name
```

### Push Changes
```bash
git add .
git commit -m "Your commit message"
git push
```

### Pull Latest Changes
```bash
git pull origin main
```

## Troubleshooting

### "Permission denied" Error
- Check if you're logged in: `git config user.name` and `git config user.email`
- Set credentials:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

### "Repository not found" Error
- Check remote URL: `git remote -v`
- Update remote URL:
  ```bash
  git remote set-url origin https://github.com/YOUR_USERNAME/REPO_NAME.git
  ```

### Large File Error
- Remove large files from tracking
- Add them to .gitignore
- Consider using Git LFS for large files

## Best Practices

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Describe what changed and why
3. **Use Branches**: Create feature branches for new work
4. **Pull Before Push**: Always pull latest changes before pushing
5. **Review Changes**: Check what you're committing with `git diff`
6. **Protect Secrets**: Never commit API keys or passwords

## Next Steps

After pushing to GitHub:
1. Add a LICENSE file (MIT, Apache, etc.)
2. Create a CONTRIBUTING.md guide
3. Set up GitHub Actions for CI/CD
4. Add badges to README (build status, license, etc.)
5. Enable GitHub Pages for documentation

## Need Help?

- GitHub Docs: https://docs.github.com
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf
- GitHub Community: https://github.community/

---

**Your project is now ready to be shared with the world! 🚀**
