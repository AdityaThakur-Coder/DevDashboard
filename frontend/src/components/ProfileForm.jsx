import React, { useState, useEffect, useMemo } from "react";
import {
  Edit3,
  Save,
  LogOut,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import './ProfileForm.css'

const ProfileForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    pincode: "",
  });
  const [originalData, setOriginalData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fieldLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone Number",
    city: "City",
    pincode: "Pin Code",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:4000/profileform", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setForm(data);
        setOriginalData(data);
      } catch (err) {
        window.location.href = "/";
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("http://localhost:4000/profileform/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Update failed");
      }

      setOriginalData(form);
      setEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(originalData);
    setEditing(false);
    setError("");
  };

  const handleLogout = async () => {
    await fetch("http://localhost:4000/logout", { credentials: "include" });
    window.location.href = "/";
  };

  const initials = useMemo(() => {
    return (
      `${form.firstName?.[0] || ""}${form.lastName?.[0] || ""}`.toUpperCase() ||
      "U"
    );
  }, [form]);

  const fullName = useMemo(() => {
    return `${form.firstName} ${form.lastName}`.trim() || "User";
  }, [form]);

  if (!originalData) return <div className="loading">Loading profile...</div>;

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-user">
            <div className="navbar-avatar" aria-label="User initials">
              {initials}
            </div>
            <div className="navbar-name">{fullName}</div>
          </div>
          <button onClick={handleLogout} className="navbar-logout">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="profile-container">
        <header className="profile-header">
          <h2>Profile Settings</h2>
          <p>Manage your personal information and preferences</p>
        </header>

        <section className="form-section">
          <div className="form-header">
            <h3>Personal Info</h3>
            <div>
              {success && (
                <span className="status success">
                  <CheckCircle size={16} /> Saved
                </span>
              )}
              {editing ? (
                <button onClick={handleCancel} className="btn-secondary">
                  Cancel
                </button>
              ) : (
                <button onClick={() => setEditing(true)} className="btn-primary">
                  <Edit3 size={16} /> Edit
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="status error">
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-grid">
            {Object.keys(fieldLabels).map((field) => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{fieldLabels[field]}</label>
                <input
                  id={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  disabled={!editing}
                  className="form-input"
                  placeholder={`Enter ${fieldLabels[field]}`}
                  autoComplete="off"
                />
              </div>
            ))}
          </div>

          {editing && (
            <div className="form-actions">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-save"
              >
                {saving ? "Saving..." : <><Save size={16} /> Save</>}
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default ProfileForm;