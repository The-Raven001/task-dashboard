# Task Management App

A full-stack task management application with user authentication, task groups, and CRUD functionality for tasks and groups.

---

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: FastAPI (Python)
- Database: PostgreSQL
- Auth: JWT

---

## Features

- User authentication (login/register)
- Create, edit, delete tasks
- Create, edit, delete task groups
- Filter tasks by group
- Mark tasks as completed
- Search and sort tasks

---

## Backend Setup

### 1. Create and activate virtual environment

```bash
python -m venv venv
venv\Scripts\activate
2. Install dependencies
pip install fastapi uvicorn[standard]
3. Run the server
uvicorn app.main:app --reload

Backend runs at:
http://localhost:8000

Frontend Setup
1. Install dependencies
npm install
2. Run development server
npm run dev

Frontend runs at:
http://localhost:5173

Environment Variables

Create a .env file in both frontend and backend if required.

Backend .env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
Frontend .env
VITE_API_URL=http://localhost:8000
Notes
Make sure PostgreSQL is running before starting the backend
Run migrations if using Alembic:
alembic upgrade head
Author

Gabriel Montilla