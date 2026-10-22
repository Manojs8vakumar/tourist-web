@echo off
title Travel Planner Launcher
echo =========================================================
echo       PLAN MY TRIP - FULL STACK RUNNER
echo =========================================================
echo.

:: 1. Ensure ports 8085 and 5173 are clean
echo [1/3] Checking and clearing ports 8085 and 5173...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-NetTCPConnection -LocalPort 8085,5173 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }" >nul 2>&1

:: 2. Launch Spring Boot Backend in a separate window
echo [2/3] Starting Spring Boot Backend (Port 8085)...
start "Travel Planner - Backend (Port 8085)" cmd /k "cd /d %~dp0backend && echo Starting Spring Boot on Port 8085... && .\mvnw.cmd spring-boot:run"

:: 3. Launch Vite React Frontend in a separate window
echo [3/3] Starting React Vite Frontend (Port 5173)...
start "Travel Planner - Frontend (Port 5173)" cmd /k "cd /d %~dp0frontend && echo Starting React Vite... && npm.cmd run dev"

echo.
echo =========================================================
echo Both services are launching!
echo Backend will be ready at:  http://localhost:8085
echo Frontend will be ready at: http://localhost:5173
echo =========================================================
echo.
echo Opening browser in 5 seconds...
timeout /t 5 >nul
start http://localhost:5173

exit
