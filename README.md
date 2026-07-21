# Internship Applicant Management API

A RESTful API built with **NestJS**, **Prisma ORM**, **PostgreSQL**, and **JWT Authentication** for managing internship applications. The API allows authenticated administrators to create, manage, search, and review internship applicants while providing dashboard statistics and secure authentication.

---

## Features

### Authentication

- Administrator login with JWT Bearer Authentication
- Secure password hashing using bcrypt
- Protected routes using NestJS Auth Guards
- Get authenticated administrator information (`/auth/me`)

### Applicant Management

- Create new applicants
- View all applicants
- View a single applicant
- Update applicant information
- Soft delete applicants
- Update applicant application status
- Add internal notes

### Search & Filtering

- Search applicants by name or email
- Filter applicants by internship track
- Filter applicants by application status
- Sort applicants by supported fields
- Paginated applicant listing

### Dashboard

Dashboard summary includes:

- Total applicants
- Pending applicants
- Shortlisted applicants
- Accepted applicants
- Rejected applicants

Soft-deleted applicants are excluded from all dashboard statistics.

---

# Technology Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Passport
- Swagger (OpenAPI)
- class-validator
- class-transformer
- bcrypt

---

# Project Structure

```text
src
│
├── auth
│   ├── dto
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
│
├── applicant
│   ├── dto
│   ├── applicant.controller.ts
│   ├── applicant.service.ts
│   └── applicant.module.ts
│
├── dashboard
│   ├── dashboard.controller.ts
│   ├── dashboard.service.ts
│   └── dashboard.module.ts
│
├── prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── common
│   └── filters
│
├── app.module.ts
└── main.ts

prisma
├── migrations
├── schema.prisma
└── seed.ts
```

---

# Database Design

## Admin

| Field     | Type            |
| --------- | --------------- |
| id        | Integer         |
| email     | String (Unique) |
| password  | String (Hashed) |
| createdAt | DateTime        |

---

## Applicant

| Field     | Type                |
| --------- | ------------------- |
| id        | Integer             |
| fullName  | String              |
| email     | String (Unique)     |
| phone     | String (Unique)     |
| track     | Enum                |
| status    | Enum                |
| notes     | String              |
| deletedAt | DateTime (Nullable) |
| createdAt | DateTime            |
| updatedAt | DateTime            |

---

# Applicant Status

- Pending
- Shortlisted
- Accepted
- Rejected

---

# Internship Tracks

- Frontend Development
- Backend Development
- Mobile Development
- UI/UX Design
- Data Analytics

---

# Business Rules

- Applicant email addresses must be unique.
- Notes cannot exceed 1000 characters.
- Applicants cannot move directly from **Rejected** to **Accepted**.
- Only authenticated administrators can access protected endpoints.
- Applicants are soft deleted.
- Deleted applicants are excluded from normal listings and dashboard statistics.

---

# Authentication

Authentication uses JWT Bearer Tokens.

### Login

```
POST /api/auth/login
```

Request

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response

```json
{
  "access_token": "your-jwt-token"
}
```

Use the returned token in the Authorization header.

```
Authorization: Bearer <your-token>
```

---

# API Endpoints

## Authentication

| Method | Endpoint        | Description                     |
| ------ | --------------- | ------------------------------- |
| POST   | /api/auth/login | Administrator login             |
| GET    | /api/auth/me    | Get authenticated administrator |

---

## Applicants

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| POST   | /api/applicants            | Create applicant          |
| GET    | /api/applicants            | Get applicants            |
| GET    | /api/applicants/:id        | Get applicant             |
| PATCH  | /api/applicants/:id        | Update applicant          |
| DELETE | /api/applicants/:id        | Soft delete applicant     |
| PATCH  | /api/applicants/:id/status | Update application status |
| PATCH  | /api/applicants/:id/notes  | Update notes              |

---

## Dashboard

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | /api/dashboard/summary | Dashboard statistics |

---

# Query Parameters

Applicants endpoint supports:

```
GET /api/applicants
```

Optional query parameters:

| Parameter | Description                  |
| --------- | ---------------------------- |
| page      | Page number                  |
| limit     | Number of items per page     |
| search    | Search by name or email      |
| status    | Filter by application status |
| track     | Filter by internship track   |
| sortBy    | Field to sort by             |
| order     | asc or desc                  |

Example

```
GET /api/applicants?page=1&limit=10&search=john&status=PENDING&track=BACKEND&sortBy=createdAt&order=desc
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/selamde/Nest-project.git
```

Navigate into the project

```bash
cd Nest-project
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
DATABASE_URL="your_database_url"

JWT_SECRET="your_secret"

JWT_EXPIRES=1d
```

---

# Database Migration

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

---

# Seed Database

Create the administrator account

```bash
npx prisma db seed
```

Default administrator credentials

```
Email:
admin@example.com

Password:
admin123
```

> Update these credentials in your seed file before deploying to production.

---

# Running the Application

Development

```bash
npm run start:dev
```

Production

```bash
npm run build
npm run start:prod
```

---

# Swagger Documentation

Swagger UI

```
http://localhost:3000/api
```

Swagger provides:

- Interactive endpoint testing
- Request validation
- Authentication support
- API documentation

---

# Testing

Run unit tests

```bash
npm run test
```

Run end-to-end tests

```bash
npm run test:e2e
```

Generate coverage

```bash
npm run test:cov
```

---

# Error Handling

The API returns consistent HTTP responses using NestJS exception handling.

Example

```json
{
  "statusCode": 404,
  "message": "Applicant not found",
  "timestamp": "2026-07-21T10:15:23.000Z",
  "path": "/api/applicants/1"
}
```

---

# Architecture

The application follows NestJS's modular architecture.

- **Controllers** handle incoming HTTP requests and responses.
- **Services** contain all business logic.
- **DTOs** validate incoming request data.
- **Prisma** handles all database interactions.
- **JWT Strategy** authenticates and validates bearer tokens.
- **Auth Guards** protect secured endpoints.
- **Prisma Migrations** manage database schema changes.

Business logic is kept inside services to maintain separation of concerns and improve maintainability.

---

# Security

- Passwords are hashed using bcrypt.
- JWT Bearer Authentication protects secured endpoints.
- Environment variables are used for secrets.
- Request validation is enabled globally using ValidationPipe.
- Authentication guards prevent unauthorized access.

---

# Assumptions

- Only administrators can authenticate.
- Applicants do not have login functionality.
- Applicant email addresses are globally unique.
- Soft-deleted applicants are not returned by normal queries.
- Dashboard statistics exclude soft-deleted applicants.

---

# Future Improvements

- Role-Based Access Control (RBAC)
- Refresh Tokens
- Audit Logging
- Rate Limiting
- File Uploads (Resume/CV)
- Email Notifications
- Docker & Docker Compose
- CI/CD Pipeline
- Redis Caching

---

# Author

**Selamsew Dagne**

GitHub: https://github.com/selamde
