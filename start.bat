@echo off
setlocal enabledelayedexpansion

if not exist .env (
    echo ===================================================
    echo       Hyderabad 360 - Environment Setup
    echo ===================================================
    echo A local .env file was not found. Let's create one.
    echo (You can press ENTER to skip any key you don't have yet)
    echo.
    set /p GEMINI_KEY="Enter Gemini API Key (from AI Studio): "
    set /p CLIENT_ID="Enter Google OAuth Client ID (optional): "
    set /p CLIENT_SECRET="Enter Google OAuth Client Secret (optional): "
    
    echo GEMINI_API_KEY=!GEMINI_KEY!> .env
    echo GOOGLE_CLIENT_ID=!CLIENT_ID!>> .env
    echo GOOGLE_CLIENT_SECRET=!CLIENT_SECRET!>> .env
    echo.
    echo [SUCCESS] Credentials saved to .env file!
    echo.
)

echo Starting Hyderabad 360 server...
python server.py
pause
