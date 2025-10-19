@echo off
echo ================================================================
echo              Java 21 Installation Script for Windows
echo ================================================================
echo.
echo This script will help you install Java 21 and set up your environment
echo.

REM Check current Java version
echo Current Java installation:
where java >nul 2>&1
if %ERRORLEVEL% == 0 (
    java -version
) else (
    echo No Java found in PATH
)
echo.

echo ================================================================
echo                    Installation Options:
echo ================================================================
echo.
echo Option 1: Download and install Microsoft OpenJDK 21
echo   URL: https://docs.microsoft.com/en-us/java/openjdk/download#openjdk-21
echo.
echo Option 2: Download and install Oracle JDK 21
echo   URL: https://www.oracle.com/java/technologies/downloads/#java21
echo.
echo Option 3: Use Windows Package Manager (if available)
echo   Command: winget install Microsoft.OpenJDK.21
echo.

echo ================================================================
echo                After Installation:
echo ================================================================
echo.
echo 1. Set JAVA_HOME environment variable to your Java 21 installation
echo    Example: C:\Program Files\Microsoft\jdk-21.0.5.11-hotspot
echo.
echo 2. Add %%JAVA_HOME%%\bin to your PATH environment variable
echo.
echo 3. Open a new command prompt and verify:
echo    java -version
echo    javac -version
echo.
echo 4. Return to your project and run:
echo    cd "%~dp0backend"
echo    mvnw clean compile
echo    mvnw test
echo.

echo ================================================================
echo              Environment Variable Setup Guide:
echo ================================================================
echo.
echo To set environment variables in Windows:
echo 1. Press Win + X and select "System"
echo 2. Click "Advanced system settings"
echo 3. Click "Environment Variables"
echo 4. Under "System variables" click "New"
echo 5. Variable name: JAVA_HOME
echo 6. Variable value: [Your Java 21 installation path]
echo 7. Find "Path" in System variables and click "Edit"
echo 8. Add new entry: %%JAVA_HOME%%\bin
echo 9. Click OK to save all changes
echo 10. Restart your terminal/IDE
echo.

pause