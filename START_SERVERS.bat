@echo off
echo ========================================
echo   Kuchnahi Website - Start Servers
echo ========================================
echo.
echo This script will start both frontend and backend servers
echo.
echo Backend will run on port 3001
echo Frontend will run on port 3000
echo.
echo Press Ctrl+C to stop a server
echo ========================================
echo.

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd kuchnahi-website\backend && npm run dev"

timeout /t 3 /nobreak

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd kuchnahi-website\frontend && npm run dev"

echo.
echo ========================================
echo   Both servers are starting...
echo ========================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Open your browser and navigate to: http://localhost:3000
echo.
pause
