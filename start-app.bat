@echo off
REM VectorShift - Start Backend and Frontend

cd /d "%~dp0"

echo Installing backend dependencies...
cd backend
pip install -r requirements.txt
start "VectorShift Backend" cmd /k "uvicorn main:app --reload"
cd ..

timeout /t 3 /nobreak

echo Installing frontend dependencies...
cd frontendView
call npm install
start "VectorShift Frontend" cmd /k "npm start"
