import React, { useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const getUserId = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;
  return JSON.parse(storedUser)._id;
};

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const user_id = getUserId();

  const [preferences, setPreferences] = useState({
    notificationFrequency: user?.preferences?.notificationFrequency || "daily",
    preferredUnits: user?.preferences?.preferredUnits || "metric",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  if (!user) {
    navigate("/login");
    return null;
  }

  const handlePreferenceChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePreferenceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/users/${user_id}/preferences`,
        preferences
      );
      setMessage({ type: "success", text: "Preferences updated successfully" });
    } catch {
      setMessage({ type: "error", text: "Failed to update preferences" });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/api/users/${user_id}/change-password`,
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }
      );
      setMessage({ type: "success", text: "Password changed successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Password update failed",
      });
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://i.pinimg.com/736x/9e/41/dd/9e41dd56f7a091cf4df76aed668db4fc.jpg"
            alt="profile"
            className="profile-avatar"
          />
          <h1>Welcome, {user.username}</h1>
          <p className="email">{user.email}</p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <section>
          <h2>Preferences</h2>
          <form onSubmit={handlePreferenceSubmit}>
            <label>
              Notification Frequency
              <select
                name="notificationFrequency"
                value={preferences.notificationFrequency}
                onChange={handlePreferenceChange}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>

            <label>
              Preferred Units
              <select
                name="preferredUnits"
                value={preferences.preferredUnits}
                onChange={handlePreferenceChange}
              >
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </select>
            </label>

            <button type="submit">Save Preferences</button>
          </form>
        </section>

        <section>
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old password"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New password"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
            <button type="submit">Update Password</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Profile;
