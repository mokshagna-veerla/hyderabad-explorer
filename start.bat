@echo off
setlocal enabledelayedexpansion

if not exist .env (
    echo ===================================================
    echo       Hyderabad 360 Google OAuth Setup
    echo ===================================================
    echo A local .env file was not found. Let's create one.
    echo.
    set /p CLIENT_ID="Enter Google Client ID: "
    set /p CLIENT_SECRET="Enter Google Client Secret: "
    
    echo GOOGLE_CLIENT_ID=!CLIENT_ID!> .env
    echo GOOGLE_CLIENT_SECRET=!CLIENT_SECRET!>> .env
    echo.
    echo [SUCCESS] Credentials saved to .env file!
    echo.
)

echo Starting Hyderabad 360 server...
python server.py
pause
