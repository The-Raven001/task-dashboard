# Task Management App

A full-stack task management application with user authentication, task groups, and CRUD functionality for tasks and groups.

---

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: FastAPI (Python)
- Database: PostgreSQL
- Auth: JWT
- Containerization: Docker + Docker Compose

---

## Features

- User authentication (login/register)
- Create, edit, delete tasks
- Create, edit, delete task groups
- Filter tasks by group
- Mark tasks as completed
- Search and sort tasks

---

## Running the Project (Docker)

This project is fully containerized.

### Start everything

```bash
docker compose up --build
```

## Access the Apps
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Database: PostgreSQL running in Docker (task_db)

## Notes:
- No need to install PostgreSQL locally
- First run may take a few minutes while Docker builds images
- Data persists using Docker volumes


## Author

Gabriel Montilla