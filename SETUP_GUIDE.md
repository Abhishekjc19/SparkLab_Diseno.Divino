# SparkLab 2025 - Complete Setup Guide

## 🚀 Quick Start

Follow these steps to get your SparkLab 2025 application running:

### Prerequisites

Before starting, make sure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **Java 17+** installed ([Download here](https://adoptium.net/))
- **Docker Desktop** installed ([Download here](https://www.docker.com/products/docker-desktop/))
- **Git** installed ([Download here](https://git-scm.com/))

### 1. Install Dependencies

#### Frontend Dependencies
```bash
cd frontend
npm install
```

#### Backend Dependencies (if using Maven directly)
```bash
cd backend
./mvnw clean install
```

### 2. Start Development Environment

#### Option A: Using Docker (Recommended)
Start the complete stack with one command:
```bash
docker-compose up --build
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 8080
- Frontend app on port 3000

#### Option B: Manual Setup

1. **Start PostgreSQL Database**
```bash
# Using Docker for database only
docker run --name sparklab-db -e POSTGRES_DB=sparklab -e POSTGRES_USER=sparklab -e POSTGRES_PASSWORD=sparklab123 -p 5432:5432 -d postgres:15
```

2. **Start Backend**
```bash
cd backend
./mvnw spring-boot:run
```

3. **Start Frontend**
```bash
cd frontend
npm run dev
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html (once backend is running)

## 🛠️ Development Scripts

### Frontend Scripts
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

### Backend Scripts
```bash
# Run in development mode
./mvnw spring-boot:run

# Build JAR file
./mvnw clean package

# Run tests
./mvnw test

# Run with specific profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

## 🐛 Error Resolution Status

✅ **RESOLVED ISSUES:**
- TypeScript configuration deprecation warnings
- Vite path resolution configuration
- Docker containerization setup
- Maven wrapper configuration
- ESLint configuration

⏳ **EXPECTED ISSUES (Will resolve after npm install):**
- Missing React dependencies: `Cannot find module 'react'`
- Missing Redux dependencies: `Cannot find module '@reduxjs/toolkit'`
- Missing Vite dependencies: `Cannot find module 'vite'`
- Tailwind CSS rules: `Unknown at rule @tailwind`

## 📁 Project Structure

```
sparklab-2025/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Spring Boot backend
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml            # Maven dependencies
├── docker-compose.yml      # Multi-service orchestration
└── README.md              # This file
```

## 🔧 Configuration Files

### Environment Variables

Create these files for local development:

**Frontend (.env.local)**
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_URL=ws://localhost:8080/ws
```

**Backend (application-dev.yml)**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/sparklab
    username: sparklab
    password: sparklab123
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update
```

## 🚀 Next Development Steps

Once the setup is complete, the next major features to implement are:

1. **Authentication System** - JWT-based auth with role management
2. **Dashboard Components** - Event timeline and progress tracking  
3. **Real-time Chat** - WebSocket-based team communication
4. **Submission System** - File upload and evaluation
5. **Leaderboard** - Real-time scoring and rankings

## 📞 Support

If you encounter any issues:

1. **Check the logs** - Look at console output for error details
2. **Verify prerequisites** - Ensure all required software is installed
3. **Clear caches** - Try `npm clean-install` or `./mvnw clean install`
4. **Port conflicts** - Make sure ports 3000, 8080, and 5432 are available

## 🎯 SparkLab 2025 Event Details

- **Event**: NMIT's National Product Design Challenge
- **Duration**: 30 hours (October 24-25, 2025)
- **Focus**: Innovation, creativity, and technical excellence
- **Platform**: Modern full-stack web application

Happy coding! 🎉