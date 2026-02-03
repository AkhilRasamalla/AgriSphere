const axios = require("axios");
const mongoose = require("mongoose");
const CropPredict = require("../models/CropPredict");

const ML_API_URL = process.env.ML_API_URL; // REQUIRED

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

    // 1️⃣ Validate user_id
    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        message: "Invalid or missing user_id",
      });
    }

    // 2️⃣ Call ML service (DEPLOYED ON RENDER)
    const mlResponse = await axios.post(
      `${ML_API_URL}/predict`,
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

    // 3️⃣ Save prediction
    const prediction = new CropPredict({
      user_id: new mongoose.Types.ObjectId(user_id),
      N: Number(N),
      P: Number(P),
      K: Number(K),
      temperature: Number(temperature),
      humidity: Number(humidity),
      ph: Number(ph),
      rainfall: Number(rainfall),
      predictedCrop: predicted_crop,
      predictedPrice: Number(predicted_price),
    });

    await prediction.save();

    // 4️⃣ Respond
    return res.status(200).json({
      predictedCrop: predicted_crop,
      predictedPrice: predicted_price,
    });

  } catch (error) {
    console.error("Crop prediction error:", {
      message: error.message,
      response: error.response?.data,
    });

    return res.status(500).json({
      message: "Crop prediction failed",
    });
  }
};
