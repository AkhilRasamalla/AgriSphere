const express = require("express");
const router = express.Router();
const Weather = require("../api/weather");

// GET /api/weather?zip=505001&unit=metric
router.get("/", async (req, res) => {
  try {
    const { zip, unit = "metric" } = req.query;

    if (!zip) {
      return res.status(400).json({ error: "Zip code is required" });
    }

    const weather = new Weather();
    const weatherData = await weather.getWeatherData(zip, unit);

    res.json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      condition: weatherData.weather[0].description,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

module.exports = router;
