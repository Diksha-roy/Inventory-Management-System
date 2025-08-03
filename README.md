# My Java API Project
#  Inventory Management System

A full-stack **Java Spring Boot** based Inventory Management System that allows admin and users to manage servers, categories, types, environments, OS, and locations with role-based access control.

## Tech Stack

-  Java 17+
-  Spring Boot
-  Spring Security (JWT based authentication)
-  PostgreSQL
-  REST APIs
-  Docker 
-  Maven

---

##  Features

-  JWT Authentication
-  Role-Based Access Control (Super Admin, Admin, Operator, Viewer)
-  Bulk upload/delete via JSON
-  Search and filter
-  Unit + Integration Tests

---

##  Setup Instructions

###  Prerequisites

- Java 17+
- Maven
- PostgreSQL
- (Optional) Docker


###  PostgreSQL Setup

Create a PostgreSQL DB:

CREATE DATABASE inventory;
CREATE USER admin WITH ENCRYPTED PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE inventory TO admin;

### PostgreSQL DB Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/inventory
spring.datasource.username=admin
spring.datasource.password=admin123
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

### Run The Java Project

***mvn clean package***

**mvn spring-boot:run**

