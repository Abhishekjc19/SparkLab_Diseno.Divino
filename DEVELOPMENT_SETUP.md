# 🚀 SparkLab 2025 Development Setup Guide

## 🎯 **Dual IDE Setup: IntelliJ + VS Code**

### 📊 **Architecture Overview**
```
┌─────────────────┐    HTTP/WebSocket    ┌─────────────────┐
│   Frontend      │ ◄─────────────────► │   Backend       │
│   VS Code       │     :3000 → :8080   │   IntelliJ      │
│   React + Vite  │                     │   Spring Boot   │
└─────────────────┘                     └─────────────────┘
```

## 🔧 **Backend Setup (IntelliJ IDEA)**

### 1. **Open Project in IntelliJ:**
```
File → Open → c:\Sparkle_Diseno_Divino\sparklab-2025\backend
```

### 2. **IntelliJ Configuration:**
- ✅ IntelliJ will auto-detect Maven project
- ✅ Java 17 SDK will be detected automatically
- ✅ Dependencies will be downloaded automatically
- ✅ Spring Boot configuration will be recognized

### 3. **Run Backend:**
**Option A: Quick Run**
- Open `src/main/java/com/nmit/sparklab/SparkLabApplication.java`
- Click green arrow ▶️ next to `public static void main`

**Option B: Run Configuration**
- Run → Edit Configurations → Add New → Application
- Main class: `com.nmit.sparklab.SparkLabApplication`
- Name: `SparkLab Backend`
- Save and run

### 4. **Backend will start on:**
- 🌐 **HTTP**: `http://localhost:8080`
- 📡 **WebSocket**: `ws://localhost:8080/ws`
- 📋 **API Docs**: `http://localhost:8080/swagger-ui.html`
- ❤️ **Health Check**: `http://localhost:8080/api/v1/actuator/health`

---

## 🎨 **Frontend Setup (VS Code)**

### 1. **Open Project in VS Code:**
```
File → Open Folder → c:\Sparkle_Diseno_Divino\sparklab-2025\frontend
```

### 2. **Install Dependencies:**
```bash
cd c:\Sparkle_Diseno_Divino\sparklab-2025\frontend
npm install
```

### 3. **VS Code Extensions (Recommended):**
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

### 4. **Run Frontend:**
```bash
npm run dev
```

### 5. **Frontend will start on:**
- 🌐 **Development**: `http://localhost:3000`
- ✅ **Auto-reload** on file changes
- 🔄 **Proxy API calls** to backend (`/api` → `localhost:8080`)

---

## 🔗 **Integration & Communication**

### **API Communication:**
- Frontend (`localhost:3000`) → Backend (`localhost:8080`)
- Vite proxy handles `/api` requests automatically
- WebSocket connections for real-time features

### **Key Endpoints:**
```typescript
// API Base URL (handled by Vite proxy)
const API_BASE = '/api/v1'

// Examples:
GET  /api/v1/auth/profile
POST /api/v1/auth/login
GET  /api/v1/dashboard/stats
POST /api/v1/submissions
```

---

## 🛠️ **Development Workflow**

### **Daily Development:**
1. **Start Backend**: Run SparkLabApplication in IntelliJ
2. **Start Frontend**: Run `npm run dev` in VS Code terminal
3. **Develop**: Code changes auto-reload in both environments

### **Testing:**
```bash
# Backend Tests (IntelliJ)
Run → Run 'All Tests' or use Maven: ./mvnw test

# Frontend Tests (VS Code)
npm test
```

### **Building:**
```bash
# Backend Build
./mvnw clean package

# Frontend Build
npm run build
```

---

## 🚀 **Quick Start Commands**

### **Backend (IntelliJ Terminal):**
```bash
cd c:\Sparkle_Diseno_Divino\sparklab-2025\backend
./mvnw spring-boot:run
```

### **Frontend (VS Code Terminal):**
```bash
cd c:\Sparkle_Diseno_Divino\sparklab-2025\frontend
npm install
npm run dev
```

---

## 🔧 **Configuration Files**

### **Backend Configuration:**
```properties
# src/main/resources/application.properties
server.port=8080
spring.profiles.active=dev
spring.datasource.url=jdbc:postgresql://localhost:5432/sparklab2025
```

### **Frontend Configuration:**
```typescript
// vite.config.ts
server: {
  port: 3000,
  proxy: {
    '/api': 'http://localhost:8080',
    '/ws': 'ws://localhost:8080'
  }
}
```

---

## 🐛 **Troubleshooting**

### **Backend Issues:**
- **Port 8080 in use**: Change port in `application.properties`
- **Database connection**: Ensure PostgreSQL is running
- **Java version**: Use Java 17+ (Java 21 after installation)

### **Frontend Issues:**
- **CORS errors**: Backend handles CORS for localhost:3000
- **API calls fail**: Check backend is running on :8080
- **Dependencies**: Run `npm install` if packages missing

### **Both:**
- **Hot reload not working**: Restart development servers
- **WebSocket issues**: Check firewall settings

---

## 🎯 **Development URLs**

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend Dev | http://localhost:3000 | Main development UI |
| Backend API | http://localhost:8080 | REST API endpoints |
| API Documentation | http://localhost:8080/swagger-ui.html | Interactive API docs |
| Health Check | http://localhost:8080/actuator/health | Backend health status |

---

## 🎉 **You're All Set!**

Your development environment is perfectly configured:
- ✅ **IntelliJ**: Professional Java/Spring Boot development
- ✅ **VS Code**: Modern React/TypeScript development  
- ✅ **Hot Reload**: Both frontend and backend auto-refresh
- ✅ **API Integration**: Seamless communication between services
- ✅ **Professional Workflow**: Industry-standard development setup

**Happy Coding!** 🚀