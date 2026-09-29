# College Event Registration

A full-stack MERN application for managing college event registrations.

## Features
- **Admin**: Create events, view all events, delete events, and view the list of attendees.
- **Student**: View upcoming events, see remaining seats, register for events, and view personal registrations.
- **Concurrency Safe**: Handles race conditions when multiple students try to register for the last seat at the same time.

## Tech Stack
- Frontend: React.js (Vite), Tailwind CSS, React Router, Axios
- Backend: Node.js, Express.js, MongoDB (Mongoose), JWT Auth

## Setup Instructions

### 1. Database Setup
Make sure you have MongoDB installed and running locally on `mongodb://127.0.0.1:27017` or update the `MONGO_URI` in `server/.env`.

### 2. Server Setup
```bash
cd server
npm install
# Configure environment variables (a .env is already created from .env.example)
npm run seed # Seeds the database with 1 admin, 2 students, and 3 events
npm start # or node server.js
```

### 3. Client Setup
```bash
cd client
npm install
npm run dev
```

### 4. Create your first admin
You can use the seeded admin (`admin@college.edu` / `password123`) or register a new one. To register an admin, select "Admin" role on the Register page and use the Secret Code: `college_admin_2026`.

## API Endpoints

### Auth
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/me`: Get current logged in user

### Events (Admin)
- `POST /api/events`: Create a new event
- `DELETE /api/events/:id`: Delete an event
- `GET /api/events/:id/attendees`: Get attendees for an event

### Events (Shared/Student)
- `GET /api/events`: Get all events

### Registrations (Student)
- `POST /api/events/:id/register`: Register for an event
- `GET /api/registrations/my`: Get student's registrations
