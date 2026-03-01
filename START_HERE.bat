@echo off
title EduVistara - Development Server
color 0A

echo.
echo ========================================
echo    EduVistara - Starting Server
echo ========================================
echo.

echo [1/3] Checking environment...
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Creating from .env.example...
    copy .env.example .env >nul
    echo Please edit .env and add Firebase credentials!
    echo.
)

echo [2/3] Killing old Node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [3/3] Starting development server...
echo.
echo ========================================
echo  Server will start on: http://localhost:5173
echo  Browser will open automatically
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
