const axios = require("axios");
const mongoose = require("mongoose");
const CropPredict = require("../models/CropPredict");

const ML_API = process.env.ML_API_URL;

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
      user_id
    } = req.body;

    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid user_id" });
    }

    const mlResponse = await axios.post(
      `${ML_API}/predict`,
      {
        N: Number(N),
        P: Number(P),
        K: Number(K),
        temperature: Number(temperature),
        humidity: Number(humidity),
        ph: Number(ph),
        rainfall: Number(rainfall)
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const { predicted_crop, predicted_price } = mlResponse.data;

    const record = new CropPredict({
      user_id,
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall,
      predictedCrop: predicted_crop,
      predictedPrice: predicted_price
    });

    await record.save();

    res.status(200).json({
      predictedCrop: predicted_crop,
      predictedPrice: predicted_price
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Crop prediction failed" });
  }
};
