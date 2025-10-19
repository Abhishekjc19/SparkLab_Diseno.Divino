# Java 21 Installation PowerShell Script
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "              Java 21 Installation Helper Script" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host

# Check if running as administrator
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
$isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if ($isAdmin) {
    Write-Host "✅ Running as Administrator" -ForegroundColor Green
} else {
    Write-Host "⚠️  Not running as Administrator" -ForegroundColor Yellow
    Write-Host "   Some installation methods may require administrator privileges" -ForegroundColor Yellow
}
Write-Host

# Check current Java installation
Write-Host "Current Java installations:" -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    Write-Host "Active: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ No Java found in PATH" -ForegroundColor Red
}

# Check for existing Java installations
$javaPaths = @(
    "${env:ProgramFiles}\Java",
    "${env:ProgramFiles(x86)}\Java",
    "${env:ProgramFiles}\Microsoft",
    "${env:ProgramFiles}\Eclipse Adoptium",
    "${env:ProgramFiles}\Temurin"
)

Write-Host "`nExisting Java installations:" -ForegroundColor Yellow
foreach ($path in $javaPaths) {
    if (Test-Path $path) {
        Get-ChildItem $path | Where-Object { $_.Name -like "*jdk*" -or $_.Name -like "*java*" } | ForEach-Object {
            Write-Host "Found: $($_.FullName)" -ForegroundColor Cyan
        }
    }
}

Write-Host "`n================================================================" -ForegroundColor Cyan
Write-Host "                    Installation Methods" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

Write-Host "`n1. Using Windows Package Manager (winget):" -ForegroundColor Yellow
if (Get-Command winget -ErrorAction SilentlyContinue) {
    Write-Host "   ✅ winget is available" -ForegroundColor Green
    Write-Host "   Run: winget install Microsoft.OpenJDK.21" -ForegroundColor White
} else {
    Write-Host "   ❌ winget not available" -ForegroundColor Red
}

Write-Host "`n2. Using Chocolatey:" -ForegroundColor Yellow
if (Get-Command choco -ErrorAction SilentlyContinue) {
    Write-Host "   ✅ Chocolatey is available" -ForegroundColor Green
    Write-Host "   Run: choco install openjdk21" -ForegroundColor White
} else {
    Write-Host "   ❌ Chocolatey not available" -ForegroundColor Red
}

Write-Host "`n3. Manual Download:" -ForegroundColor Yellow
Write-Host "   Microsoft OpenJDK: https://docs.microsoft.com/en-us/java/openjdk/download#openjdk-21" -ForegroundColor White
Write-Host "   Oracle JDK: https://www.oracle.com/java/technologies/downloads/#java21" -ForegroundColor White
Write-Host "   Eclipse Temurin: https://adoptium.net/temurin/releases/?version=21" -ForegroundColor White

Write-Host "`n================================================================" -ForegroundColor Cyan
Write-Host "                After Installation Instructions" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

Write-Host "`n1. Set Environment Variables:" -ForegroundColor Yellow
Write-Host "   JAVA_HOME = C:\Program Files\Microsoft\jdk-21.x.x.x-hotspot (or your install path)" -ForegroundColor White
Write-Host "   Add %JAVA_HOME%\bin to PATH" -ForegroundColor White

Write-Host "`n2. Verify Installation:" -ForegroundColor Yellow
Write-Host "   java -version" -ForegroundColor White
Write-Host "   javac -version" -ForegroundColor White

Write-Host "`n3. Test Your Project:" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   .\mvnw clean compile" -ForegroundColor White
Write-Host "   .\mvnw test" -ForegroundColor White

Write-Host "`nPress any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")