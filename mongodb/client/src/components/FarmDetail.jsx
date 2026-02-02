import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const FarmDetails = () => {
  const { user } = useAuth(); // ✅ logged-in user

  const [form, setForm] = useState({
    location: "",
    crop_type: "",
    planting_schedule: "",
    soil_type: "",
    irrigation_system: "",
    size: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitFarm = async (e) => {
  e.preventDefault();
  setStatus("");

  if (!user || !user._id) {
    setStatus("❌ Please login first");
    return;
  }

  const payload = {
    user_id: user._id,
    location: form.location,
    crop_type: form.crop_type,
    planting_schedule: form.planting_schedule,
    soil_type: form.soil_type,
    irrigation_system: form.irrigation_system,
    size: Number(form.size),
  };

  try {
    setLoading(true);

    await axios.post("http://localhost:5000/api/farms", payload);

    setStatus("✅ Farm details saved successfully");

    setForm({
      location: "",
      crop_type: "",
      planting_schedule: "",
      soil_type: "",
      irrigation_system: "",
      size: "",
    });

    // ✅ auto-hide message
    setTimeout(() => setStatus(""), 3000);

  } catch (err) {
    setStatus("❌ Failed to save farm details");
  } finally {
    setLoading(false);
  }
};

  return (
    <form className="weather-card" onSubmit={submitFarm}>
      <h2>Farm Details</h2>

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />

      <input
        name="crop_type"
        placeholder="Crop Type"
        value={form.crop_type}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="planting_schedule"
        value={form.planting_schedule}
        onChange={handleChange}
        required
      />

      <input
        name="soil_type"
        placeholder="Soil Type"
        value={form.soil_type}
        onChange={handleChange}
        required
      />

      <input
        name="irrigation_system"
        placeholder="Irrigation System"
        value={form.irrigation_system}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="size"
        placeholder="Size (acres)"
        value={form.size}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Submit"}
      </button>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </form>
  );
};

export default FarmDetails;
