# Task Management System with RBAC

A full-stack Task Management Application built with the MERN stack (Node.js, Express, React) and SQLite. The system implements Role-Based Access Control (RBAC) where:
- **Users** can manage only their own tasks.
- **Admins** can view and manage all tasks in the system.

---

## 🚀 Live Demo

| Component | Link |
|-----------|------|
| **Frontend (Netlify)** | [https://srikanth-task-manager.netlify.app/login] |
| **Backend (Render)** | [https://task-manager-rbac-backend.onrender.com] |

> **Note:** The Backend is deployed on Render's Free Tier. It spins down after inactivity. **Please wait 30-60 seconds** for the first login request to wake up the server.

---

## ✨ Features

- **Authentication:** Secure Login & Registration using JWT and bcrypt.
- **RBAC:** Middleware to differentiate between `admin` and `user` roles.
- **Task Management:** Create, Read, and Delete tasks.
- **Responsive UI:** Built with React + Tailwind CSS.
- **Database:** SQLite (File-based, no installation required).

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios, React Router.
- **Backend:** Node.js, Express.js.
- **Database:** SQLite3.
- **Deployment:** Netlify (Frontend), Render (Backend).

---

📂 Project Structure

code

task-manager-rbac/
├── backend/
│   ├── config/         
│   ├── controllers/    
│   ├── middleware/     
│   ├── models/         
│   ├── routes/         
│   ├── server.js       
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/ 
    │   ├── context/    
    │   ├── pages/      
    │   ├── services/   
    │   ├── App.jsx     
    │   └── main.jsx
    └── package.json