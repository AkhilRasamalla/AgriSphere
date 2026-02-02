// Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const path = require("path");

const farmRoutes = require("./routes/farmRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const userRoutes = require("./routes/userRoutes");
const cropRoutes = require("./routes/cropRoutes");
const seedRoutes = require("./routes/seedRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

// =====================
// Middleware
// =====================
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// =====================
// MongoDB Connection
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// =====================
// Weather API (FINAL + CORRECT)
// =====================
app.post("/api/weather", async (req, res) => {
  const { zipCode, tempMetric } = req.body;

  if (!zipCode || !tempMetric) {
    return res.status(400).json({ error: "zipCode and tempMetric required" });
  }

  try {
    // 1️⃣ Zip → Latitude / Longitude
    const geoURL = `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${process.env.OPENCAGE_API_KEY}`;
    const geoRes = await axios.get(geoURL);

    if (!geoRes.data.results.length) {
      return res.status(404).json({ error: "Invalid zip code" });
    }

    const { lat, lng } = geoRes.data.results[0].geometry;

    // 2️⃣ Weather (metric OR imperial)
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${tempMetric}&appid=${process.env.WEATHER_KEY}`;
    const weatherRes = await axios.get(weatherURL);

    // 3️⃣ Clean response
    res.json({
      city: weatherRes.data.name,
      temperature: weatherRes.data.main.temp,
      humidity: weatherRes.data.main.humidity,
      description: weatherRes.data.weather[0].description,
      unit: tempMetric === "metric" ? "°C" : "°F",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch weather data",
      error: error.message,
    });
  }
});

// =====================
// Routes
// =====================
app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/seeds", seedRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/prices", require("./routes/priceRoutes"));


// =====================
// Production Build
// =====================
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// =====================
// Server Start
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
