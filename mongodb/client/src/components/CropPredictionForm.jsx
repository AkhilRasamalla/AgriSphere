import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CropPredictionForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!user || !user._id) {
      setError("User not logged in");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/crops/predict",
        {
          ...formData,
          user_id: user._id,
        }
      );

      setResult(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Prediction failed (backend error)"
      );
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <input name="N" placeholder="Nitrogen" onChange={handleChange} />
        <input name="P" placeholder="Phosphorus" onChange={handleChange} />
        <input name="K" placeholder="Potassium" onChange={handleChange} />
        <input name="temperature" placeholder="Temperature" onChange={handleChange} />
        <input name="humidity" placeholder="Humidity" onChange={handleChange} />
        <input name="ph" placeholder="pH" onChange={handleChange} />
        <input name="rainfall" placeholder="Rainfall" onChange={handleChange} />

        <button type="submit">Predict Crop</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h3>Predicted Crop: {result.predictedCrop}</h3>
          <h3>Predicted Price: {result.predictedPrice}</h3>
        </div>
      )}
    </div>
  );
};

export default CropPredictionForm;
