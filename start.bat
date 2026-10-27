@echo off
title Diwali Dhamaka - Localhost Server
cd /d "%~dp0"

echo ===================================================
echo     DIWALI DHAMAKA - LOCALHOST DEV SERVER
echo ===================================================
echo.

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [1/2] Installing dependencies (first run only)...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install failed. Please ensure Node.js is installed.
        pause
        exit /b %errorlevel%
    )
) else (
    echo [1/2] Dependencies already installed.
)

echo.
echo [2/2] Launching Vite Dev Server on http://localhost:3000...
echo.

:: Launch the browser after 2 seconds in the background
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"

:: Start the Vite server
call npm run dev

pause
