@echo off
echo ========================================
echo   CareerCrafter Resume Builder Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully
    echo.
)

REM Initialize database
echo 🔄 Initializing database...
call npm run init-db
if %errorlevel% neq 0 (
    echo ❌ Database initialization failed
    pause
    exit /b 1
)

echo.
echo 🚀 Starting CareerCrafter Resume Builder...
echo.
echo 📱 Frontend will be available at: http://localhost:3000
echo 🔗 API will be available at: http://localhost:3000/api
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server
call npm start