@echo off
echo ========================================
echo   EduVistara - Clean Restart
echo ========================================
echo.

echo Step 1: Killing any running Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul
echo.

echo Step 2: Checking .env file...
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please copy .env.example to .env and add your Firebase credentials.
    echo.
    echo Creating .env from .env.example...
    copy .env.example .env
    echo.
    echo Please edit .env file and add your Firebase credentials before continuing.
    pause
)
echo .env file exists ✓
echo.

echo Step 3: Starting development server...
echo.
echo The app will open at: http://localhost:5173
echo NOT port 3000!
echo.
echo If you see port 3000, close that browser tab and use port 5173
echo.
echo Press Ctrl+C to stop the server
echo.

start http://localhost:5173

call npm run dev

pause
