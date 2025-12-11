@echo off
echo Setting up PostgreSQL for Upperclass Platform...

REM Install PostgreSQL if not installed
echo Checking PostgreSQL installation...
where psql >nul 2>nul
if %errorlevel% neq 0 (
    echo PostgreSQL is not installed.
    echo Please download and install from: https://www.postgresql.org/download/windows/
    pause
    exit /b 1
)

REM Start PostgreSQL service
echo Starting PostgreSQL service...
net start postgresql-x64-15 >nul 2>nul
if %errorlevel% neq 0 (
    net start postgresql-x64-14 >nul 2>nul
    if %errorlevel% neq 0 (
        echo Failed to start PostgreSQL service.
        echo Please start it manually from Services (services.msc)
        pause
    )
)

REM Create database and user
echo Creating database and user...
psql -U postgres -c "CREATE DATABASE upperclass_db;" 2>nul
if %errorlevel% neq 0 (
    echo Failed to connect to PostgreSQL as 'postgres' user.
    echo Please run the following commands manually:
    echo psql -U postgres
    echo CREATE DATABASE upperclass_db;
    echo CREATE USER upperclass_user WITH PASSWORD 'upperclass_password';
    echo GRANT ALL PRIVILEGES ON DATABASE upperclass_db TO upperclass_user;
    pause
    exit /b 1
)

psql -U postgres -c "CREATE USER upperclass_user WITH PASSWORD 'upperclass_password';" 2>nul
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE upperclass_db TO upperclass_user;" 2>nul

echo PostgreSQL setup complete!
echo Database: upperclass_db
echo User: upperclass_user
echo Password: upperclass_password
pause