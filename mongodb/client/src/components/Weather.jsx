import { useState } from "react";
import API from "../config/api";
import "./Weather.css";

const Weather = () => {
  const [zipCode, setZipCode] = useState("");
  const [tempMetric, setTempMetric] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setError("");
      setWeather(null);

      const res = await API.post("/api/weather", {
        zipCode,
        tempMetric,
      });

      setWeather(res.data);
    } catch (err) {
      setError("Unable to fetch weather data");
    }
  };

  return (
    <div className="weather-page">
      <div className="weather-card">
        <h2 className="weather-title">Weather Data</h2>

        <div className="weather-controls">
          <input
            type="text"
            placeholder="Enter Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />

          <select
            value={tempMetric}
            onChange={(e) => setTempMetric(e.target.value)}
          >
            <option value="metric">Celsius (°C)</option>
            <option value="imperial">Fahrenheit (°F)</option>
          </select>

          <button onClick={getWeather}>Get Weather</button>
        </div>

        {error && <div className="weather-error">{error}</div>}

        {weather && (
          <div className="weather-result">
            <div className="weather-item">
              <span>City</span>
              <strong>{weather.city}</strong>
            </div>

            <div className="weather-item">
              <span>Temperature</span>
              <strong>
                {weather.temperature}{" "}
                {tempMetric === "metric" ? "°C" : "°F"}
              </strong>
            </div>

            <div className="weather-item">
              <span>Humidity</span>
              <strong>{weather.humidity}%</strong>
            </div>

            <div className="weather-item">
              <span>Condition</span>
              <strong>{weather.description}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
