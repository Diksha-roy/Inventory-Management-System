# Stage 1: Build the application using Maven and JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set working directory inside container
WORKDIR /build

# Copy the entire project (including pom.xml and src)
COPY . .

# Package the Spring Boot app (skip tests for speed)
RUN mvn clean package -DskipTests

# Stage 2: Run the application using a smaller JRE 21 base image
FROM eclipse-temurin:21-jdk-jammy

# Set working directory
WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /build/target/java-api.jar app.jar

# Expose the Spring Boot port
EXPOSE 8080

# Run the app and bind it to 0.0.0.0 for external access
ENTRYPOINT ["java", "-jar", "app.jar", "--server.address=0.0.0.0"]
