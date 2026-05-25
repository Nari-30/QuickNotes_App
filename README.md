# QuickNotes App

A secure and modern full-stack notes management application with JWT authentication, real-time note search, user-specific dashboards, and cloud deployment support. Built with Spring Boot and MySQL, featuring secure APIs, responsive UI, and timestamp-based note management.
### Live:
[QuickNotes App](https://quicknotesapp-production.up.railway.app)

### Stack:
Java 17 · Spring Boot · Spring Security · JWT · MySQL · Hibernate/JPA · HTML · CSS · JavaScript · Railway

## Features

- **JWT Authentication:** Secure user registration and login using Spring Security and JWT tokens
- **Private User Dashboards:** Each user can manage and view only their own personal notes securely
- **Create, Update & Delete Notes:** Full CRUD functionality for efficient note management
- **Real-Time Search Notes:** Instantly search notes by title or content dynamically
- **Created & Updated Timestamps:** Automatic note creation and modification time tracking with IST timezone support
- **Responsive Modern UI:** Fully responsive frontend built using HTML, CSS, and JavaScript
- **MySQL Database Integration:** Persistent notes and user data storage using MySQL and Hibernate/JPA
- **Protected APIs:** Secure backend endpoints using Spring Security authorization and JWT filters
- **Cloud Deployment Support:** Fully deployed and hosted using Railway cloud platform
- **User-Specific Data Isolation:** Every user can access only their own notes securely
- **BCrypt Password Encryption:** Secure password hashing for enhanced authentication security
- **REST API Architecture:** Clean RESTful backend APIs developed using Spring Boot
- **Session Handling with JWT:** Stateless authentication with secure token-based access
- **Dynamic Dashboard Updates:** Notes update instantly after add, edit, delete, and search operations
- **Modern Full-Stack Architecture:** Complete integration of frontend, backend, security, and database layers

## Architecture

```text
Browser / Frontend
(HTML, CSS, JavaScript Dashboard UI)

            |
            v

Spring Boot Backend
(Java 17 + Spring Security + JWT)

            |
            |-- Authentication Layer
            |      |-- User Registration
            |      |-- User Login
            |      +-- JWT Authorization
            |
            |-- Notes Management
            |      |-- Create Notes
            |      |-- Update Notes
            |      |-- Delete Notes
            |      |-- Search Notes
            |      +-- User-Specific Notes
            |
            |-- Security Layer
            |      |-- BCrypt Password Encryption
            |      |-- Protected APIs
            |      +-- JWT Filter Validation
            |
            |-- Timestamp System
            |      |-- Created Time Tracking
            |      |-- Updated Time Tracking
            |      +-- IST Timezone Handling
            |
            +-- MySQL Database
                   |-- users table
                   |-- notes table
                   +-- Persistent Storage
```

## Project Structure

```text
src/main/java/QuickNotes_App/

├── QuickNotesAppApplication.java

├── config/
│   └── SecurityConfig.java

├── controller/
│   ├── AuthController.java
│   └── NoteController.java

├── model/
│   ├── User.java
│   └── Note.java

├── repository/
│   ├── UserRepository.java
│   └── NoteRepository.java

├── security/
│   ├── JWTFilter.java
│   └── JWTUtil.java

├── service/
│   └── AuthService.java

└── resources/
    ├── static/
    │   ├── index.html
    │   ├── signup.html
    │   ├── dashboard.html
    │   ├── style.css
    │   └── script.js
    │
    └── application.properties
```

## API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | none | Register a new user |
| POST | `/api/auth/login` | none | Login and receive JWT token |
| POST | `/api/notes/{username}` | JWT Token | Create a new note |
| GET | `/api/notes/{username}` | JWT Token | Fetch all notes of a user |
| GET | `/api/notes/search/{username}?keyword=` | JWT Token | Search notes by title/content |
| PUT | `/api/notes/{id}` | JWT Token | Update an existing note |
| DELETE | `/api/notes/{id}` | JWT Token | Delete a note |

## Request Body Examples

### Register User

```json
{
  "username": "narendhra",
  "password": "password123"
}
```

---

### Login User

```json
{
  "username": "narendhra",
  "password": "password123"
}
```

---

### Create Note

```json
{
  "title": "Spring Boot Notes",
  "content": "Learn JWT authentication and Spring Security."
}
```

---

### Update Note

```json
{
  "title": "Updated Spring Boot Notes",
  "content": "Added search functionality and timestamps."
}
```

---

### Search Notes

```http
GET /api/notes/search/narendhra?keyword=spring
```

---

### Authorization Header

```http
Authorization: Bearer <jwt_token>
```

## Security & System Design

### JWT Authentication
Secure API authentication using JSON Web Tokens (JWT) with Spring Security. Protected endpoints require a valid JWT token in the Authorization header.
### Private User Dashboards
Each user can securely access and manage only their own personal notes. Note ownership is maintained using database relationships between users and notes.
### Search Notes System
Users can instantly search notes by title or content using dynamic backend filtering and real-time frontend updates.
### Timestamp Management
Automatic note creation and update timestamps are maintained using JPA lifecycle methods with Indian Standard Time (IST) support.
### Secure Password Handling
User passwords are securely encrypted using BCrypt password hashing with Spring Security authentication.
### Protected REST APIs
All sensitive note management APIs are protected using JWT authorization and Spring Security filters.
### Database Persistence
All users, notes, timestamps, and authentication data are persistently stored using MySQL and Hibernate/JPA.
### Responsive Modern UI
The frontend dashboard is fully responsive and built using HTML, CSS, and JavaScript for seamless usability across devices.
### User-Specific Data Isolation
Every authenticated user can access only their own notes securely, preventing unauthorized data access.
### Cloud Deployment Architecture
The application is fully deployed on Railway cloud infrastructure with integrated MySQL database hosting.
