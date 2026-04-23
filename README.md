# Student Grievance Management System

A MERN stack web app where students can register, login, submit grievances, search them, and update or delete only their own grievances.

## Features

- Student registration and login
- JWT protected dashboard/API routes
- Submit grievance
- View all grievances created by the logged-in student
- Search grievances by title, category, status, or description
- Update and delete grievances
- Logout
- Error handling for invalid login, duplicate email, unauthorized access, and missing fields

## Tech Stack

- Frontend: React, Vite, Axios, React Router
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

## Local Setup

1. Install dependencies:

```bash
npm install
npm run install-all
```

2. Create `server/.env` from `server/.env.example`.

3. Add your MongoDB connection string in `server/.env`:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/student_grievance_db
JWT_SECRET=change_this_to_a_long_secret
CLIENT_URL=http://localhost:5173
PORT=5000
```

4. Create `client/.env` from `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

5. Run both frontend and backend:

```bash
npm run dev
```

6. Open:

```text
http://localhost:5173
```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/grievances`
- `GET /api/grievances`
- `GET /api/grievances/:id`
- `PUT /api/grievances/:id`
- `DELETE /api/grievances/:id`

Protected endpoints need this header:

```text
Authorization: Bearer <token>
```

## Render Deployment

Deploy the backend as a Render Web Service:

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `CLIENT_URL`
  - `PORT` can be omitted on Render

Deploy the frontend as a Render Static Site:

- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variable:
  - `VITE_API_URL=https://YOUR-BACKEND-RENDER-URL.onrender.com/api`

