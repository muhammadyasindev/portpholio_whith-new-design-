@echo off
title Launch Portfolio Full-Stack
echo ==========================================================
echo Starting Full Stack Developer Portfolio and Admin System...
echo ==========================================================
start "Portfolio Backend (Port 5050)" cmd /k "cd /d "%~dp0server" && node server.js"
start "Portfolio Frontend (Port 5173)" cmd /k "cd /d "%~dp0client" && node ./node_modules/vite/bin/vite.js"
echo.
echo Launching your browser...
ping -n 4 127.0.0.1 >nul
start http://localhost:5173
echo.
echo ==========================================================
echo [SUCCESS] Both servers are running!
echo Frontend Website: http://localhost:5173
echo Admin Panel:      http://localhost:5173/admin
echo Backend Server:   http://localhost:5050
echo ==========================================================
echo You can keep this window open or close it.
pause
