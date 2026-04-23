# Student Grievance Management System Submission Guide

Use this file to prepare your Word document, then export it as PDF.

## 1. Project Title

Student Grievance Management System using MERN Stack

## 2. Aim

To develop a web-based system where students can register, login, submit grievances, view their complaints, search them, and update or delete their own grievances.

## 3. Modules

- Registration Form
- Login Form
- Dashboard
- Submit Grievance Form
- Display All Grievances
- Search Grievances
- Update/Delete Grievance
- Logout
- Protected Dashboard Route

## 4. Screenshots To Add

Run the project locally and capture:

- Registration page
- Login page
- Dashboard before submitting grievance
- Submit grievance success
- Display all grievances
- Search grievance
- Update grievance
- Delete grievance
- Invalid login error
- Duplicate email error
- Unauthorized API access in Postman or Thunder Client
- MongoDB Atlas collection showing `users`
- MongoDB Atlas collection showing `grievances`
- Render backend deployment success
- Render frontend deployment success
- Live frontend URL test
- Live backend endpoint test

## 5. Postman or Thunder Client Requests

Use these requests and take screenshots.

### Register

POST `http://localhost:5000/api/auth/register`

```json
{
  "name": "Test Student",
  "email": "student@example.com",
  "password": "123456"
}
```

### Login

POST `http://localhost:5000/api/auth/login`

```json
{
  "email": "student@example.com",
  "password": "123456"
}
```

Copy the token from the response.

### Create Grievance

POST `http://localhost:5000/api/grievances`

Header:

```text
Authorization: Bearer YOUR_TOKEN
```

Body:

```json
{
  "title": "Library Wi-Fi not working",
  "category": "Facilities",
  "description": "The Wi-Fi in the library is not connecting during study hours."
}
```

### Get Grievances

GET `http://localhost:5000/api/grievances`

Header:

```text
Authorization: Bearer YOUR_TOKEN
```

### Search Grievances

GET `http://localhost:5000/api/grievances?search=library`

Header:

```text
Authorization: Bearer YOUR_TOKEN
```

### Update Grievance

PUT `http://localhost:5000/api/grievances/GRIEVANCE_ID`

Header:

```text
Authorization: Bearer YOUR_TOKEN
```

Body:

```json
{
  "title": "Library Wi-Fi issue",
  "category": "Facilities",
  "description": "The Wi-Fi in the library disconnects frequently.",
  "status": "In Review"
}
```

### Delete Grievance

DELETE `http://localhost:5000/api/grievances/GRIEVANCE_ID`

Header:

```text
Authorization: Bearer YOUR_TOKEN
```

### Unauthorized Access

GET `http://localhost:5000/api/grievances`

Do not add the Authorization header. It should show unauthorized access.

## 6. Render Live Endpoint Tests

After deployment, replace the local URL with your Render backend URL:

- `https://YOUR-BACKEND.onrender.com/`
- `https://YOUR-BACKEND.onrender.com/api/auth/register`
- `https://YOUR-BACKEND.onrender.com/api/auth/login`
- `https://YOUR-BACKEND.onrender.com/api/grievances`
- `https://YOUR-BACKEND.onrender.com/api/grievances?search=library`
- `https://YOUR-BACKEND.onrender.com/api/grievances/GRIEVANCE_ID`

## 7. Deployment Links

Add these to your Word document:

- GitHub Repository: `PASTE_GITHUB_REPOSITORY_LINK_HERE`
- Render Frontend Live URL: `PASTE_FRONTEND_RENDER_LINK_HERE`
- Render Backend Live URL: `PASTE_BACKEND_RENDER_LINK_HERE`

## 8. Important Files For Code Section

Add these important code files to your document:

- `server/src/server.js`
- `server/src/app.js`
- `server/src/models/User.js`
- `server/src/models/Grievance.js`
- `server/src/controllers/authController.js`
- `server/src/controllers/grievanceController.js`
- `server/src/middleware/authMiddleware.js`
- `server/src/routes/authRoutes.js`
- `server/src/routes/grievanceRoutes.js`
- `client/src/App.jsx`
- `client/src/context/AuthContext.jsx`
- `client/src/pages/Register.jsx`
- `client/src/pages/Login.jsx`
- `client/src/pages/Dashboard.jsx`
- `client/src/api/axios.js`

