╔════════════════════════════════════════════════════════════╗
║                                                            ║
║              EduVistara - Quick Start Guide                ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

✅ PROBLEM FIXED: Port changed from 3000 to 5173!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 EASIEST WAY TO START:

1. Right-click on "START.ps1"
2. Click "Run with PowerShell"
3. Wait for server to start
4. Browser opens automatically to http://localhost:5173

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 ALTERNATIVE METHOD (If PowerShell doesn't work):

1. Open Command Prompt in this folder:
   - Hold Shift + Right-click in empty space
   - Select "Open PowerShell window here"

2. Type: npm run dev

3. Press Enter

4. Open browser to: http://localhost:5173

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  IF .BAT FILES OPEN IN TEXT EDITOR:

This is a Windows file association issue. Use one of these:

Option A: Right-click START_HERE.bat → "Open with" → "Command Prompt"

Option B: Use START.ps1 instead (PowerShell script)

Option C: Open Command Prompt manually and type: npm run dev

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ WHAT YOU SHOULD SEE:

Terminal:
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose

Browser:
  - Blue gradient landing page
  - Stats cards
  - Login/Signup buttons
  - NO "Coming soon" messages

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 BEFORE FIRST RUN:

1. Make sure Node.js is installed (v18+)
   Check: node --version

2. Make sure npm is installed (v9+)
   Check: npm --version

3. Create .env file from .env.example
   Add your Firebase credentials

4. Install dependencies (first time only):
   npm install

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ COMMON ISSUES:

Issue: "npm command not found"
Fix: Install Node.js from https://nodejs.org

Issue: Page shows "Coming soon"
Fix: Press Ctrl+Shift+R to hard refresh browser

Issue: Firebase errors
Fix: Check .env file has correct Firebase credentials

Issue: Port 3000 not working
Fix: FIXED! Now uses port 5173

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 MORE HELP:

- HOW_TO_START.txt - Detailed instructions
- TROUBLESHOOTING.md - All solutions
- README_FINAL.md - Complete guide

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 YOU'RE READY!

Just run START.ps1 or type "npm run dev" in Command Prompt!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
