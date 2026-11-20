@echo off
title Portfolio Website - Port 5050
echo ================================================================
echo Starting Full Stack Developer Portfolio on http://localhost:5050
echo ================================================================
cd /d %~dp0server
start http://localhost:5050
node server.js
pause
