@echo off
title Stop Travel Planner
echo =========================================================
echo       STOPPING PLAN MY TRIP SERVERS
echo =========================================================
echo.
echo Stopping any running backend (8085) and frontend (5173)...

powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-NetTCPConnection -LocalPort 8085,5173 -ErrorAction SilentlyContinue | ForEach-Object { $procId = $_.OwningProcess; Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue; Write-Host ('Killed PID: ' + $procId) -ForegroundColor Yellow }; Write-Host 'All Travel Planner servers stopped successfully!' -ForegroundColor Green"

echo.
echo Done! Both ports 8085 and 5173 are now free.
pause
exit
