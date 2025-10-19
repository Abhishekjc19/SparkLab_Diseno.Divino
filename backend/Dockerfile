# Backend Dockerfile
FROM openjdk:21-jdk-slim AS builder

WORKDIR /app

# Copy maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make maven wrapper executable
RUN chmod +x ./mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build application
RUN ./mvnw clean package -DskipTests

# Production stage
FROM openjdk:21-jre-slim

WORKDIR /app

# Create uploads directory
RUN mkdir -p /app/uploads

# Copy jar file from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose application port
EXPOSE 8080

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8080/api/v1/actuator/health || exit 1

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]