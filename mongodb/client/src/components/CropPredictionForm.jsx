import { useState } from "react";
import { predictCrop } from "../services/cropService";

const CropPredictionForm = () => {
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await predictCrop({
        N: Number(N),
        P: Number(P),
        K: Number(K),
        temperature: Number(temperature),
        humidity: Number(humidity),
        ph: Number(ph),
        rainfall: Number(rainfall),
      });

      setResult(response);
    } catch (err) {
      setError("Crop prediction failed");
    }
  };

  return (
    <div className="crop-predict-container">
      <form onSubmit={handleSubmit}>
        <input value={N} onChange={(e) => setN(e.target.value)} placeholder="N" />
        <input value={P} onChange={(e) => setP(e.target.value)} placeholder="P" />
        <input value={K} onChange={(e) => setK(e.target.value)} placeholder="K" />
        <input
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          placeholder="Temperature"
        />
        <input
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          placeholder="Humidity"
        />
        <input value={ph} onChange={(e) => setPh(e.target.value)} placeholder="pH" />
        <input
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
          placeholder="Rainfall"
        />

        <button type="submit">Predict Crop</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h3>Predicted Crop: {result.predictedCrop}</h3>
          <h4>Predicted Price: ₹{result.predictedPrice}</h4>
        </div>
      )}
    </div>
  );
};

export default CropPredictionForm;
