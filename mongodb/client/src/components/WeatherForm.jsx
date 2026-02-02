import React, { useState } from "react";
import axios from "axios";

const WeatherForm = () => {
  const [zipCode, setZipCode] = useState("");
  const [tempMetric, setTempMetric] = useState("metric"); // metric | imperial
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
    setError("");
    setWeatherData(null);

    try {
      const res = await axios.post("http://localhost:5000/api/weather", {
        zipCode,
        tempMetric,
      });

      setWeatherData(res.data);
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  return (
    <div className="weather-container">
      <form className="weather-card" onSubmit={getWeather}>
        <h2>Weather Data</h2>

        <label>Zip Code</label>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />

        <label>Temperature Unit</label>
        <select
          value={tempMetric}
          onChange={(e) => setTempMetric(e.target.value)}
        >
          <option value="metric">Celsius (°C)</option>
          <option value="imperial">Fahrenheit (°F)</option>
        </select>

        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {weatherData && (
        <div className="weather-result">
          <h3>{weatherData.city}</h3>

          <p>
            <strong>Temperature:</strong>{" "}
            {weatherData.temperature}
            {weatherData.unit}
          </p>

          <p>
            <strong>Humidity:</strong> {weatherData.humidity}%
          </p>

          <p>
            <strong>Condition:</strong> {weatherData.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherForm;
