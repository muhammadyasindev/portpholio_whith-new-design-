@echo off
title Portfolio Frontend - Port 5173
echo ====================================================
echo Starting Frontend Client on http://localhost:5173...
echo ====================================================
cd /d %~dp0client
npm run dev
pause
