import React, { useState } from "react";
import API from "../config/api";
import { useAuth } from "../context/AuthContext";
import "./RegisterSeed.css";

const RegisterSeed = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    seedName: "",
    seedType: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitSeed = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("User not logged in properly.");
      return;
    }

    setLoading(true);

    console.log("Logged user:", user);

    const data = new FormData();
    data.append("seedName", form.seedName);
    data.append("seedType", form.seedType);
    data.append("description", form.description);
    data.append("image", image);
    data.append("createdBy", user._id);
    data.append("createdByEmail", user.email);

    try {
      await API.post("/api/seeds/register", data);
      alert("Seed registered successfully");
      window.location.href = "/seedList";
    } catch (err) {
      console.error("Backend error:", err.response?.data || err);
      alert("Seed registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <form className="seed-form" onSubmit={submitSeed}>
        <h2>Register Seed</h2>

        <input
          name="seedName"
          placeholder="Seed Name"
          onChange={handleChange}
          required
        />

        <input
          name="seedType"
          placeholder="Seed Type (Rabi/Kharif)"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button disabled={loading}>
          {loading ? "Saving..." : "Register Seed"}
        </button>
      </form>
    </div>
  );
};

export default RegisterSeed;
