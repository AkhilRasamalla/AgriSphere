import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./FormStyles.css";

const FarmDetail = () => {
  const { user } = useAuth();
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    location: "",
    crop_type: "",
    planting_schedule: "",
    soil_type: "",
    irrigation_system: "",
    size: "",
  });

  useEffect(() => {
    if (!user?._id) return;

    axios
      .get(`http://localhost:4000/api/farms/${user._id}`)
      .then((res) => {
        if (res.data) setFarm(res.data);
      })
      .catch(() => {});
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitFarm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/farms", {
        ...form,
        user_id: user._id,
        size: Number(form.size),
      });

      setFarm(res.data);
    } catch (err) {
      alert("Failed to save farm details");
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // SHOW SAVED FARM DETAILS
  // ===========================

  if (farm) {
    return (
      <div className="auth-page">
        <div className="auth-card farm-card">
          <h2>🌾 Farm Details</h2>

          <div className="farm-display">
            <div><span>Location</span><strong>{farm.location}</strong></div>
            <div><span>Crop</span><strong>{farm.cropType}</strong></div>
            <div><span>Planting Date</span><strong>{farm.plantingDate?.slice(0, 10)}</strong></div>
            <div><span>Soil Type</span><strong>{farm.soilType}</strong></div>
            <div><span>Irrigation</span><strong>{farm.irrigationSystem}</strong></div>
            <div><span>Size</span><strong>{farm.size} acres</strong></div>
          </div>

          <p className="farm-status">✔ Submitted</p>
        </div>
      </div>
    );
  }

  // ===========================
  // SHOW FORM
  // ===========================

  return (
    <div className="auth-page">
      <div className="auth-card farm-card">
        <h2>Farm Details</h2>

        <form className="auth-form" onSubmit={submitFarm}>
          <input name="location" placeholder="Location" onChange={handleChange} required />
          <input name="crop_type" placeholder="Crop Type" onChange={handleChange} required />
          <input type="date" name="planting_schedule" onChange={handleChange} required />
          <input name="soil_type" placeholder="Soil Type" onChange={handleChange} required />
          <input name="irrigation_system" placeholder="Irrigation System" onChange={handleChange} required />
          <input type="number" name="size" placeholder="Size (acres)" onChange={handleChange} required />

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmDetail;
