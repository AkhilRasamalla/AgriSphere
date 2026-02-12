const axios = require("axios");
const mongoose = require("mongoose");
const CropPredict = require("../models/CropPredict");

const ML_API = "https://agrisphere-ml.onrender.com";

exports.predictCrop = async (req, res) => {
  try {
    const { N, P, K, temperature, humidity, ph, rainfall, user_id } = req.body;

    // Validate ObjectId
    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid user_id" });
    }

    // Call ML service
    const mlResponse = await axios.post(`${ML_API}/predict`, {
      N: Number(N),
      P: Number(P),
      K: Number(K),
      temperature: Number(temperature),
      humidity: Number(humidity),
      ph: Number(ph),
      rainfall: Number(rainfall),
    });

    // Validate ML response
    if (!mlResponse.data || !mlResponse.data.predicted_crop) {
      return res.status(500).json({
        message: "ML service returned invalid response",
        data: mlResponse.data,
      });
    }

    const predictedCrop = mlResponse.data.predicted_crop;
    const predictedPrice = mlResponse.data.predicted_price || 0;

    // Save to Mongo
    const record = await CropPredict.create({
      user_id,
      N: Number(N),
      P: Number(P),
      K: Number(K),
      temperature: Number(temperature),
      humidity: Number(humidity),
      ph: Number(ph),
      rainfall: Number(rainfall),
      predictedCrop,
      predictedPrice,
    });

    res.status(200).json({
      predictedCrop,
      predictedPrice,
    });

  } catch (err) {
    console.error("Prediction Error FULL:", err);
    res.status(500).json({
      message: "Crop prediction failed",
      error: err.message,
    });
  }
};
