# 🚀 DevDashboard

![DevDashboard]

A modern full-stack web application built to manage user profiles with secure **Google OIDC login**, seamless **frontend-backend integration**, and an elegant user interface.

---

## 🛡️ Badges

![React]
![Node.js]
![Express]
![MongoDB]
![Google OAuth]

---

## ✨ Features

- 🔐 Login using **Google OAuth** (OIDC)
- 🧑 View and edit profile information:
  - First Name
  - Last Name
  - Phone Number
  - City
  - Pincode
- 💾 Data persistence with MongoDB
- ✅ Protected routes with session-based authentication
- 📱 Responsive and clean UI with success/error feedback
- 🧼 Logout support with session cleanup

---

## 🧰 Tech Stack

| Area        | Technology                     |
|-------------|--------------------------------|
| Frontend    | React, React Router, Lucide Icons |
| Backend     | Node.js, Express               |
| Auth        | Passport.js with Google OIDC   |
| Database    | MongoDB, Mongoose              |
| Styling     | CSS Modules                    |


---

## 📁 Folder Structure

DevDashboard/
│
├── backend/
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes (profile)
│ ├── config/ # DB and passport config
│ ├── index.js # Express server entry
│ └── .env # Environment variables
│
├── frontend/
│ ├── components/ # ProfileForm
│ ├── App.jsx # Main React App
│ └── styles/ # CSS files


---

## 🏁 Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Google OAuth Credentials (Client ID and Secret)

---

### 📦 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/DevDashboard.git
cd DevDashboard

Install dependencies for both frontend and backend:

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

🔄 Running in Dev Mode

Start backend (port 4000):
cd backend
npm run dev

Start frontend (port 5173):
cd ../frontend
npm run dev
Navigate to: http://localhost:5173

Environment Variables
Backend .env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
SESSION_SECRET=your_session_secret
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.cseabs7.mongodb.net/






