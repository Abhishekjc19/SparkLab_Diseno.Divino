# Java 21 Upgrade Guide

## What We've Done
- Updated `pom.xml` to use Java 21 instead of Java 17
- Updated Spring Boot version from 3.2.0 to 3.3.5 (better Java 21 support)
- Updated Dockerfile to use OpenJDK 21 base images
- Updated Maven wrapper to version 3.9.9 (better Java 21 support)
- Added explicit Maven compiler plugin configuration for Java 21

## Next Steps: Install Java 21

### Option 1: Download from Oracle/OpenJDK (Recommended)
1. Go to https://jdk.java.net/21/ or https://www.oracle.com/java/technologies/downloads/#java21
2. Download OpenJDK 21 or Oracle JDK 21 for Windows x64
3. Install it to `C:\Program Files\Java\jdk-21` or similar location

### Option 2: Use Chocolatey (if available)
```bash
choco install openjdk21
```

### Option 3: Use SDKMAN (if you have it installed)
```bash
sdk install java 21.0.1-open
sdk use java 21.0.1-open
```

## Setting Environment Variables
After installation, update your environment variables:

1. Set `JAVA_HOME` to your Java 21 installation path (e.g., `C:\Program Files\Java\jdk-21`)
2. Update your `PATH` to include `%JAVA_HOME%\bin`

## Verification
Run these commands to verify the upgrade:
```bash
java -version
javac -version
```
Both should show version 21.

## Testing the Project
After installing Java 21, navigate to the backend directory and run:
```bash
cd c:\Sparkle_Diseno_Divino\sparklab-2025\backend
./mvnw clean compile
./mvnw test
```

## Compatibility Notes
- Spring Boot 3.3.5 fully supports Java 21
- All your dependencies should be compatible with Java 21
- The PostgreSQL driver and JWT libraries are compatible with Java 21
- Docker containers will use OpenJDK 21 base images