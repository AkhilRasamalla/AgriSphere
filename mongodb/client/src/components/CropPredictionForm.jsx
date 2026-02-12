import { useState } from "react";
import { predictCrop } from "../services/cropService";
import "./CropPredictionForm.css";

const CropPredictionForm = () => {
  

  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [landArea, setLandArea] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const data = await predictCrop({
        N: Number(N),
        P: Number(P),
        K: Number(K),
        temperature: Number(temperature),
        humidity: Number(humidity),
        ph: Number(ph),
        rainfall: Number(rainfall),
      });

      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Crop prediction failed");
    }
  };

  return (
    <div className="crop-page crop-predict">
      <div className="crop-card">
        <div className="crop-title">Crop Prediction</div>

        <div className="crop-form">
          <form onSubmit={handleSubmit} className="crop-grid">
            <input
              placeholder="Nitrogen (N)"
              value={N}
              onChange={(e) => setN(e.target.value)}
            />

            <input
              placeholder="Phosphorus (P)"
              value={P}
              onChange={(e) => setP(e.target.value)}
            />

            <input
              placeholder="Potassium (K)"
              value={K}
              onChange={(e) => setK(e.target.value)}
            />

            <input
              placeholder="Temperature (°C)"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />

            <input
              placeholder="Humidity (%)"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
            />

            <input
              placeholder="Soil pH"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
            />

            <input
              placeholder="Rainfall (mm)"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
            />

            <input
              placeholder="Land Area (acres)"
              value={landArea}
              onChange={(e) => setLandArea(e.target.value)}
            />

            <button type="submit" style={{ gridColumn: "span 2" }}>
              Predict Crop
            </button>
          </form>
        </div>

        {error && <div className="error-text">{error}</div>}

        {result && (
          <div className="result-box">
            <b>Predicted Crop:</b> {result.predictedCrop}
            <br />
            <b>Estimated Total Price:</b> ₹{result.predictedPrice}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPredictionForm;
