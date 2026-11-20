@echo off
title Portfolio Backend - Port 5000
echo ===================================================
echo Starting Backend Server on http://localhost:5000...
echo ===================================================
cd /d %~dp0server
node server.js
pause
