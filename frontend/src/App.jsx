import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProfileForm from "./components/ProfileForm";
import "./App.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">
      <Link to="/">DevDashboard</Link>
    </div>
    <ul className="navbar-links">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profileform">Profile</Link>
      </li>
    </ul>
  </nav>
);

const LoginPage = ({ onLogin }) => (
  <main className="login-container">
    <section className="login-box">
      <h1 className="login-title">DevDashboard</h1>
      <p className="login-subtext">Welcome back</p>

      <button
        className="btn-google"
        onClick={onLogin}
        aria-label="Login with Google"
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24px"
            height="24px"
          >
            <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.43 1.22 8.56 3.24l6.38-6.38C34.96 2.66 29.94 0 24 0 14.64 0 6.76 5.64 3.18 13.78l7.4 5.75C12.6 14.04 17.88 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.12 24.55c0-1.57-.14-3.08-.4-4.55H24v8.64h12.42c-.54 2.9-2.14 5.36-4.54 7.04l7.1 5.54C43.86 36.94 46.12 31.22 46.12 24.55z"
            />
            <path
              fill="#FBBC05"
              d="M10.58 28.28c-.5-1.5-.78-3.1-.78-4.78s.28-3.28.78-4.78l-7.4-5.74A23.98 23.98 0 000 23.5c0 3.94.94 7.67 2.6 10.97l7.98-6.19z"
            />
            <path
              fill="#EA4335"
              d="M24 47.5c6.48 0 11.92-2.14 15.88-5.8l-7.1-5.54c-2 1.36-4.56 2.14-8.78 2.14-6.12 0-11.4-4.54-13.42-10.63l-7.98 6.19C6.76 42.36 14.64 47.5 24 47.5z"
            />
          </svg>
          <span>Continue with Google</span>
        </span>
      </button>

      <p className="support-note">
        Trouble logging in? <a href="#">Contact Support</a>
      </p>
    </section>
  </main>
);

function App() {
  const redirectToGoogle = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage onLogin={redirectToGoogle} />} />
        <Route path="/profileform" element={<ProfileForm />} />
      </Routes>
    </Router>
  );
}

export default App;
