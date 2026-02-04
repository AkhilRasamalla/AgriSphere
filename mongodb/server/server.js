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
const priceRoutes = require("./routes/priceRoutes");

const app = express();

/* Middleware */
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/* MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* API routes */
app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/seeds", seedRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/prices", priceRoutes);

/* Weather */
app.post("/api/weather", async (req, res) => {
  try {
    const { zipCode, tempMetric } = req.body;

    const geoURL = `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${process.env.OPENCAGE_API_KEY}`;
    const geoRes = await axios.get(geoURL);

    const { lat, lng } = geoRes.data.results[0].geometry;

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${tempMetric}&appid=${process.env.WEATHER_KEY}`;
    const weatherRes = await axios.get(weatherURL);

    res.json({
      city: weatherRes.data.name,
      temperature: weatherRes.data.main.temp,
      humidity: weatherRes.data.main.humidity,
      description: weatherRes.data.weather[0].description,
    });
  } catch (err) {
    res.status(500).json({ message: "Weather fetch failed" });
  }
});

/* React build */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

/* Start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
