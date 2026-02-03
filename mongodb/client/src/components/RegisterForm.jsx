import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";
import "./FormStyles.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    notificationFrequency: "daily",
    preferredUnits: "metric",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await registerUser(formData);
      setSuccess("User registered successfully");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register User</h2>

      {error && <div className="popup-error">{error}</div>}
      {success && <div className="popup-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          required
        />

        <select name="notificationFrequency" onChange={handleInputChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <select name="preferredUnits" onChange={handleInputChange}>
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
