# 🚀 SparkLab 2025 - Setup Instructions

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Java** 17+ ([Download](https://adoptium.net/))
- **Maven** 3.8+ ([Download](https://maven.apache.org/download.cgi))
- **PostgreSQL** 15+ ([Download](https://www.postgresql.org/download/))
- **Docker** (optional, for containerized setup) ([Download](https://www.docker.com/))

## 🏗️ Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd sparklab-2025
```

### 2. Database Setup

#### Option A: Local PostgreSQL
1. Create a new database:
```sql
CREATE DATABASE sparklab2025;
CREATE USER sparklab_user WITH PASSWORD 'sparklab_password';
GRANT ALL PRIVILEGES ON DATABASE sparklab2025 TO sparklab_user;
```

#### Option B: Docker PostgreSQL
```bash
docker run --name sparklab-postgres \
  -e POSTGRES_DB=sparklab2025 \
  -e POSTGRES_USER=sparklab_user \
  -e POSTGRES_PASSWORD=sparklab_password \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### 3. Backend Setup (Spring Boot)

```bash
# Navigate to backend directory
cd backend

# Install dependencies and run
./mvnw clean install
./mvnw spring-boot:run

# Backend will be available at http://localhost:8080/api/v1
```

**API Documentation:** http://localhost:8080/api/v1/swagger-ui.html

### 4. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will be available at http://localhost:3000
```

## 🐳 Docker Setup (Recommended)

For a complete containerized setup:

```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

**Services will be available at:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/v1
- Database: localhost:5432

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Production Build

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
./mvnw clean package -DskipTests
```

## 🎯 Default User Accounts

For development and testing, the following default accounts are created:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@sparklab.com | admin123 |
| Organizer | organizer@sparklab.com | org123 |
| Team Lead | teamlead@sparklab.com | team123 |
| Participant | participant@sparklab.com | part123 |

## 🔧 Environment Variables

### Backend (.env or environment)
```bash
JWT_SECRET=your_jwt_secret_key
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sparklab2025
DB_USER=sparklab_user
DB_PASSWORD=sparklab_password
UPLOAD_DIR=./uploads
```

### Frontend (.env.local)
```bash
VITE_API_URL=http://localhost:8080/api/v1
VITE_WS_URL=ws://localhost:8080/ws
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :8080
   # Kill the process or change port in application.properties
   ```

2. **Database Connection Failed**
   - Ensure PostgreSQL is running
   - Check database credentials in `application.properties`
   - Verify database exists and user has permissions

3. **Frontend Build Errors**
   ```bash
   # Clear node modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **JWT Token Issues**
   - Ensure JWT secret is properly set
   - Check token expiration time
   - Clear browser local storage

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development
2. **API Testing**: Use tools like Postman or the built-in Swagger UI
3. **Database GUI**: Use pgAdmin or DBeaver to manage PostgreSQL
4. **Logs**: Check application logs for detailed error information

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Coding! 🚀**

*For any issues or questions, please contact the SparkLab 2025 development team.*