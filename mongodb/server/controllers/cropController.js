const axios = require("axios");
const mongoose = require("mongoose");
const CropPredict = require("../models/CropPredict");

exports.predictCrop = async (req, res) => {
  try {
    const {
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall,
      user_id,
    } = req.body;

    // 🔴 HARD VALIDATION (THIS WAS MISSING)
    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        message: "Invalid or missing user_id",
      });
    }

    // ML service call
    const mlResponse = await axios.post(
      "http://127.0.0.1:4000/predict",
      {
        N: Number(N),
        P: Number(P),
        K: Number(K),
        temperature: Number(temperature),
        humidity: Number(humidity),
        ph: Number(ph),
        rainfall: Number(rainfall),
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { predicted_crop, predicted_price } = mlResponse.data;

    const prediction = new CropPredict({
      user_id: new mongoose.Types.ObjectId(user_id), // ✅ FIX
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall,
      predictedCrop: predicted_crop,
      predictedPrice: predicted_price,
    });

    await prediction.save();

    return res.status(200).json({
      predictedCrop: predicted_crop,
      predictedPrice: predicted_price,
    });

  } catch (error) {
    console.error("Crop prediction error:", error);

    return res.status(500).json({
      message: "Crop prediction failed",
      error: error.message,
    });
  }
};
